import styled, { css } from "styled-components";

const colors = {
  WHITE: "#f5f5f5",
  LIGHT_GRAY: "#b0b0b0",
  DARK_GRAY: "#3c3f41",
  MEDIUM_GRAY: "#54595b",
  GAME_PANEL_BACKGROUND: "#2b2b2b",
  BORDER_COLOR: "#1f1f1f",
  BUTTON_HOVER: "#3c3f41",
};

const borderStyle = css`
  border: 1px solid ${colors.BORDER_COLOR};
`;

export const TitleImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const GameTitle = styled.div`
  color: ${colors.WHITE};
  margin-bottom: 6px;
  text-transform: uppercase;
  font-size: 32px;
  letter-spacing: 5px;
  text-align: center;
  margin-bottom: 10px;
`;

export const CentralizeWindow = styled.div`
  background-color: ${colors.DARK_GRAY};
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const theme = {
  colors,
  borderStyle,
};
