require('../')

let obj = {},
test = [
  'abs',
  'acos',
  'acosh',
  'asin',
  'asinh',
  'atan',
  'atanh',
  'cbrt',
  'ceil',
  'clz32',
  'cos',
  'cosh',
  'exp',
  'expm1',
  'floor',
  'fround',
  'log',
  'log1p',
  'log10',
  'log2',
  'round',
  'sign',
  'sin',
  'sinh',
  'sqrt',
  'tan',
  'tanh',
  'trunc'
]

test.forEach(function(i){
  let res = $.prngSync(['round', '*', 100, '-', 2])
  obj[i] = res;
})

console.log(obj)
$('#test').text(JSON.stringify(obj,0,2))

/* element */
// add prng between 1-100 to element | .val(input/textarea) | .text(!input/!textarea)
$('.test').prng(['round', '*', 100])

// add prng between 1-50 devided by 2 to element | .val(input/textarea) | .text(!input/!textarea)
$('.test').prng(['round', '*', 50, '/', 2])

/* sync */
// return random base prng
let sync = $.prngSync();
console.log(sync);

// return Math.round(prng) * 100 - 2;
sync = $.prngSync(['round', '*', 100, '-', 2])
console.log(sync);


/* callback */
// return random base prng
$.prng(function(err, res){
  if(err){return console.log(err)}
  console.log(res)
});

// return Math.floor(prng) * 10 / 2;
$.prng(['floor', '*', 10, '/', 2], function(err, res){
  if(err){return console.log(err)}
  console.log(res)
});

// return Math.floor(prng) * 10 / 2;
$.prng(['floor', '*', 10, '/', 2], function(err, res){
  if(err){return console.log(err)}
  console.log(res)
});

/* promise */

// return random base prng
$.prngP().then(function(res){
  console.log(res)
}).catch(function(err){
  console.log(err)
})

// return Math.fround(prng) * 10 / 2;
$.prngP(['fround', '-', 100, '*', 200]).then(function(res){
  console.log(res)
}).catch(function(err){
  console.log(err)
})

// return random string of 3 numbers;
console.log($.prngStrSync(3))

// return random string of 10 numbers;
$.prngStr(10,function(err,res){
  if(err){return console.log(err)}
  console.log(res)
})

// return random string of 5 numbers;
$.prngStrP(5).then(function(res){
  console.log(res)
}).catch(function(err){
  console.log(err)
})

// create random numbered array (array length| number length)
console.log($.prngArrSync(3,4))

// create random numbered array (array length| number length)
//console.log($.prngARR(20,3))
$.prngArr(5,6,function(err,res){
  if(err){return console.log(err)}
  console.log(res)
})
// return Math.fround(prng) * 10 / 2;

$.prngArrP(6,7).then(function(res){
  console.log(res)
}).catch(function(err){
  console.log(err)
})
