import { ITile, TileNature } from "@/store/game/gameTypes";
import flag from "@/flag.png";
import mine from "@/mine-ceil.png";
import misflagged from "@/misflagged.png";
import deathMine from "@/mine-death.png";
import smile from "@/smile.png";
import ohh from "@/ohh.png";
import win from "@/win.png";
import dead from "@/dead.png";

interface ImageProps {
  src: string;
  alt: string;
}

const IMAGE_BY_NATURE = {
  [TileNature.ONE]: "1",
  [TileNature.TWO]: "2",
  [TileNature.THREE]: "3",
  [TileNature.FOUR]: "4",
  [TileNature.FIVE]: "5",
  [TileNature.SIX]: "6",
  [TileNature.SEVEN]: "7",
  [TileNature.EIGHT]: "8",
  [TileNature.MINE]: {
    src: mine as unknown as string,
    alt: "mine",
  },
  flag: {
    src: flag as unknown as string,
    alt: "flag",
  },
  misflagged: {
    src: misflagged as unknown as string,
    alt: "misflagged",
  },
  deathMine: {
    src: deathMine as unknown as string,
    alt: "death mine",
  },
};

export const getTileImageProps = (tile: ITile): ImageProps | string => {
  if (tile.$isOpen && tile.isFlagged) {
    return IMAGE_BY_NATURE.misflagged;
  }

  if (tile.isFlagged) {
    return IMAGE_BY_NATURE.flag;
  }

  if (!tile.$isOpen || tile.nature === TileNature.EMPTY) {
    return "";
  }

  if (tile.isDeathMine) {
    return IMAGE_BY_NATURE.deathMine;
  }

  return IMAGE_BY_NATURE[tile.nature];
};

export const getRestartButtonImageProps = (
  isGameRunning: boolean,
  isGameOver: boolean,
  isGameWon: boolean,
  isMouseDown: boolean
): ImageProps => {
  if (isGameRunning && isMouseDown) {
    return {
      src: ohh as unknown as string,
      alt: "ohh",
    };
  }

  if (isGameOver) {
    return {
      src: dead as unknown as string,
      alt: "dead",
    };
  }

  if (isGameWon) {
    return {
      src: win as unknown as string,
      alt: "win",
    };
  }

  return {
    src: smile as unknown as string,
    alt: "smile",
  };
};
