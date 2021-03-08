export function StandardizeRes(target: any) {
  for (const propertyName of Object.keys(target.prototype)) {
    const desc = Object.getOwnPropertyDescriptor(target.prototype, propertyName);
    const isMethod = desc.value instanceof Function;
    if (!isMethod) continue;
    const origin = desc.value;
    desc.value = function(...args: any[]) {
      const res = origin.apply(this, args);
      return JSON.stringify({
        data: res
      });
    };
    Object.defineProperty(target.prototype, propertyName, desc);
  }
}