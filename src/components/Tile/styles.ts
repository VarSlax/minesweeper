import styled, { css } from "styled-components";

import { theme } from "@/styles";

interface StyledTileProps {
  $isOpen: boolean;
  $isMouseDown: boolean;
  color: string;
}

export const StyledTile = styled.div<StyledTileProps>(
  ({ $isOpen, $isMouseDown, color }) => css`
    height: 20px;
    width: 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;

    & > img {
      position: absolute;
    }

    color: ${color};
    ${!$isOpen &&
    css`
      &:hover {
        border: none;
        cursor: pointer;
      }
    `}
    ${$isOpen
      ? css`
          border-left: 1px solid ${theme.colors.BORDER_COLOR};
          border-top: 1px solid ${theme.colors.BORDER_COLOR};
          background-color: ${theme.colors.WHITE};
        `
      : css`
          ${theme.borderStyle}
        `}
      ${$isMouseDown &&
    css`
      &:hover {
        border: none;
        border-left: 1px solid ${theme.colors.MEDIUM_GRAY};
        border-top: 1px solid ${theme.colors.MEDIUM_GRAY};
      }
    `};
  `
);
