let input1 = "SAPPORO";
let input2 = "chiikawa";

function reverseString(inputString) {
  // 完成此 function
  let rev = "";
  for (let i = inputString.length - 1; i >= 0; i--) {
    rev = rev + inputString[i];
  }
  return rev;
}
console.log(reverseString(input1));
console.log(reverseString(input2));
