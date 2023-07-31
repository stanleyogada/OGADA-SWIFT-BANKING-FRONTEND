import styled from "styled-components";
import { COLORS } from "@constants/colors";

const TabsWrapper = styled.section`
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
        color: ${COLORS.blue};
        &--active {
          border-radius: 10px 10px 0 0;
          background-color: ${COLORS.white};

          color: ${COLORS.black};
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

export default TabsWrapper;
