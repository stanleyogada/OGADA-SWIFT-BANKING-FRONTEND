import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { TProps } from "../components/Tabs/Tabs";

const useTabs = (data: TProps["data"]) => {
  const params = new URLSearchParams(document.location.search);
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState(params.get("tabId") || data[0].id);

  useEffect(() => {
    if (!params.get("tabId")) return;

    setActiveId(params.get("tabId") as string);
  }, [params.get("tabId")]);

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
