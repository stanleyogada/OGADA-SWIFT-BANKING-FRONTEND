import styled from "styled-components";

const BeneficiariesWrapper = styled.div<{
  hasBeneficiaries: boolean;
}>`
  .beneficiaries {
    &__title {
      padding: 16px;
    }

    &__no-beneficiaries,
    &__list {
      padding-left: 16px;
    }

    &__no-beneficiaries {
      font-style: italic;
      font-weight: 500;
      opacity: 0.55;
      height: 100px;
      display: grid;
      place-items: center;
    }

    &__list {
      height: ${(props) => (props.hasBeneficiaries ? "300px" : "auto")};
      overflow-y: auto;
    }
  }
`;

export default BeneficiariesWrapper;
