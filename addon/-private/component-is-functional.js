export default function componentIsFunctional(arg) {
  return !(arg.prototype && typeof arg.prototype.render === 'function');
}
