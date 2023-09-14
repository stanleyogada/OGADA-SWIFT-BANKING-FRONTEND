interface IStack<T> {
  push(item: T): void;
  pop(): T | undefined;
  size(): number;
  peek(): T | undefined;
  data(): T[];
}

class Stack<T> implements IStack<T> {
  private _data: T[] = [];

  push(item: T): void {
    this._data.push(item);
  }

  pop(): T | undefined {
    return this._data.pop();
  }

  size(): number {
    return this._data.length;
  }

  peek(): T | undefined {
    return this._data[this._data.length - 1];
  }

  data(): T[] {
    return this._data;
  }

  static clone = <T>(data: T[]): Stack<T> => {
    const stack = new Stack<T>();
    data.forEach((item) => stack.push(item));

    return stack;
  };
}

export default Stack;
export type { IStack };
