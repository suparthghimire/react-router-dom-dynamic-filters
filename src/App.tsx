import { useQuery } from "@tanstack/react-query";
import { GetData } from "./lib/api";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "./components/ui/button";

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

  const allKeysInSearchParams = Array.from(searchParams.keys());

  const filtersV2 = data.data?.filtersV2 ?? {
    filters: [],
    tabs: [],
  };

  const selectedTab = filtersV2.tabs.find((tab) => {
    const keysInValuesOfTab = Object.keys(tab.value);
    console.log(keysInValuesOfTab, allKeysInSearchParams);
    const x = keysInValuesOfTab.some((key) => {
      const param = searchParams.get(key);
      if (!param) return false;
      return param === tab.value[key];
    });
    console.log({ x });
    return x;
  });

  return (
    <>
      {selectedTab ? JSON.stringify(selectedTab) : "NO TAB SELECTED"}
      <div className="flex gap-3 p-4">
        {filtersV2.tabs.map((tab) => (
          <Button
            key={tab.key}
            variant={selectedTab?.key === tab.key ? "destructive" : "default"}
            onClick={() => {
              const newSearchParams = new URLSearchParams();
              Object.entries(tab.value).forEach(([key, value]) => {
                newSearchParams.set(key, stringifyUnknown(value));
              });
              navigate({
                search: newSearchParams.toString(),
              });
            }}
          >
            {tab.display} {tab.key}
            {/* if selected tab, then show yes else no */}
            {selectedTab?.key === tab.key ? "YES" : "NO"}
          </Button>
        ))}
      </div>
    </>
  );
}

export default App;
