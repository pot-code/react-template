export interface URLSerializer<T> {
  serialize(obj: T): string;
  deserialize(query: string): T;
}

export class DefaultURLSerializer implements URLSerializer<Record<string, any>> {
  // eslint-disable-next-line class-methods-use-this
  serialize(query: Record<string, any>) {
    return new URLSearchParams(
      Object.entries(query)
        .filter((e) => e[1] !== null && e[1] !== undefined)
        .map((e) => [e[0], String(e[1])])
    ).toString();
  }

  // eslint-disable-next-line class-methods-use-this
  deserialize(query: string): Record<string, any> {
    const params = new URLSearchParams(query);
    return Object.fromEntries(params.entries());
  }
}
