import type { WritableDraft } from "immer";

export type ZustandSetAction<T> = (state: WritableDraft<T>) => void;
export type ZustandGetAction<T> = () => T;

export interface StoreWithActions<State, Actions> {
  state: State;
  actions: Actions;
}

export type StoreSetFunction<T> = (updater: ZustandSetAction<T>) => void;
export type StoreGetFunction<T> = () => T;
