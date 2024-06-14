import { useQuery } from "@tanstack/react-query";
import { GetData } from "./lib/api";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "./components/ui/button";
import { useMemo } from "react";

function stringifyUnknown(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return value.toString();
  if (typeof value === "boolean") return value.toString();
  if (typeof value === "object") return JSON.stringify(value);
  return "";
}

function App() {
  const data = useQuery({
    queryKey: ["data"],
    queryFn: GetData,
  });

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const filtersV2 = data.data?.filtersV2 ?? {
    filters: [],
    tabs: [],
  };
  const tabSearchParam = searchParams.get("tab");

  const selectedTab = filtersV2.tabs.find((tab) => {
    return tab.key === tabSearchParam;
  });

  const constructParamMapping = useMemo(() => {
    const paramToSend: Record<string, string> = {};

    if (!tabSearchParam) return paramToSend;

    const tabSearchParamValueFromFilterV2 = filtersV2.tabs.find(
      (tab) => tab.key === tabSearchParam
    );

    if (!tabSearchParamValueFromFilterV2) return paramToSend;

    console.log({ tabSearchParamValueFromFilterV2 });

    const keysInValuesOfTab = Object.entries(
      tabSearchParamValueFromFilterV2.value
    );

    console.log({ keysInValuesOfTab });
    keysInValuesOfTab.forEach(([key, value]) => {
      console.log({ key, value });
      paramToSend[key] = value as string;
    });

    return paramToSend;
  }, [filtersV2.tabs, tabSearchParam]);

  const stringifiedParams = JSON.stringify(constructParamMapping);
  console.log({ stringifiedParams });

  return (
    <>
      <strong>Params to send to backend = {stringifiedParams}</strong>
      <hr />
      <div className="flex gap-3 p-4">
        {filtersV2.tabs.map((tab) => (
          <Button
            key={tab.key}
            variant={selectedTab?.key === tab.key ? "destructive" : "default"}
            onClick={() => {
              const newSearchParams = new URLSearchParams();
              newSearchParams.set("tab", stringifyUnknown(tab.key));

              navigate({
                search: newSearchParams.toString(),
              });
            }}
          >
            {tab.display} {tab.key} {selectedTab?.key}
            {/* if selected tab, then show yes else no */}
          </Button>
        ))}
      </div>
    </>
  );
}

export default App;
