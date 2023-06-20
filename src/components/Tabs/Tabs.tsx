import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../../constants/colors";

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
    <STabs>
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
    </STabs>
  );
};

const STabs = styled.section`
  .tabs_container {
    .tabs_header {
      display: flex;

      .tabs_tab {
        cursor: pointer;
        flex: 1;
        padding: 20px 0;
        text-align: center;
        font-size: 20px;
        background-color: transparent;
        color: ${COLORS.black};
        &--active {
          border-radius: 10px 10px 0 0;
          background-color: ${COLORS.white};

          color: ${COLORS.blue};
          border-bottom: 3px solid ${COLORS.blue};
          transition: all 0.3s ease-in-out;
        }
      }
    }

    .tabs_pane {
      background-color: ${COLORS.white};
      padding: 20px 10px;
    }
  }

  .tabs_container--type2 {
    .tabs_header {
      display: flex;

      .tabs_tab {
        cursor: pointer;
        flex: 1;
        padding: 20px 0;
        text-align: center;
        font-size: 15px;
        border-bottom: 4px solid transparent;

        &--active {
          color: ${COLORS.blue};
          border-color: ${COLORS.blue};
        }
      }
    }

    .tabs_pane {
      padding: 20px 10px;
    }
  }
`;

export default Tabs;
