import React, { MouseEvent, useEffect, useState } from "react";

import Image from "next/image";

import { startGame } from "@/store/game/gameSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/store";
import Counter from "@/components/Counter";
import useTimer from "@/hooks/useTimer";
import { getRestartButtonImageProps } from "@/utils/imageHelpers";
import githubIcon from "../../../public/github-icon.svg";

import {
  RestartButton,
  ScoreBarContainer,
  GithubLink,
  GameModesContainer,
  GameMode,
} from "./styles";

interface Props {
  isMouseDown: boolean;
}

const ScoreBar: React.FC<Props> = ({ isMouseDown }) => {
  const [gameMode, setGameMode] = useState("easy");

  const dispatch = useAppDispatch();
  const { isGameRunning, isGameOver, isGameWon, numberOfMines, flaggedTiles } =
    useAppSelector((state: RootState) => state.game);
  const [isRestartButtonPressed, setIsRestartButtonPressed] = useState(false);
  const time = useTimer();

  const modes = ["easy", "medium", "hard"];

  const resetGame = () => {
    dispatch(startGame(gameMode));
  };

  const handlePickMode = (e: React.MouseEvent<HTMLDivElement>) => {
    setGameMode(e.currentTarget.textContent || "");
  };

  const onPressRestartButton = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsRestartButtonPressed(true);
  };

  const onMouseLeaveOrGoUp = () => {
    setIsRestartButtonPressed(false);
  };

  const imageProps = getRestartButtonImageProps(
    isGameRunning,
    isGameOver,
    isGameWon,
    isMouseDown
  );

  useEffect(() => {
    dispatch(startGame(gameMode));
  }, [dispatch, gameMode]);

  return (
    <ScoreBarContainer>
      <GameModesContainer>
        {modes.map((mode) => (
          <GameMode
            key={mode}
            onClick={handlePickMode}
            $isModePicked={gameMode === mode}
          >
            {mode}
          </GameMode>
        ))}
      </GameModesContainer>
      <RestartButton
        $isMouseDown={isRestartButtonPressed}
        onMouseDown={onPressRestartButton}
        onMouseLeave={onMouseLeaveOrGoUp}
        onMouseUp={onMouseLeaveOrGoUp}
        onClick={resetGame}
      >
        <Image {...imageProps} width={20} height={20} alt="aboba" />
      </RestartButton>
      <div>
        <Counter
          icon="🚩"
          unformattedTime={0}
          flagsLeft={numberOfMines - flaggedTiles}
        />
        <Counter icon="🕑" unformattedTime={time} />
      </div>
      <GithubLink href="https://github.com/VarSlax/minesweeper" target="_blank">
        <Image
          src={githubIcon}
          alt="View source on GitHub"
          width={20}
          height={20}
        />
        View Source
      </GithubLink>
    </ScoreBarContainer>
  );
};

export default ScoreBar;
