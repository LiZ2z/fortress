export default function classNames(
  className: string,
  ...classnames: (string | undefined | false)[]
) {
  let result = className;
  let name;

  for (let i = 0, len = classnames.length; i < len; i += 1) {
    name = classnames[i];
    result += name ? ` ${name}` : '';
  }

  return result;
}
