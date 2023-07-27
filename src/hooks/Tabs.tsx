import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TabsWrapper from "@components/Tabs/TabsStyle";

type TProps = {
  data: Array<{
    id: string;
    heading: string;
  }>;
  children: Array<JSX.Element>;
  type2?: boolean;
};

const useTabs = (data: TProps["data"]) => {
  const params = new URLSearchParams(document.location.search);
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState(params.get("tabId") || data[0].id);

  const handleChangeActiveId = (tabId: string) => {
    setActiveId(tabId);
    navigate({ search: `?tabId=${tabId}` });
  };

  const getActiveIndex = () => {
    return data.findIndex((tab) => tab.id === activeId);
  };

  return { activeId, handleChangeActiveId, getActiveIndex };
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
