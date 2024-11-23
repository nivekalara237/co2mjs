const isNode = () => typeof window === "undefined" && typeof process === "object";
const isBrowser = () =>  !isNode;

export {
  isBrowser,
  isNode
}