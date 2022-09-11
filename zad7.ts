// c = 4a - 3b + (ab)^e + 2i

// ne znam sta je ovaj 2i ili sta vec treba značit onaj znak na kraju
// ako je to jedinična matrica napravi foru istu kao kad postavljam nule u 'result array'

const calcFunction = (arrayA: number[][], arrayB: number[][], e: number) => {
  let result: Array<Array<number>> = new Array();

  // da svaki clan result array-a ima vrijednost 0
  for (let x = 0; x < arrayA.length; x++) {
    result[x] = [];
    for (let y = 0; y < arrayB[0].length; y++) {
      result[x][y] = 0;
    }
  }

  const getSameNumberArray = (sameNumber: number) => {
    let zeroArr: Array<Array<number>> = new Array();

    // da svaki clan zeroArr array-a ima vrijednost 0
    for (let x = 0; x < arrayA.length; x++) {
      zeroArr[x] = [];
      for (let y = 0; y < arrayB[0].length; y++) {
        zeroArr[x][y] = sameNumber;
      }
    }
    return zeroArr;
  };

  const multiply = (a: number[][], b: number[][]) => {
    // množenje
    let multiplyRes = getSameNumberArray(0);
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < b[0].length; j++) {
        for (let k = 0; k < a[0].length; k++) {
          multiplyRes[i][j] = a[i][k] * b[k][j] + multiplyRes[i][j];
        }
      }
    }

    return multiplyRes;
  };

  const onPower = (power: number) => {
    let axbArray = multiply(arrayA, arrayB);
    console.log(axbArray);
    // let res;
    let res = getSameNumberArray(1);
    for (let x = 0; x < power - 1; x++) {
      // power na -1 da ne napravi jedno množenje viska
      if (power === 1) res = axbArray;
      else if (power === 2) res = multiply(axbArray, axbArray);
      else if (power > 2) {
        if (x === 0) res = multiply(axbArray, axbArray); // res na ^ 2
        else if (x > 0) res = multiply(res, axbArray);
        console.log(x);
      }
    }

    return res;
  };

  const multiplyByNumber = (array: number[][], multiplier: number) => {
    let multiplyByNumRes: Array<Array<number>> = new Array();
    for (let x = 0; x < array.length; x++) {
      multiplyByNumRes[x] = [];
      for (let y = 0; y < array.length; y++) {
        multiplyByNumRes[x][y] = array[x][y] * multiplier;
      }
    }
    return multiplyByNumRes;
  };

  const sumOrSubtractArrays = (
    a: number[][],
    b: number[][],
    operation: number
  ) => {
    // 0 for -, 1 for +
    let res = getSameNumberArray(0);
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < b.length; j++) {
        if (operation === 1) res[i][j] = a[i][j] + b[i][j];
        else res[i][j] = a[i][j] - b[i][j];
      }
    }

    return res;
  };

  // c = 4a - 3b + (ab)^e + 2i
  const main = () => {
    let fourA = multiplyByNumber(arrayA, 4);
    let threeB = multiplyByNumber(arrayB, 3);

    let subtractAB = sumOrSubtractArrays(fourA, threeB, 0);

    let abOnPower = onPower(e);

    return sumOrSubtractArrays(subtractAB, abOnPower, 1);
  };

  console.log(main());
};

calcFunction(
  [
    [1, 2],
    [3, 4],
  ],
  [
    [5, 8],
    [7, 9],
  ],
  2
);
