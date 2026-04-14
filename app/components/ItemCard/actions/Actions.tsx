import { TooltipGroup } from "@envato/design-system/components";

import { useItemCardContext } from "../ItemCardContext.tsx";

import { DownloadAction } from "./DownloadAction/DownloadAction.tsx";
import { EditAction } from "./EditAction.tsx";
import { WorkspaceAction } from "./WorkspaceAction.tsx";

export function Actions() {
  const { actions } = useItemCardContext();

  return (
    <TooltipGroup>
      {actions.map((action, index) => {
        switch (action.type) {
          case "download": {
            return (
              <DownloadAction key={`${action.type}-${index}`} {...action} />
            );
          }

          case "edit": {
            return <EditAction key={`${action.type}-${index}`} {...action} />;
          }

          case "workspace": {
            return (
              <WorkspaceAction key={`${action.type}-${index}`} {...action} />
            );
          }
        }
      })}
    </TooltipGroup>
  );
}
