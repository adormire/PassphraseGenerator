const desiredWordsPer = $('#wordsInPhrase');
const desiredSetsGenerated = $('#desiredSetsGenerated');
const resultsField = $('#passwordResults');
const rollMax = 6;
let generatedRolls = new Array();
let matchedWords = new Array();

let wordList = new Array();
$.get('eff_list.txt', function(data) {
  wordList = data.split("\n");
});

function match_words(generatedRolls) {
  for (let i = 0; i < generatedRolls.length; i++) {
    console.log("Roll: " + generatedRolls[i]);
    if ($.inArray(generatedRolls[i], wordList)) {
      wordList.findIndex(function(entry) {
        if (entry === generatedRolls[i]) {
          console.log("Entry: " + entry);
        }
      });
      console.log("match");
    }
  }
}

function generate_rolls() {
  const wordsPerPhrase = desiredWordsPer.val();
  const passphraseSets = desiredSetsGenerated.val();

  console.log("Words per: " + wordsPerPhrase);
  console.log("Sets generated: " + passphraseSets);

  let rollGroup;
  for (let i = 0; i < passphraseSets; i++) {
    for (let j = 0; j < wordsPerPhrase; j++) {
      rollGroup = '';
      for (let k = 0; k < rollMax; k++) {
        console.log(i, j, k);
        rollGroup += (Math.floor((Math.random() * rollMax) + 1).toString());
      }
      generatedRolls.push(rollGroup);
    }
  }
  resultsField.text(generatedRolls);
  match_words(generatedRolls);
}

$(function() {
  desiredWordsPer.on('change', function() {
    if (desiredSetsGenerated.val() !== '')
      generate_rolls()
  })

  desiredSetsGenerated.on('change', function() {
    if (desiredWordsPer.val() !== '')
      generate_rolls()
  })
});
