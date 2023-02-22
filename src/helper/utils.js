/**
 * Remove duplicate elements in array
 *
 * */
export const removeDuplicates = (arr) => [...new Map(arr.map(v => [v.id, v])).values()];
