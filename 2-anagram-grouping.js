const HashMap = require("./hashmapdrills");

function anagramGrouping(wordList) {
  const hashMap = new HashMap();
  let groupsArray = []; //Groups of anagrams will be pushed here

  const groupIndexFinder = (array, grouping) => {
    //Loop through groupsArray and find the grouping(e.s aest)
    for (let i = 0; i < array.length; i++) {
      if (
        array[i][0]
          .split("")
          .sort()
          .join("") === grouping
      ) {
        //return the index position of array
        return i;
      }
    }
  };

  for (let i = 0; i < wordList.length; i++) {
    const grouping = wordList[i]
      .split("")
      .sort()
      .join("");
    if (hashMap.get(grouping) === undefined) {
      groupsArray.push([wordList[i]]);
      hashMap.set(grouping, groupIndexFinder(groupsArray, grouping));
    } else {
      groupsArray[hashMap.get(grouping)].push(wordList[i]);
    }
  }

  return groupsArray;
}

function main() {
  console.log(
    anagramGrouping(["east", "cars", "acre", "arcs", "teas", "eats", "race"])
  );
}

main();

function anagramGroupingv2(wordList) {
  const hashMap = new HashMap();
  const result = [];
  for (const word of wordlist) {
    const sortedWord = word
      .split("")
      .sort()
      .join("");
    const group = hashMap.get(sortedWord);
    if (group !== undefined) {
      result[group].push(word);
    } else {
      result.push([word]);
      hashMap.set(sortedWord, result.length - 1);
    }
  }
  return result;
}
