import { useSyncExternalStore } from "react";

type Listener = () => void;

const overrides = new Map<string, boolean>();
const listenersByItemUuid = new Map<string, Set<Listener>>();

function getListeners(itemUuid: string): Set<Listener> {
  let listeners = listenersByItemUuid.get(itemUuid);
  if (!listeners) {
    listeners = new Set<Listener>();
    listenersByItemUuid.set(itemUuid, listeners);
  }
  return listeners;
}

function emit(itemUuid: string): void {
  const listeners = listenersByItemUuid.get(itemUuid);
  if (!listeners) return;
  for (const listener of listeners) {
    listener();
  }
}

export function setWorkspaceMembershipOverride(
  itemUuid: string,
  value: boolean,
): void {
  overrides.set(itemUuid, value);
  emit(itemUuid);
}

export function clearWorkspaceMembershipOverride(itemUuid: string): void {
  if (!overrides.has(itemUuid)) return;
  overrides.delete(itemUuid);
  emit(itemUuid);
}

export function getWorkspaceMembershipOverride(
  itemUuid: string,
): boolean | undefined {
  return overrides.get(itemUuid);
}

export function useWorkspaceMembershipOverride(
  itemUuid: string,
): boolean | undefined {
  return useSyncExternalStore(
    (listener) => {
      const listeners = getListeners(itemUuid);
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
        if (listeners.size === 0) {
          listenersByItemUuid.delete(itemUuid);
        }
      };
    },
    () => getWorkspaceMembershipOverride(itemUuid),
    () => getWorkspaceMembershipOverride(itemUuid),
  );
}
