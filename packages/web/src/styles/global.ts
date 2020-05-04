import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  body {
    background: #F0F2F5 ;
    -webkit-font-smoothing: antialiased
  }
  body, input, button {   
    font-family: 'Inter', sans-serif;
  }
  button {
    cursor: pointer;
  }
`;
