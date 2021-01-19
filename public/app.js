const desiredWordsPer = $('#wordsInPhrase');
const desiredSetsGenerated = $('#desiredSetsGenerated');
const resultsField = $('#passwordResults');
const rollMax = 6;

function generate_passphrase() {
  let wordsPerPhrase = desiredWordsPer.val();
  let passphraseSets = desiredSetsGenerated.val();
  let rollGroup = [];

  console.log("Words per: " + wordsPerPhrase);
  console.log("Sets generated: " + passphraseSets);

  for (i = 0; i < passphraseSets; i++) {
    for (j = 0; j < wordsPerPhrase; j++) {
      for (k = 0; k < rollMax; k++) {
        rollGroup.push(Math.floor((Math.random() * rollMax) + 1));
      }
    }
  }
  resultsField.text(rollGroup)
}

$(function() {
  const wordList = $.get('eff_list.txt', "text");

  desiredWordsPer.on('change', function() {
    if (desiredSetsGenerated.val() != '')
      generate_passphrase()
  })

  desiredSetsGenerated.on('change', function() {
    if (desiredWordsPer.val() != '')
      generate_passphrase()
  })
});
