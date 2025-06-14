import { LinkPlugin } from "@udecode/plate-link/react";

import { LinkFloatingToolbar } from "@/shared/components/ui/link-floating-toolbar";

export const linkPlugin = LinkPlugin.extend({
  render: { afterEditable: () => <LinkFloatingToolbar /> },
});
