import styled from "styled-components";

export const MainWrapper = styled.main`
  .chat.chat-container {
    width: calc(255rem / 16);
    max-width: fit-content;

    border: 2px solid hsla(214, 100%, 50%, 1);

    border-radius: 0.75em 0.75em 0.75em 0px;

    margin-top: 32px;
    margin-left: 16px;

    padding: 8px;
  }

  .chat.chat-content {
    padding: 4px;
    line-height: 1.5;
    color: hsla(214, 100%, 50%, 1);
    font-weight: 400px;
    font-size: 1.2rem;
  }
`;
