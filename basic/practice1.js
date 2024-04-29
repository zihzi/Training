// //階乘
// function factorial(number) {
//   let result = 1;
//   if (number == 0) {
//     return 0;
//   } else {
//     for (let i = 1; i <= number; i++) {
//       result = result * i;
//     }
//     return result;
//   }
// }
// let x = 10;
// console.log(x + "! is : " + factorial(x));

// //99乘法表
// let result = 0;
// for (let i = 1; i <= 9; i++) {
//   for (let j = 1; j <= 9; j++) {
//     result = i * j;
//     console.log(i + " * " + j + " = " + result);
//   }
//   console.log(i + " Finished");
// }

// //有多少個數小於n
// function findSmallCount(arr, n) {
//   let count = 0;
//   arr.forEach((element) => {
//     if (element < n) {
//       count++;
//     }
//   });
//   return count;
// }

// console.log(findSmallCount([1, 2, 3], 2)); // 預期回傳值：1
// console.log(findSmallCount([1, 2, 3, 4, 5], 0)); // 預期回傳值：0
// console.log(findSmallCount([1, 2, 3, 4], 100)); // 預期回傳值：4

// //判斷質數
// function isPrime(n) {
//   if (n == 0) {
//     return false;
//   } else {
//     for (let i = 2; i < n; i++) {
//       if (n % i == 0) {
//         return false;
//       }
//     }
//       return true;
//   }
// }

// console.log(2, " is prime? ", isPrime(2));
// console.log(3, " is prime? ", isPrime(3));
// console.log(4, " is prime? ", isPrime(4));
// console.log(5, " is prime? ", isPrime(5));
// console.log(9, " is prime? ", isPrime(9));

//新陣列裡包含只有在其中一個陣列出現的數字
// let input1 = [1, 2, 3, 10, 5, 3, 14];
// let input2 = [1, 4, 5, 6, 14];

// function mergeExclusive(arr1, arr2) {
//   let newArr = [];

//   for (let i = 0; i < arr1.length; i++) {
//     let found1 = false;
//     for (let j = 0; j < arr2.length; j++) {
//       if (arr1[i] == arr2[j]) {
//         found1 = true;
//         break;
//       }
//     }
//     if (found1 == false) {
//       newArr.push(arr1[i]);
//     }
//   }
//   for (let k = 0; k < arr2.length; k++) {
//     let found2 = false;
//     for (let l = 0; l < arr1.length; l++) {
//       if (arr2[k] == arr1[l]) {
//         found2 = true;
//        break;
//       }
//     }
//     if (found2 == false) {
//       newArr.push(arr2[k]);
//     }
//   }

//   return newArr;
// }
// let resultArr = mergeExclusive(input1, input2);
// console.log(resultArr); // [2,3,10,3,4,6]

//LidemyOJ (LIOJ)1004
// function compare(a, b, k) {
//   if (k == 1 && a > b) {
//     return "A";
//   } else if (k == 1 && b >a) {
//     return "B";
//   }else if (k == -1 && a < b) {
//     return "A";
//   }else if (k == -1 && b < a) {
//     return "B";
//   } else{
//     return "DRAW";
//   }
// }

// //LidemyOJ (LIOJ)1005
// function match(a) {
//   if (a == 0) {
//     return;//什麼事都不做
//   } else {
//     let sum = 0;
//     let checksum = 0;
//     for (let i = 0; i < a; i++) {
//       if (a % i == 0) {
//         sum += i;
//       }
//     }
//     for (let i = 0; i < sum; i++) {
//       if (sum % i == 0) {
//         checksum += i;
//       }
//     }
//     if (checksum == a) {
//       return sum;
//     } else {
//       return "QQ";
//     }
//   }
// }

//LidemyOJ (LIOJ)1006
// function seat(n,taken) {
//   let choice = (n / 2 - 1) * 2 + (n / 2);
//   taken.forEach((seatNumber) => {
//     if (seatNumber == 1 || seatNumber == 2 || seatNumber == n - 1 || seatNumber == n) {
//       choice -= 2;
//     } else {
//       choice -= 3;
//   }
  
// });

//   return choice;

  
// }

// //LidemyOJ (LIOJ)1007
// function concat(arr,locate) {
//   let str = "";
//   locate.forEach((indexNumber) => {
//     for (let i = 0; i < arr.length; i++){
//       if (indexNumber-1 == i) {
//         str += arr[i];
//       }
//     }
//   });
//   return str;
// }


console.log(concat("yoman",[4,2,1]));
