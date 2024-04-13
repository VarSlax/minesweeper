import { createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from "@/store/index";
import { ITile, TileNature } from "@/store/game/gameTypes";
import { openTile, gameOver } from "@/store/game/gameSlice";

import { getRecursiveTilesToOpen } from "@/utils/gameHelpers";

export const openTileHandler = createAsyncThunk<
  void,
  ITile,
  { state: RootState }
>("game/openTileHandler", (tile, thunkAPI) => {
  if (tile.nature === TileNature.EMPTY) {
    const tilesToOpen = getRecursiveTilesToOpen(
      tile,
      thunkAPI.getState().game.tiles
    );

    tilesToOpen.forEach((tile) => {
      thunkAPI.dispatch(openTile(tile.coordinates));
    });

    return;
  }

  if (tile.nature === TileNature.MINE) {
    thunkAPI.dispatch(gameOver(tile));
    return;
  }

  thunkAPI.dispatch(openTile(tile.coordinates));
});
