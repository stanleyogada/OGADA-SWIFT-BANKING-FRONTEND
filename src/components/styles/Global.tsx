import { createGlobalStyle } from "styled-components";
import { COLORS } from "../../constants/colors";


const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Open+Sans:wght@400;600&display=swap');

  *{
    box-sizing: border-box;
  }

  body{
    background-color: ${COLORS.white};
    color: hsl(192, 100%, 9%);
    font-family: 'Inter', sans-serif;
    font-size: 1.15rem;
    margin: 0;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  a:-webkit-any-link {
  text-decoration: none;
  color: inherit;
}

`

export default GlobalStyles;