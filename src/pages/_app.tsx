import { Provider } from "react-redux";
import store from "@/store";

import Image from "next/image";

import MinesweeperWindow from "@/components/MinesweeperWindow";
import { CentralizeWindow, GameTitle, TitleImageWrapper } from "@/styles/index";
import titleImg from "@/win.png";
import "@/styles/global.css";

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <CentralizeWindow>
        <GameTitle>
          <TitleImageWrapper>
            <Image src={titleImg} width={30} alt="win" />
          </TitleImageWrapper>
          MINESWEEPER
        </GameTitle>
        <MinesweeperWindow />
      </CentralizeWindow>
    </Provider>
  );
}

export default App;
