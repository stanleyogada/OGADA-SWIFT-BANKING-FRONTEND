import styled from "styled-components";

const BeneficiariesWrapper = styled.div`
  .beneficiaries {
    &__title,
    &__list,
    &__no-beneficiaries {
      padding: 16px;
    }

    &__list {
      height: 200px;
      overflow-y: scroll;
    }
  }
`;

export default BeneficiariesWrapper;
