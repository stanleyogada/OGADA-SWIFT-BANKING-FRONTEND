import styled from "styled-components";

import LinkDescription from "@components/LinkDescripttion";
import ModalHeader from "@components/Modal/ModalHeader";
import useModalConsumer from "@contexts/Modal/hooks/useModalConsumer";

type TProps = {
  children: React.ReactNode;
  mute?: boolean;
  to?: string;
};

const DisabledLink = ({ children, to, mute }: TProps) => {
  const { handleAdd } = useModalConsumer();

  return (
    <DisabledLinkWrapper mute={mute}>
      <div
        data-testid="modal-container"
        className="disabledLink-container"
        onClick={() => {
          handleAdd({
            heading: <ModalHeader text="Do you want to Visit a UI-only page?" />,
            body: (
              <LinkDescription
                to={to}
                text="This page you are about to visit do not have functionality but contains only dummy data and UI."
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

const DisabledLinkWrapper = styled.div<{
  mute?: boolean;
}>`
  width: 100%;
  position: relative;

  .disabledLink-container {
    width: 100%;
    height: 100%;
    position: absolute;
    cursor: ${(props) => (props.mute ? "not-allowed" : "pointer")};
  }

  .items {
    width: 100%;
    height: 100%;
  }
`;
