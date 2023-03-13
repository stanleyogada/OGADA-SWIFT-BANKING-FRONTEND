import { useState } from "react";

type TProps = {
  data: Array<{
    id: string;
    heading: string;
  }>;
  children: Array<JSX.Element>;
};

const useTabs = (data: TProps["data"]) => {
  const [activeId, setActiveId] = useState(data[0].id);

  const handleChangeActiveId = (tabId: string) => {
    setActiveId(tabId);
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
