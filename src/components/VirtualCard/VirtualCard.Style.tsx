import styled from "styled-components";
import { COLORS } from "../../constants";

const VirtualWrapper = styled.div`
  .virtual-card-img {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .instant-access-wrapper {
    display: flex;
    align-items: center;
    padding: 0.5rem 0.8rem;
    margin: 0.3rem 0;
    gap: 10px;
    .instant-icon {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: ${COLORS.lightblue};
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid ${COLORS.blue};
    }
    .instant-info {
      font-weight: bold;
      .activate-text {
        color: ${COLORS.blue};
      }
      .instant-text {
        margin-bottom: 4px;
        font-size: 15px;
        font-weight: 700;
      }
      .activate {
        font-size: 13px;
      }
    }
  }
  .safety-wrapper {
    display: flex;
    align-items: center;
    padding: 0.5rem 0.8rem;
    gap: 10px;
    .safety-icon {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: ${COLORS.lightblue};
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid ${COLORS.blue};
    }
    .safety-info {
      font-weight: 600;
      .activate-text {
        color: ${COLORS.blue};
      }
      .safety-text {
        font-size: 15px;
        font-weight: 800;
      }
    }
  }
  .marchant-wrapper {
    margin: 0.9rem 0;
    display: flex;
    align-items: center;
    padding: 0.5rem 0.8rem;
    gap: 10px;
    .marchant-icon {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: ${COLORS.lightblue};
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid ${COLORS.blue};
    }
    .marchant-info {
      font-weight: 600;
      .activate-text {
        color: ${COLORS.blue};
      }
      .marchant-text {
        font-size: 11px;
        font-weight: 800;
      }
      .num {
        font-weight: 700;
        color: ${COLORS.blue};
      }
    }
    .online {
      font-size: 15px;
      font-weight: 800;
    }
  }
  .btn-get-now {
    background-color: ${COLORS.blue};
    display: flex;
    justify-content: center;
    margin: 0.7rem auto;
    width: 90%;

    border-radius: 5px;
    padding: 5px;
    .get {
      padding: 0.4rem;
    }
  }
`;
export default VirtualWrapper;
