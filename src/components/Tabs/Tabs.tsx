import { useState } from "react";
import { useNavigate } from "react-router-dom";

type TProps = {
  data: Array<{
    id: string;
    heading: string;
  }>;
  children: Array<JSX.Element>;
};

const useTabs = (data: TProps["data"]) => {
  let params = new URLSearchParams(document.location.search);

  const navigate = useNavigate();
  const [activeId, setActiveId] = useState(params.get("tabId") || data[0].id);

  console.log(params.get("tab"));

  const handleChangeActiveId = (tabId: string) => {
    setActiveId(tabId);

    navigate({
      search: `?tabId=${tabId}`,
    });
  };

  const getActiveIndex = () => {
    return data.findIndex((tab) => tab.id === activeId);
  };

  console.log(activeId);

  return {
    handleChangeActiveId,
    getActiveIndex,
  };
};

const Tabs = ({ data, children }: TProps) => {
  const { handleChangeActiveId, getActiveIndex } = useTabs(data);

  return (
    <section>
      <header>
        {data.map((tab) => (
          <h2 key={tab.id} onClick={() => handleChangeActiveId(tab.id)}>
            {tab.heading}
          </h2>
        ))}
      </header>

      <div>{children[getActiveIndex()]}</div>
    </section>
  );
};

export default Tabs;
