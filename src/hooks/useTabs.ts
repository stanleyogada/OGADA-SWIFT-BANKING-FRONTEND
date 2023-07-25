import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { TProps } from "../components/Tabs/Tabs";

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

export default useTabs;
