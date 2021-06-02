/** Detect whether a React component is a functional component */
export default function isFunctionalComponent(arg) {
  return !(arg.prototype && typeof arg.prototype.render === 'function');
}
