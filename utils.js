const { quotes } = require('./data');

// Picks a random element from array

const getRandomElement = arr => {
  
  if (!Array.isArray(arr)) throw new Error('Expected an array');
  
  return arr[Math.floor(Math.random() * arr.length)];
}


const duplicateChecker = (object) => {

  const { person, quote} = object;

  let index = 0;

  while(index < quotes.length){
    if(quotes[index].person === person){
      if(quotes[index].quote === quote){
        return false;
      } 
    }
    index++;
  }

  return true;
}



module.exports = {
  getRandomElement, duplicateChecker
};
