import React, { MouseEvent } from "react";
import Image from "next/image";

import { useAppDispatch } from "@/store";
import { openTileHandler } from "@/store/game/gameThunks";
import { toggleTileFlag } from "@/store/game/gameSlice";
import { ITile } from "@/store/game/gameTypes";
import { getTileImageProps } from "@/utils/imageHelpers";

import { StyledTile } from "./styles";

interface Props {
  tileData: ITile;
  isMouseDown: boolean;
}

interface colorsTypes {
  [key: string]: string;
}

const valueColors: colorsTypes = {
  1: "#2a9a0b",
  2: "#ff9900",
  3: "#ff2a04",
  4: "#7a0000",
  5: "#600707",
  6: "#431d04",
};

const Tile: React.FC<Props> = ({ tileData, isMouseDown }) => {
  const dispatch = useAppDispatch();

  const onMouseUp = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.button !== 0) {
      return;
    }

    if (tileData.isFlagged || tileData.$isOpen) {
      return;
    }

    dispatch(openTileHandler(tileData));
  };

  const onRightClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (tileData.$isOpen) {
      return;
    }

    dispatch(toggleTileFlag(tileData));
  };

  const tileValue = getTileImageProps(tileData);

  const color = typeof tileValue === "string" ? valueColors[tileValue] : "";

  return (
    <StyledTile
      $isOpen={tileData.$isOpen}
      $isMouseDown={isMouseDown}
      onMouseUp={onMouseUp}
      onContextMenu={onRightClick}
      color={color}
    >
      {typeof tileValue === "string" || !tileValue ? (
        <div>{tileValue}</div>
      ) : (
        <Image src={tileValue.src} alt={tileValue.alt} />
      )}
    </StyledTile>
  );
};

export default Tile;
