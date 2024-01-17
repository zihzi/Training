let checkStringA = "amanaplanacanalpanama";
let checkStringB = "raceacar";

function isPalindrome(inputString) {
  // 完成此 function
  for (let i = 0; i < inputString.length / 2; i++) {
    if (inputString[i] !== inputString[inputString.length - 1 - i]) {
      return false;
    }
  }
  return true;
}
console.log(isPalindrome(checkStringA)); // true
console.log(isPalindrome(checkStringB)); // false
