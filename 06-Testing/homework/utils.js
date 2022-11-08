function sumArray(array, num) {
  if(!Array.isArray(array)) throw new TypeError('array')
  if(typeof num !== 'number') throw new TypeError('number')

  for (let i = 0; i < array.length; i++) {
    for (let x = 1; x < array.length; x++) {
      if (array[i] + array[x] === num) return true;
    }
  }
  
  return false;
}

function findProperty(array, prop) {
  return array.map(o => o[prop])
}

module.exports = {
  sumArray,
  findProperty
};
