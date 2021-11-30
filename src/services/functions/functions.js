export function round100(num) {
  if (typeof num != "number") {
    return null;
  }
  if (num < 0) {
    return null;
  }
  if (num < 100) {
    return 100;
  }
  const n = Math.round(num);
  const res = n % 100;

  if (res == 0) {
    return n;
  }
  return n + 100 - res;
}
