import styled from "styled-components";
import variables from "../variables";

const Contenedor = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    font-family: ${variables.font};
    font-size: ${variables.step7};
    color: #fff;
    text-align: center;
    margin: 30px 0;
  }

  button {
    font-size: ${variables.step3};
    font-family: ${variables.font};
    border: none;
    color: #fff;

    padding: 30px;
  }

  .btnYes {
    background-color: #fb7413;
    transform: translate(-100%,0);
    cursor: pointer;
  }

  .btnNo {
    background-color: #695c52;
    position: absolute;
  }
`;

export {
  Contenedor
}