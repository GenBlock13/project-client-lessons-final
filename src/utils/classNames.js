export function classNames(
  cls,
  mods = {},
  addCls = []
){
  return [
    cls,
    ...addCls.filter(Boolean),
    ...Object.entries(mods)
      .filter(([_, value]) => Boolean(value))
      .map(([className]) => className),
  ].join(' ')
}
