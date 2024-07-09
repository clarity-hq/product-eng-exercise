import { useState } from "react";
import { NavTabs, TabConfig } from "./components/NavTabs";
import { Feedback } from "./Feedback";
import { Groups } from "./Groups";

export const TabsConfig: TabConfig = {
  feedback: {
    id: "feedback",
    name: "Feedback",
  },
  groups: {
    id: "groups",
    name: "Groups",
  },
};

function App() {
  const [selectedTab, setSelectedTab] = useState("feedback");

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-5/6 h-4/5 flex flex-col gap-y-4">
        <NavTabs
          config={TabsConfig}
          tabOrder={["feedback", "groups"]}
          onTabClicked={(tabId) => {
            setSelectedTab(tabId);
          }}
          selectedTab={selectedTab}
        />
        {/**
         * TODO(part-1): Add filter options
         */}
        {selectedTab === "feedback" ? (
          <Feedback filters={{}} />
        ) : (
          <Groups filters={{}} />
        )}
      </div>
    </div>
  );
}

export default App;
