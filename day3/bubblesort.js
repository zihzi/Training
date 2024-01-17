let data = [8, 6, 1, 10, 5, 3, 9, 2, 7, 4];

function bubbleSort(array) {
  let temp = 0;
  for (let i = 1; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      if (array[j] > array[j + 1]) {
        temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }
  return array;
}

console.log(bubbleSort(data));
