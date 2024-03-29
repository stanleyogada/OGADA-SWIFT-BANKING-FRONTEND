import { COLORS } from "@constants/colors";
import styled from "styled-components";

const ProfileWrapper = styled.div`
  width: 100%;
  height: 100%;
  color: ${COLORS.black};

  a {
    text-decoration: none;
  }

  .top-profile-wrapper {
    width: 100%;
    height: 150px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${COLORS.blue};
    padding: 45px;

    .profile-image {
      cursor: pointer;
    }

    .profile-title {
      display: flex;
      align-items: center;

      .profile-name {
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        color: ${COLORS.white};
        margin-left: 10px;
      }
    }

    .settings-icon {
      svg {
        width: 20px;
        height: 20px;
        cursor: pointer;
      }
    }
  }

  .profile-buttons {
    width: 100%;

    .profile-btn {
      width: 90%;
      height: 45px;
      display: flex;
      background-color: ${COLORS.white};
      color: ${COLORS.black};
      padding: 5px;
      border-radius: 8px;
      margin: 23px 21px;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.12);

      .btn-icon {
        margin-left: 14px;
      }

      .btn-content {
        height: 100%;
        margin: 0px 0px 0px 11.5px;
      }
      .btn-content .heading {
        font-style: normal;
        font-weight: 700;
        font-size: 13px;
        line-height: 16px;
      }

      .btn-content .sub-heading {
        font-style: normal;
        font-weight: 700;
        font-size: 9px;
        line-height: 11px;
      }
    }
  }
`;
export default ProfileWrapper;
