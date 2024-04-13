import React from "react";
import { formatSeconds } from "@/utils/formatSeconds";

import { CounterContainer, Icon } from "./styles";
export interface Props {
  icon: React.ReactNode;
  unformattedTime: number | 0;
  flagsLeft?: number;
}

const Counter: React.FC<Props> = ({ unformattedTime, flagsLeft, icon }) => {
  const time = formatSeconds(unformattedTime);

  return (
    <CounterContainer>
      <Icon>{icon}</Icon>
      {flagsLeft ?? time}
    </CounterContainer>
  );
};

export default Counter;
