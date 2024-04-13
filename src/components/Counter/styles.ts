import styled from "styled-components";

import { theme } from "@/styles";

export const Icon = styled.div`
  margin-bottom: 4px;
`;

export const CounterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 4px;
  padding: 4px;
  border-radius: 4px;
  border: 1px solid ${theme.colors.BORDER_COLOR};
`;
