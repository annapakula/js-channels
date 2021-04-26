export function digitsFromString(string) {
  try {
    const number = string.match(/\d+/g).reduce((a, b) => a + b);
    if(parseInt(number))
      return number;
    else throw new Error();
  }
  catch {
    console.error(`Cannot return number: "${string}" must contain digits`)
  }
}

export function numberToImperialNotation(string) {
  try {
    if(typeof string !== "string") throw new Error();
    if(string.length > 3) {
      return digitsFromString(string).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return string;
  }
  catch {
    console.error(`Cannot change value to imperial notation: ${string} must be a "string", but its type is "${typeof string}"`);
    return "no data";
  }
}

export function sortElements(arr, sortBy) {
  switch (sortBy) {
    case "title":
      arr.sort((a,b) => a.title.localeCompare(b.title)); 
      break;
    case "subscribers":
      arr.sort((a,b) => digitsFromString(a.statistics.subscriberCount) - digitsFromString(b.statistics.subscriberCount)); 
      break;
    case "videos":
      arr.sort((a,b) => digitsFromString(a.statistics.videoCount) - digitsFromString(b.statistics.videoCount)); 
      break;
    case "views":
      arr.sort((a,b) => digitsFromString(a.statistics.viewCount) - digitsFromString(b.statistics.viewCount)); 
      break;
    default:
      console.error("Wrong sorting parameter");
      break;
  }
}