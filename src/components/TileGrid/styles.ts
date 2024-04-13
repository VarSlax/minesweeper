import styled from "styled-components";

import { theme } from "@/styles";

export const TilesGridContainer = styled.div`
  ${theme.borderStyle}
  background-color: ${theme.colors.LIGHT_GRAY};

  width: fit-content;
`;

export const TilesWrapper = styled.div`
  display: flex;
`;
