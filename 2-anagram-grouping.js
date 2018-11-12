const HashMap = require('./hashmapdrills');

function anagramGrouping(wordList) {
  const hashMap = new HashMap();
  let groupsArray = []; //Groups of anagrams will be pushed here

  const groupIndexFinder = (array, grouping) => {
    //Loop through groupsArray and find the grouping(e.s aest)
    for (let i=0; i< array.length; i++) {
      if (array[i][0].split('').sort().join('') === grouping) {
        //If first item in the array inside of 
        //groupsArray is the same as the grouping
        //argument, then return the index number of array
        return i;
      }
    }
  }

  for (let i=0; i < wordList.length; i++) {
    const grouping = wordList[i].split('').sort().join('');
    if(hashMap.get(grouping) === undefined) {
      groupsArray.push([wordList[i]]);
      hashMap.set(grouping, groupIndexFinder(groupsArray, grouping));
    } else {
      groupsArray[hashMap.get(grouping)].push(wordList[i]);
    }
  }

  return groupsArray;
}

function main() {
  console.log(anagramGrouping(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']));
}

main();