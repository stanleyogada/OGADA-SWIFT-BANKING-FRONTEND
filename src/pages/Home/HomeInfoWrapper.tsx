import { COLORS } from "@constants/colors";
import styled from "styled-components";

const HomeInfoWrapper = styled.section`
  .profile-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 90vw;
    margin: 0 auto;
    padding-top: 0.7rem;

    .profile-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.85rem;

      &-details {
        display: flex;
        gap: 3px;
        flex-direction: column;

        h3 {
          font-size: 1.2rem;
        }

        p {
          font-size: 0.95rem;
          font-weight: 600;
          font-style: italic;
        }
      }
    }
    .profile-icons {
      display: flex;
      align-items: center;
      gap: 10px;
      justify-content: space-between;
      margin-top: 0.85rem;

      a .notify {
        color: #000;
      }
    }
  }
  @media screen and (min-width: 400px) {
    .profile-head {
      padding-top: 1rem;

      .profile-info {
        gap: 0.85rem;
      }
    }
  }
`;

const HeroWrapper = styled.section`
  background: ${COLORS.blue};
  width: 90vw;
  margin: 0 auto;
  margin-top: 1rem;
  border-radius: 0.5rem;
  display: grid;
  gap: 1.5rem;
  padding: 1rem;
  color: ${COLORS.white};

  .eye-icon {
    filter: brightness(0) invert(1);
    transform: translateY(5px);

    svg {
      width: 18px;
      height: 18px;
    }
  }

  .top-card {
    display: grid;
    gap: 0.75rem;

    .top-card-1 {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .card-1 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
      }
    }

    .top-card-2 {
      font-size: 1.5rem;
      font-weight: bold;
    }
  }

  .bottom-card {
    display: flex;
    align-items: center;
    justify-content: space-around;

    .bottom-card-link {
      text-decoration: none;
      /* color: ${COLORS.white}; */
    }
  }
  @media screen and (min-width: 400px) {
    margin-top: 1.5rem;
    gap: 2.5rem;
    padding: 1.5rem;
  }
`;

const PaymentWrapper = styled.section`
  width: 90vw;
  margin: 0 auto;
  margin-top: 0.75rem;
  h1 {
    font-size: 1.3rem;
    font-weight: bold;
    margin-bottom: 0.7rem;
  }

  .icons {
    display: flex;
    align-item: center;
    justify-content: space-between;
    padding: 0 1.5rem;
  }

  @media screen and (min-width: 400px) {
    margin-top: 1rem;
    h1 {
      margin-bottom: 1.3rem;
    }
  }
`;

const NotifyWrapper = styled.section`
  display: grid;
  align-items: center;
  gap: 0.5rem;
  width: 90vw;
  margin: 0 auto;
  position: absolute;
  left: 1rem;
  bottom: 5rem;
  right: 0;

  .notify-1,
  .notify-2,
  .notify-3 {
    background: ${COLORS.gray};
    padding: 0.5rem;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    a {
      text-decoration: none;
      font-weight: bold;
    }

    p {
      font-size: 1rem;
    }
  }

  @media screen and (min-width: 400px) {
    gap: 0.75rem;

    .notify-1,
    .notify-2,
    .notify-3 {
      padding: 0.5rem;
      gap: 0.75rem;
    }
  }
`;
export { HomeInfoWrapper, NotifyWrapper, PaymentWrapper, HeroWrapper };
