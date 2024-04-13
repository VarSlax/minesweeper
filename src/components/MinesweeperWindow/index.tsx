import React, { MouseEvent, useEffect, useState } from "react";

import TileGrid from "@/components/TileGrid";
import ScoreBar from "@/components/ScoreBar";
import { useAppDispatch, useAppSelector } from "@/store";
import { selectGameSlice, startGame } from "@/store/game/gameSlice";

import { GameContent } from "./styles";

const MinesweeperWindow: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isGameOver, isGameWon } = useAppSelector(selectGameSlice);

  const [isMouseDown, setIsMouseDown] = useState(false);

  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.button !== 0 || isGameOver || isGameWon) {
      return;
    }

    setIsMouseDown(true);
  };

  const onMouseUp = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.button !== 0) {
      return;
    }

    setIsMouseDown(false);
  };

  useEffect(() => {
    dispatch(startGame("easy"));
  }, [dispatch]);

  return (
    <GameContent onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
      <TileGrid isMouseDown={isMouseDown} />
      <ScoreBar isMouseDown={isMouseDown} />
    </GameContent>
  );
};

export default MinesweeperWindow;
