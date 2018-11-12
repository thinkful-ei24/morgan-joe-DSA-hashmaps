const HashMap = require("./hashmapdrills");

// rr aa cc e
// n o r t h
function hasPalindromePermutation(word) {
  const map = new HashMap();
  for (const letter of word) {
    if (map.get(letter)) map.remove(letter);
    else map.set(letter, true);
  }
  return map.length <= 1;
}

function hasPalindromePermutationWithSet(word) {
  const set = new Set();
  for (const letter of word) {
    if (set.has(letter)) set.delete(letter);
    else set.add(letter);
  }
  return set.size <= 1;
}

function main() {
  console.log(hasPalindromePermutationWithSet("acecarr")); // expect: true
  console.log(hasPalindromePermutationWithSet("north")); // expect: false
}

main();
