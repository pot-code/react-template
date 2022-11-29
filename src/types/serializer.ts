export interface URLSerializer<T> {
  serialize(obj: T): string;
  deserialize(query: string): T;
}
