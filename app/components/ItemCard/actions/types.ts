import type { Props as DownloadActionProps } from "./DownloadAction/DownloadAction.tsx";
import type { Props as WorkspaceActionProps } from "./WorkspaceAction.tsx";

type DownloadAction = { type: "download" } & DownloadActionProps;
type EditAction = { type: "edit" };
type WorkspaceAction = { type: "workspace" } & WorkspaceActionProps;

export type Action = DownloadAction | EditAction | WorkspaceAction;

export type ActionType = Action["type"];
