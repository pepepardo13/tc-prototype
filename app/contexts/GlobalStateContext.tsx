import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
} from "react";

type GlobalState = {
  navPanelMinimized: boolean;
  setNavPanelMinimized: Dispatch<SetStateAction<boolean>>;
  itemDetailsPanelOpen: boolean;
  setItemDetailsPanelOpen: Dispatch<SetStateAction<boolean>>;
  muted: boolean;
  setMuted: Dispatch<SetStateAction<boolean>>;
  volume: number;
  setVolume: Dispatch<SetStateAction<number>>;
};

function noOp() {}

const GlobalStateContext = createContext<GlobalState>({
  navPanelMinimized: false,
  setNavPanelMinimized: noOp,
  itemDetailsPanelOpen: false,
  setItemDetailsPanelOpen: noOp,
  muted: true,
  setMuted: noOp,
  volume: 1,
  setVolume: noOp,
});

export function GlobalStateProvider({ children }: PropsWithChildren) {
  const [navPanelMinimized, setNavPanelMinimized] = useState<boolean>(false);
  const [itemDetailsPanelOpen, setItemDetailsPanelOpen] =
    useState<boolean>(false);
  const [muted, setMuted] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(1);

  return (
    <GlobalStateContext.Provider
      value={{
        navPanelMinimized,
        setNavPanelMinimized,
        itemDetailsPanelOpen,
        setItemDetailsPanelOpen,
        muted,
        setMuted,
        volume,
        setVolume,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
}

export function useGlobalState(): GlobalState {
  return useContext(GlobalStateContext);
}
