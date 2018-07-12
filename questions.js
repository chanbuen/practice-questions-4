/*
 * The 3n + 1 Problem
 *Consider the following algorithm to generate a sequence of numbers. Start with an
*integer n. If n is even, divide by 2. If n is odd, multiply by 3 and add 1. Repeat this
*process with the new value of n, terminating when n = 1. For example, the following
*sequence of numbers will be generated for n = 22:
*22 11 34 17 52 26 13 40 20 10 5 16 8 4 2 1
*It is conjectured (but not yet proven) that this algorithm will terminate at n = 1 for
*every integer n. Still, the conjecture holds for all integers up to at least 1, 000, 000.
*For an input n, the cycle-length of n is the number of numbers generated up to and
*including the 1. In the example above, the cycle length of 22 is 16. Given any two
*numbers i and j, you are to determine the maximum cycle length over all numbers
*between i and j, including both endpoints.
*
*Input
*The input will consist of a series of pairs of integers i and j, one pair of integers per
*line. All integers will be less than 1,000,000 and greater than 0.
*
*Output
*For each pair of input integers i and j, output i, j in the same order in which they
*appeared in the input and then the maximum cycle length for integers between and
*including i and j. These three numbers should be separated by one space, with all three
*numbers on one line and with one line of output for each line of input.
*
* Sample Input  Sample Output
*  1 10          1 10 20
*  100 200       100 200 125
*  201 210       201 210 89
*  900 1000      900 1000 174
*/

function cycleSize(start, end) {
  let current = start
  let count = 1 //immediately accounts for start num as current
  while (current !== 1) {
    if (current%2 === 0) {
      current = current/2
    } else {
      current = (current * 3) + 1
    }
    count+=1
    //add 1 for each new number set as next current num
  }
  return count
}

function maxCycleSize(start, end){

  let maxCycle = 0
  for (let i = start; i <= end; i++){
    let currentCycle = cycleSize(i, 1) 
    if (currentCycle > maxCycle) {
      maxCycle = currentCycle
    }
  }
  return maxCycle
}

// maxCycleSize(1, 10)

// cycleSize(9,1)

// Write a function that takes an array of integers and returns a sorted version of that array. Use the Bubble Sort algorithm to sort the array.

// Sample input = [8,5,2,9,5,6,3]
// Sample output = [2,3,5,5,6,8,9]

function bubbleSort(array){
  let sorted = false
  while(!sorted) {
    sorted = true
    for (let i= 0; i < array.length-1; i++){
      let isGreaterThan = array[i] > array[i+1]
      if (isGreaterThan){
        swap(i, i+1, array)
        sorted = false
      }
    }
  }
  return array
}

function swap(leftIndex, rightIndex, array){
  let larger = array[leftIndex]
  let smaller = array[rightIndex]
  array[leftIndex] = smaller
  array[rightIndex] = larger
  return array
}

// bubbleSort([8,5,2,9,5,6,3])

//Write a function that takes in an array and returns a sorted version of that array. Use the Merge Sort algorithm to sort the array

//Sample input: [8,5,2,9,5,6,3]
//Sample output: [2,3,5,5,6,8,9]

function mergeSort(array){
  if (array.length <= 1) {
    return array
  }
  let index = Math.floor((array.length)/2)
  let firstHalf = array.slice(0,index)
  let secondHalf = array.slice(index)
  return mergeSortedArrays(mergeSort(firstHalf), mergeSort(secondHalf))
}

function mergeSortedArrays(leftHalf, rightHalf){
  let sortedArray = new Array(leftHalf.length + rightHalf.length)
  let k = 0
  let i = 0
  let j = 0
  while (i < leftHalf.length && j < rightHalf.length){
    if (leftHalf[i] < rightHalf[j]){
      sortedArray[k++] = leftHalf[i++]
    } else {
      sortedArray[k++] = rightHalf[j++]
    }
  }
  while (i < leftHalf.length){
    sortedArray[k++] = leftHalf[i++]
  }
  while (j < rightHalf.length){
    sortedArray[k++] = rightHalf[j++]
  }
  return sortedArray
}

mergeSort([8,5,2,9,5,6,3])

//time complexity is O(nlog(n)) because 1) each set of subarrays created at a time results in 0(n). And we constantly do this, dividing the subarrays in half until we reach the base case for an array of length 1, hence this becomes O(nlog(n)). So we do 0(n), dividing the arrays, log(n) times

// [8, 5, 2, 9, 5, 6, 3] O(n)
// [8, 5, 2] [9, 5, 6, 3] 0(n/2) + 0(n/2) = 0(2n/2) = 0(n)
// [8] [5, 2] [9, 5] [6, 3] 0(n/4) + 0(n/4) + 0(n/4) + 0(n/4) = 0(n)
// [8] [5] [2] [9] [5] [6] [3] = 0(n/7)+0(n/7)+ 0(n/7)+0(n/7)+0(n/7)+0(n/7)+0(n/7) = 0(n)

// Write a function that takes an array of integers and returns a sorted version of that array. Use the insertion algorithm to sort the array

// Sample input: [8,5,2,9,5,6,3]

insertionSort([8,5,2,9,5,6,3])

function insertionSort(array) {
  for(let i=1; i < array.length; i++){
    let j=i
    while(j > 0 && array[j] < array[j-1]){
      insertSwap(j-1,j,array)
      j-=1
    }
  }
  return array
}

function insertSwap(leftIndex, rightIndex, array) {
  let larger = array[leftIndex]
  array[leftIndex] = array[rightIndex]
  array[rightIndex] = larger
  return array
}

// Write a function that takes in an non empty array of distinct integers and an integer representing a target sum. If any two numbers in the input array sum up to the target sum, the function should return them in the array, in sorted order. If no two numbers sum up to the target sum, the function should return an empty array. Assume that there will be at most one pair of numbers summing up to the target sum.

// Sample input: [3,5,-4,8,11,1,-1,6], 10
// Sample output: [-1,11]

function twoNumbersSum(array, target){
  let result = []
  for (let i=0; i < array.length; i++){
    for (let j=i+1; j < array.length; j++) {
      if (array[i] + array[j] === target) {
        return sort(array[i], array[j])

      }
    }
  }
  return result
}

function sort(first, second, array){
  let isGreaterThan = second > first
  if (isGreaterThan) {
    return [first, second]
  } else {
    return [second, first]
  }
}

twoNumbersSum([3,5,-4,8,11,1,-1,6], 10)