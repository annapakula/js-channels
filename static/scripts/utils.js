export function digitsFromString(string) {
  try {
    const number = string.match(/\d+/g).reduce((a, b) => a + b);

    if(parseInt(number))
      return number;
    else throw new Error();
  }
  catch {
    console.log(`${string} is not a number!`)
  }
}

export function numberToImperialNotation(string) {
  if(string.length > 3) {
    const imperialNotation = digitsFromString(string).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return imperialNotation;
  }
  return string;
}
