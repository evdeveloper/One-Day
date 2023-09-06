export function wordCounter(number, words) {
  number = Math.abs(number);
  if (Number.isInteger(number)) {
    let options = [2, 0, 1, 1, 1, 2];
    return words[(number % 100 > 4 && number % 100 < 20) ? 2 : options[(number % 10 < 5) ? number % 10 : 5]];
  }
  return words[1];
}