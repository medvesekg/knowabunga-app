// Typescript helper to determine if a value is a key of an object
export function isKeyOf<T extends object>(key: any, obj: T): key is keyof T {
  return key in obj;
}
