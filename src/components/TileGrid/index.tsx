import React from "react";

import Tile from "@/components/Tile";
import { useAppSelector } from "@/store";
import { selectTiles } from "@/store/game/gameSlice";

import { TilesGridContainer, TilesWrapper } from "./styles";

interface Props {
  isMouseDown: boolean;
}

const TileGrid: React.FC<Props> = ({ isMouseDown }) => {
  const tiles = useAppSelector(selectTiles);

  return (
    <TilesGridContainer>
      {tiles.map((tileRow, x) => (
        <TilesWrapper key={x}>
          {tileRow.map((tile, y) => (
            <Tile key={`${x}:${y}`} tileData={tile} isMouseDown={isMouseDown} />
          ))}
        </TilesWrapper>
      ))}
    </TilesGridContainer>
  );
};

export default TileGrid;
