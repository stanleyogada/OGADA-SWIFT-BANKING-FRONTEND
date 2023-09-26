import styled from "styled-components";

import LinkDescription from "@components/LinkDescripttion";
import ModalHeader from "@components/Modal/ModalHeader";
import useModalConsumer from "@contexts/Modal/hooks/useModalConsumer";

type TProps = {
  children: React.ReactNode;
  mute?: boolean;
  to?: string;
};

const DisabledLink = ({ children, to }: TProps) => {
  const { handleAdd } = useModalConsumer();

  return (
    <DisabledLinkWrapper>
      <div
        data-testid="modal-container"
        className="disabledLink-container"
        onClick={() => {
          handleAdd({
            heading: <ModalHeader text="Are you sure?" />,
            body: (
              <LinkDescription
                to={to}
                text="This page you are about to go does not have functionality"
              ></LinkDescription>
            ),
          });
        }}
      ></div>

      <div className="items" data-testid="children">
        {children}
      </div>
    </DisabledLinkWrapper>
  );
};

export default DisabledLink;

const DisabledLinkWrapper = styled.div`
  width: 100%;
  border: 1px solid red;
  position: relative;

  .disabledLink-container {
    width: 100%;
    height: 100%;
    background-color: red;
    position: absolute;
  }

  .items {
    width: 100%;
    height: 100%;
  }
`;
