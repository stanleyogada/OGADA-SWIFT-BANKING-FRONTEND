import icons from "../../constants/icons/index";
import Button from "../../components/Button";
import styled from "styled-components";
import { COLORS } from "../../constants";

const Footer = () => {
  return (
    <FooterWrapper>
      <div>
        <i>{icons.supportAssistantIcon()}</i>
        <span>Advisor</span>
      </div>

      
      <input type="text" name="userMsg" id="001" placeholder="Please briefly describe your problem"></input>
      
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: hsl(0, 0%, 97.7%);
  box-shadow: 0px -3px 4px 0px hsla(0, 0%, 0%, 0.12);

  width: 100%;
  min-height: 64px;
  padding: 16px;

  display: grid;
  align-content: center;

  transition: 0.4s;

  display: flex;
  justify-content: space-around;

  div{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 24px;
  }

  input{
  padding: 8px 16px;
  border-radius: 3rem;
  background-color: hsla(0, 0%, 81%, 1);
  color: ${COLORS.black};
  cursor: pointer;
  border: none;
  font-size: 1rem;

  width: fit-content;
  min-width: 112px;

 
  &:hover, &:focus {
    border: 1px solid;
    background-color: rgb(232, 232, 232);
    color: ${COLORS.black};
    font-weight: 500;
  }
}

`;

