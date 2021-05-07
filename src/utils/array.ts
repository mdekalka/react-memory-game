export const  splitToChunks = <T>(array: Array<T>, size: number) => {
  if (!array || !array.length) return [];
  
  let copy = [...array];
  let result = [];

  for (let i = size; i > 0; i--) {
    result.push(copy.splice(0, Math.ceil(copy.length / i)));
  }

  return result;
}