import type { User } from "../types/User.ts";

import { useRouteLoaderData } from "react-router";

export function useUser(): User | undefined {
  const loaderData = useRouteLoaderData("root") as { user?: User };
  return loaderData?.user;
}
