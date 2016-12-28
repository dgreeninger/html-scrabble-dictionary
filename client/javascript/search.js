function dictionaryLookup(word){
	var fs = require('fs');
	var array = fs.readFileSync('dictionary/sowpods.txt').toString().split("\n");
	//console.log(array);
	if (array.indexOf(word) > -1) {
		console.log('word found');
		result = true;
	}
	else {
		result = word + ' is not a word!';
		console.log('word not found');
	}
	return result;
}
dictionaryLookup('test2');
