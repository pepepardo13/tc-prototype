import type { ReactElement, RefObject } from "react";

import { Box, Modal } from "@envato/design-system/components";

import { useTranslations } from "../../../../contexts/TranslationsContext.tsx";

import { Actions } from "./Actions.tsx";

type Props = {
  trigger: ReactElement<{ ref?: RefObject<HTMLButtonElement> }>;
};

export function ActionsModal({ trigger }: Props) {
  const t = useTranslations();

  return (
    <Modal dismissible trigger={trigger}>
      {({ Header, Body, setIsOpen }) => (
        <>
          <Box
            borderColor="tertiary"
            borderStyle="solid"
            borderWidth="thin"
            paddingBottom="4x"
            maxWidth="breakpoint-medium"
            width="viewport"
          >
            <Header>{t("imageEdit.tool.actionsPanel")}</Header>
            <Body>
              <Actions
                onActionClick={() => {
                  setIsOpen(false);
                }}
              />
            </Body>
          </Box>
        </>
      )}
    </Modal>
  );
}
