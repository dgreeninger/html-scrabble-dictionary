var fs = require('fs');
var array = fs.readFileSync('dictionary/sowpods.txt').toString().split("\n");
//console.log(array);
if (array.indexOf("aa") > -1) {
  console.log('word found');
}
else {
  console.log('word not found');
}
