export function arrayEquals(arrayA, arrayB) {
  arrayA.sort();
  arrayB.sort();
  return (
    Array.isArray(arrayA) &&
    Array.isArray(arrayB) &&
    arrayA.length === arrayB.length &&
    arrayA.every((val, index) => val === arrayB[index])
  );
}

export function difference(arrayA, arrayB) {
  //return items in A NOT B
  return arrayA.filter((x) => !arrayB.includes(x));
}

export function intersection(arrayA, arrayB) {
  //return items in BOTH array and B
  return arrayA.filter((x) => arrayB.includes(x));
}

export function overlap(arrayA, arrayB) {
  if (!arrayA || !arrayB) {
    return false;
  }
  let isFound = arrayA.some((item) => arrayB.includes(item));
  return isFound;
}

export function symmetricalDifference(arrayA, arrayB) {
  //returns items that are in A but not B, and B but not A. In other words, it is the opposite of intersection
  return arrayA
    .filter((x) => !arrayB.includes(x))
    .concat(arrayB.filter((x) => !arrayA.includes(x)));
}

export function union(arrayA, arrayB) {
  //a set of uniq items that are the combination of A and B
  return [...new Set([...arrayA, ...arrayB])];
}
