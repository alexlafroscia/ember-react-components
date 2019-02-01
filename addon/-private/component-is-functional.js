export default function componentIsFunctional(arg) {
  return arg.prototype.render === undefined;
}
