const isNode = () => typeof process === "object";
const isBrowser = () =>  !isNode();

export {
  isBrowser,
  isNode
}