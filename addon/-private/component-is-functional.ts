export default function componentIsFunctional(arg: any): arg is Function {
  return arg.prototype.render === undefined;
}
