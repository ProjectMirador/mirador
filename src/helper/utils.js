/**
 * Remove duplicate elements in array
 *
 * */
export const removeDuplicates = (arr) => {
  return arr.reduce((acc, curr) => {
    if (!acc.includes(curr)) {
      acc.push(curr);
    }
    return acc;
  }, []);
};
