import { COLORS } from "@constants/colors";
import styled from "styled-components";

const SigninModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0.5rem 0;

  .signin-modal {
    &__radio {
      border: 1px solid ${COLORS.gray};
      padding: 1rem;
      border-radius: 10px;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);

      transition: all 0.3s ease-in-out;

      &:hover {
        cursor: pointer;
        border: 1px solid ${COLORS.darkGray};
        box-shadow: none;
        transform: scale(0.99);
      }
    }

    &__radio-name {
      font-size: 1.1rem;
      font-weight: 700;
      margin-bottom: 1rem;
      opacity: 0.8;
    }

    &__radio-info {
      font-size: 0.9rem;
      font-weight: 400;
      margin-bottom: 1rem;
    }
  }
`;

export default SigninModalWrapper;
