import { styled } from "styled-components";

export const BaseButton = styled.button`
    min-width: 165px;
    width: auto;
    height: 50px;
    letter-spacing: 0.5px;
    line-height: 50px;
    padding: 0 35px 0 35px;
    font-size: 10px;
    background-color: black;
    color: white;
    text-transform: uppercase;
    font-family: 'Open Sans';
    font-weight: bolder;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    transition: background-color 0.5s ease;

    &:hover {
      background-color: white;
      color: black;
      border: 1px solid black;
    }
`;

export const GoogleSignInButton = styled(BaseButton)`
      background-color: #db4a39;
      color: white;
  
      &:hover {
        background-color: #c53727;
        border: none;
      }
`;

export const InvertedButton = styled(BaseButton)`
      background-color: white;
      color: black;
      border: 1px solid black;
  
      &:hover {
        background-color: black;
        color: white;
        border: none;
      }
`;


