import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "@/store/index";
import {
  distributeMines,
  generateEmptyTileGrid,
  generateMines,
} from "@/utils/gameHelpers";

import { Coords, GameState, ITile, TileNature } from "@/store/game/gameTypes";

const INITIAL_STATE: GameState = {
  tiles: [],
  numberOfMines: 40,
  baseTiles: generateEmptyTileGrid(16, 16),
  currentDifficulty: "easy",
  mines: [],
  isGameOver: false,
  isGameRunning: false,
  isGameWon: false,
  openedTiles: 0,
  flaggedTiles: 0,
};

export const gameSlice = createSlice({
  name: "game",
  initialState: INITIAL_STATE,
  reducers: {
    startGame: (state, { payload: mode }: PayloadAction<string>) => {
      let size, numberOfMines;

      switch (mode) {
        case "easy":
          size = 16;
          numberOfMines = 40;
          break;
        case "medium":
          size = 20;
          numberOfMines = 80;
          break;
        case "hard":
          size = 24;
          numberOfMines = 200;
          break;
        default:
          size = 16;
          numberOfMines = 40;
          break;
      }
      const baseTiles = generateEmptyTileGrid(size, size);
      const mines = generateMines(baseTiles, numberOfMines);
      const tiles = distributeMines(baseTiles, mines);

      Object.assign(state, {
        ...INITIAL_STATE,
        baseTiles,
        mines,
        tiles,
        numberOfMines,
        currentDifficulty: mode,
      });
    },
    openTile: (state, action: PayloadAction<Coords>) => {
      const tile = state.tiles[action.payload.x][action.payload.y];
      if (!state.isGameOver && !state.isGameWon && !tile.$isOpen) {
        state.isGameRunning = true;
        tile.$isOpen = true;
        state.openedTiles += 1;

        if (
          state.openedTiles >=
          state.tiles[0].length * state.tiles.length - state.numberOfMines
        ) {
          state.isGameRunning = false;
          state.isGameWon = true;

          state.mines.forEach(({ coordinates }) => {
            state.tiles[coordinates.x][coordinates.y].isFlagged = true;
          });

          state.flaggedTiles = state.numberOfMines;
        }
      }
    },
    toggleTileFlag: (state, action: PayloadAction<ITile>) => {
      if (!state.isGameOver && !state.isGameWon) {
        const { coordinates, isFlagged } = action.payload;

        state.tiles[coordinates.x][coordinates.y].isFlagged = !isFlagged;

        if (isFlagged) {
          state.flaggedTiles -= 1;
        } else {
          state.flaggedTiles += 1;
        }
      }
    },
    gameOver: (state, { payload: { coordinates } }: PayloadAction<ITile>) => {
      state.isGameOver = true;
      state.isGameRunning = false;

      state.tiles[coordinates.x][coordinates.y].isDeathMine = true;

      state.tiles.forEach((tileRow) =>
        tileRow.forEach((tile) => {
          if (!(tile.nature === TileNature.MINE) !== !tile.isFlagged) {
            tile.$isOpen = true;
          }
        })
      );
    },
  },
});

export const { openTile, gameOver, toggleTileFlag, startGame } =
  gameSlice.actions;

export const selectTiles = (state: RootState): ITile[][] => state.game.tiles;
export const selectGameSlice = (state: RootState): GameState => state.game;

export default gameSlice.reducer;
