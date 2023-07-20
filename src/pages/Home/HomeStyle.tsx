import styled from "styled-components";
import { COLORS } from "../../constants";

export const HomeInfoWrapper = styled.section`
  .profile-head {
    display: flex;
    align-item: center;
    justify-content: space-between;
    width: 90vw;
    margin: 0 auto;
    padding-top: 0.7rem;

    .profile-info {
      display: flex;
      align-item: center;
      justify-content: space-between;
      gap: 0.85rem;

      h3 {
        justify-self: center;
        align-self: center;
        font-size: 1.2rem;
      }
    }
    .profile-icons {
      display: flex;
      align-item: center;
      justify-content: space-between;
      gap: 0.85rem;
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

export const HeroWrapper = styled.section`
  background: ${COLORS.blue};
  width: 90vw;
  margin: 0 auto;
  margin-top: 1rem;
  border-radius: 0.5rem;
  display: grid;
  gap: 1.5rem;
  padding: 1rem;
  color: ${COLORS.white};

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

export const PaymentWrapper = styled.section`
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

export const NotifyWrapper = styled.section`
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
