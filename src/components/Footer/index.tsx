import icons from "../../constants/icons/index";
import Button from '../../components/Button';
import styled from "styled-components";
import { COLORS } from "../../constants";



const Footer = () => {
  return (
    
      <FFooter>
        <div className="agent-icon">
          <i>{icons.supportAssistantIcon()}</i>
          <span>Advisor</span>
        </div>

        <div className="btn-describe-problem">
          <Button>
            <p className="btn-text">Please briefly describe your problem</p>
          </Button>
        </div>
        
      </FFooter>
    
  );
};

export default Footer;

const FFooter = styled.footer`
        position: fixed;
        bottom: 0;
        left: 0;
        background-color: hsl(0, 0%, 97.7%);
        box-shadow: 0px -3px 4px 0px hsla(0, 0%, 0%, 0.12);

        width: 100%;     
        height: 64px;
        padding: 16px;

        display: grid;
        align-content: center;

        transition: 0.4s;

        display: flex;
        justify-content: space-around;
      
      .agent-icon{
        display: flex;
        flex-direction: column;
        align-items: center;
        
      }

      Button{
        padding: 8px 16px;
        border-radius: 3rem;
        background-color: hsla(0, 0%, 81%, 1);
        color: ${COLORS.black};
        cursor: pointer;
        border: none;
        padding-top: 0;
        font-size: 1rem;
        white-space: nowrap;
      }
      
      Button:hover, Button:focus{
        border: 1px solid;
        background-color: rgb(232, 232, 232);
        color: ${COLORS.black};
      }
`;
