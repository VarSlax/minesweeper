import styled, { css } from "styled-components";

import { theme } from "@/styles";

interface RestartButtonProps {
  $isMouseDown: boolean;
}

interface PickGameModesButtonProps {
  $isModePicked: boolean;
}

export const GithubLink = styled.a`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  text-decoration: none;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid ${theme.colors.BORDER_COLOR};
  color: ${theme.colors.WHITE};
  background-color: ${theme.colors.BUTTON_HOVER};
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.4s;

  &:hover {
    background-color: ${theme.colors.MEDIUM_GRAY};
  }
`;

export const ScoreBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid ${theme.colors.BORDER_COLOR};
  border-left: none;
  padding: 10px;
  box-sizing: border-box;
  background-color: ${theme.colors.GAME_PANEL_BACKGROUND};
  color: ${theme.colors.WHITE};
`;

export const RestartButton = styled.div<RestartButtonProps>`
  ${theme.borderStyle}
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  margin-bottom: 12px;
  border: none;
  cursor: pointer;

  ${({ $isMouseDown }) =>
    $isMouseDown &&
    css`
      &:hover {
        transform: scale(0.8);
        border-top-width: 2px;
        border-left-width: 2px;
      }
    `}

  & > button {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    outline: none;
    background: none;
    border: none;
    min-width: initial;
    min-height: initial;
    padding: initial;

    &:hover,
    &:active,
    &:focus {
      box-shadow: none;
      background: none;
    }
  }
`;

export const GameModesContainer = styled.div`
  display: flex;
  justify-conent: space-between;
  background-color: ${theme.colors.GAME_PANEL_BACKGROUND};
  margin-bottom: 1rem;
  border-radius: 4px;
`;

export const GameMode = styled.div<PickGameModesButtonProps>`
  padding: 0.6rem;
  font-size: 0.8rem;
  cursor: pointer;
  color: ${theme.colors.WHITE};

  ${({ $isModePicked }) =>
    $isModePicked &&
    css`
      background-color: ${theme.colors.BUTTON_HOVER};
      border-radius: 4px;
    `}
`;
