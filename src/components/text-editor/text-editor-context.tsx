type Listener<T> = (value: T) => void;

export class EditorEventEmitter<T> {
  private listeners = new Set<Listener<T>>();

  subscribe(listener: Listener<T>) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  emit(value: T) {
    for (const listener of this.listeners) {
      listener(value);
    }
  }
}
