import styled from "styled-components";
import variables from "../variables";

const Contenedor = styled.div`
  width: 100%;
  max-width: 375px;
  background-color: #1E252F;
  padding: 30px;
    
  @media (min-width: 320px) {
    margin: 0 20px;
    border-radius: 30px;
    overflow: hidden;
  }
`;

const Titulo = styled.h1`
  font-family: ${variables.font};
  font-size: ${variables.step6};
  text-align: center;
  margin: 20px 0;
  color: #fb7413;
`;

const Formulario = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: ${variables.font};

  input[type="submit"] {
    margin-top: 10px;
    border: none;
    background-color: #fb7413;
    color: #fff;
    font-weight: ${variables.font};
    font-size: ${variables.step2};
    font-weight: 700;
    border-radius: 20px;
    padding: 10px 0;
    cursor: pointer;
    transition: all .3s ease;

    :hover {
      background-color: #fff;
      color: #fb7413;
    }
  }

  button {
    cursor: pointer;
    border: none;
    font-size: ${variables.step2};
    border-radius: 30px;
    padding: 10px;
    background-color: #242C35;
    text-align: center;
    text-decoration: none;
    color: #fff;
    transition: all .3s ease;

    :hover {
      background-color: #E81224;
    }
  }
`;

const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  label {
    font-size: ${variables.step2};
    color: #828892;
    line-height: 1.5;
  }

  input {
    font-size: ${variables.step2};
    padding: 10px;
    border: none;
    border-radius: 10px 0;
    color: #fff;
    background-color: #262F38;

    :focus {
      outline: none;
    }
  }
`;

export {
  Contenedor,
  Titulo,
  Formulario,
  FormControl
}