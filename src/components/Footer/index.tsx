import icons from "../../constants/icons/index";
import { FooterWrapper } from "./FooterStyle";

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
