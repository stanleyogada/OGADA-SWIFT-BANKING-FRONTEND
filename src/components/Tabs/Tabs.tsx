import TabsWrapper from "@components/Tabs/TabsStyle";
import useTabs from "@hooks/useTabs";

export type TProps = {
  data: Array<{
    id: string;
    heading: string;
  }>;
  children: Array<JSX.Element>;
  type2?: boolean;
};

const Tabs = ({ data, children, type2 }: TProps) => {
  const { activeId, handleChangeActiveId, getActiveIndex } = useTabs(data);

  return (
    <TabsWrapper>
      <div className={!type2 ? "tabs_container" : " tabs_container--type2"}>
        <header className="tabs_header">
          {data.map((tab) => (
            <div
              key={tab.id}
              className={`tabs_tab${activeId === tab.id ? " tabs_tab--active" : ""}`}
              onClick={() => handleChangeActiveId(tab.id)}
            >
              <p>{tab.heading}</p>
            </div>
          ))}
        </header>

        <div className="tabs_pane">{children[getActiveIndex()]}</div>
      </div>
    </TabsWrapper>
  );
};

export default Tabs;
