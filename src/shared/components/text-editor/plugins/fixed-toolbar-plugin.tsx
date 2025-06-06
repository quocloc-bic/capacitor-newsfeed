import { createPlatePlugin } from "@udecode/plate/react";

import { FixedToolbar } from "@/shared/components/ui/fixed-toolbar";
import { FixedToolbarButtons } from "@/shared/components/ui/fixed-toolbar-buttons";

export const FixedToolbarPlugin = createPlatePlugin({
  key: "fixed-toolbar",
  render: {
    beforeEditable: () => (
      <FixedToolbar>
        <FixedToolbarButtons />
      </FixedToolbar>
    ),
  },
});
