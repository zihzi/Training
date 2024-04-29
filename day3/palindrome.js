let checkStringA = "amanaplanacanalpanama";
let checkStringB = "raceacar";

function isPalindrome(inputString) {
  // 完成此 function
  let i = 0;
  let j = inputString.length - 1;
  while (i < j) {
    if (inputString[i] !== inputString[j]) {
      return false;
    } else {
      i++;
      j--;
    }
  }
  return true;
}
console.log(isPalindrome(checkStringA)); // true
console.log(isPalindrome(checkStringB)); // false
