import type { CameraAngle } from "../types/CameraAngle.ts";
import type { Selection } from "../types/Selection.ts";
import type { SelectionAspectRatio } from "../types/SelectionAspectRatio.ts";
import type { ToolMode } from "../types/ToolMode.ts";

import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
} from "react";

type ImageDimensions = {
  height: number;
  width: number;
};

type PointerEvents = "auto" | "none";

type Context = {
  cameraAngle: CameraAngle;
  imageDimensions: ImageDimensions | null;
  imageUrl: string | null;
  pointerEvents: PointerEvents;
  selection: Selection | null;
  selectionAspectRatio: SelectionAspectRatio;
  setCameraAngle: Dispatch<SetStateAction<CameraAngle>>;
  setImageDimensions: Dispatch<SetStateAction<ImageDimensions | null>>;
  setImageUrl: Dispatch<SetStateAction<string | null>>;
  setPointerEvents: Dispatch<SetStateAction<PointerEvents>>;
  setSelection: Dispatch<SetStateAction<Selection | null>>;
  setSelectionAspectRatio: Dispatch<SetStateAction<SelectionAspectRatio>>;
  setToolMode: Dispatch<SetStateAction<ToolMode>>;
  toolMode: ToolMode;
};

type Props = PropsWithChildren;

function noOp() {}

const ImageEditorContext = createContext<Context>({
  cameraAngle: { pitch: 0, yaw: 0, zoom: 0 },
  imageDimensions: null,
  imageUrl: null,
  pointerEvents: "auto",
  selection: null,
  selectionAspectRatio: "free",
  setCameraAngle: noOp,
  setImageDimensions: noOp,
  setImageUrl: noOp,
  setPointerEvents: noOp,
  setSelection: noOp,
  setSelectionAspectRatio: noOp,
  setToolMode: noOp,
  toolMode: "pan",
});

export const ImageEditorProvider = ({ children }: Props) => {
  const [cameraAngle, setCameraAngle] = useState<CameraAngle>({
    pitch: 0,
    yaw: 0,
    zoom: 0,
  });

  const [imageDimensions, setImageDimensions] =
    useState<ImageDimensions | null>(null);

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [pointerEvents, setPointerEvents] = useState<PointerEvents>("auto");

  const [selection, setSelection] = useState<Selection | null>(null);

  const [toolMode, setToolMode] = useState<ToolMode>("pan");

  const [selectionAspectRatio, setSelectionAspectRatio] =
    useState<SelectionAspectRatio>("free");

  return (
    <ImageEditorContext.Provider
      value={{
        cameraAngle,
        imageDimensions,
        imageUrl,
        pointerEvents,
        selection,
        selectionAspectRatio,
        setCameraAngle,
        setImageDimensions,
        setImageUrl,
        setPointerEvents,
        setSelection,
        setSelectionAspectRatio,
        setToolMode,
        toolMode,
      }}
    >
      {children}
    </ImageEditorContext.Provider>
  );
};

export const useImageEditorContext = () => {
  return useContext(ImageEditorContext);
};
