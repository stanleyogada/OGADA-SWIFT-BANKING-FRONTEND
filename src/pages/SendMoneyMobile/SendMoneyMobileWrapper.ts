import { COLORS } from "@constants/colors";
import styled from "styled-components";

const SendMoneyMobileWrapper = styled.div`
  .tabs_pane {
    background-color: ${COLORS.lightGray2} !important;
    overflow-y: auto;
    height: 100%;

    input {
      &::placeholder {
        font-weight: bold;
        font-size: 14px;
      }
    }
  }

  .network-selector {
    display: flex;
    padding: 20px 0;

    position: relative;
    z-index: 1;

    input {
      padding-left: 60px;
    }

    .network-dropdown {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(30%, -45%);

      &__current,
      &__item {
        transition: all 0.1s ease-in-out;

        &:hover {
          cursor: pointer;
          background-color: ${COLORS.lightGray2};
        }

        &:active {
          transform: scale(0.8);
        }
      }

      &__current {
        border-radius: 50%;
        overflow: hidden;
      }

      &__list {
        position: absolute;
        background-color: ${COLORS.white};
        border-radius: 10px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2), 0px 0px 20px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        width: 160px;

        display: flex;
        flex-direction: column;
      }

      &__item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px;
      }
    }
  }

  .bundles {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 10px;
    padding: 10px;
    padding: 0 16px;

    &__item {
      display: grid;
      place-items: center;
      padding: 10px;
      background-color: ${COLORS.white};
      border-radius: 10px;
      border: 2px solid ${COLORS.lightGray};
      user-select: none;
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);

      position: relative;
      transition: all 0.1s ease-in-out;

      &:hover {
        cursor: pointer;
        transform: scale(1.05);
      }

      &:active {
        transform: scale(0.9);
      }

      &.active {
        border: 2px solid ${COLORS.blue};
        transform: scale(1.015);
        background-color: ${COLORS.blue};
        color: ${COLORS.white};
      }
    }

    &__amount {
      position: fixed;
      top: 0;
      left: 0;
      transform: translate(-110%, -110%);
      opacity: 0;

      &--keep {
        font-weight: bold;
        font-size: 13px;
      }
    }
    &__data {
      font-size: 20px;
      padding: 5px;
    }
    &__validity {
      font-style: italic;
    }

    &__tag {
      background: ${COLORS.pink};
      width: 100%;
      position: absolute;
      top: -8%;
      text-align: center;
      padding: 2px 0;
      border-radius: 50% 50% 0 0;

      p {
        font-size: 11px;
        font-weight: bold;
        color: ${COLORS.white};
      }
    }
  }

  .pay-button {
    width: calc(100% - (16px * 2));
    margin: 0 auto;
    margin-left: 16px;
    text-transform: uppercase;
    padding: 10px;
    background-color: ${COLORS.blue};
    opacity: 0.8;
    color: ${COLORS.white};
    border-radius: 10px;
    font-weight: bold;
    font-size: 18px;
    text-align: center;
    transition: all 0.1s ease-in-out;

    &:hover {
      cursor: pointer;
      transform: scale(0.99);
    }

    &:active {
      transform: scale(0.96);
    }

    &:disabled {
      background-color: ${COLORS.lightGray};
      color: ${COLORS.white};
      cursor: not-allowed;
    }
  }
`;

export default SendMoneyMobileWrapper;
