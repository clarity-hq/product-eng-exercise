import cx from "classnames";

export type TabConfig = Record<string, { id: string; name: string }>;

export type Props = {
  config: TabConfig;
  tabOrder: string[];
  selectedTab: string;
  onTabClicked: (tabId: string) => void;
};

export function NavTabs({
  config,
  tabOrder,
  selectedTab,
  onTabClicked,
}: Props) {
  return (
    <div className="flex">
      {tabOrder
        .map((tabKey) => config[tabKey])
        .map((config) => (
          <div
            key={`inbox-tab-${config.name}`}
            className={cx(
              "text-gray-text flex items-center px-6 py-2 text-sm hover:cursor-default",
              {
                "border-primary-main text-primary-main border-b-2 font-semibold":
                  selectedTab === config.id,
                "hover:bg-dusty-white border-b-2 font-medium":
                  selectedTab !== config.id,
              }
            )}
            onMouseDown={() => onTabClicked(config.id)}
          >
            {config.name}
          </div>
        ))}
    </div>
  );
}
