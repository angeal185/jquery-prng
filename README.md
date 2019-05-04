# jquery-prng
jquery mersenne-twister pseudorandom number generator pluggin


demo: https://angeal185.github.io/jquery-prng

### Installation

npm

```sh
$ npm install jquery-prng --save
```

bower

```sh
$ bower install jquery-prng
```

#### browser

```html
<script src="./path-to/jquery.min.js"></script>
<script src="./dist/jq-prng.min.js"></script>
```

### info

the seed is 128bit, generated from an array of random integers and
then put through a fisher yates shuffle.

```js
// accepted methods
[
  'abs','acos','acosh','asin','asinh','atan',
  'atanh','cbrt','ceil','clz32','cos','cosh',
  'exp','expm1','floor','fround','log','log1p',
  'log10','log2','round','sign','sin','sinh',
  'sqrt','tan','tanh','trunc'
]

// accepted operators
[
  '+','-','/','*'
]

```

```js
/**
* $(ele).prng(['round', '*', 100])
* @param {ele} string ~ jquery valid element selector
* @param {array} config ~ optional | config options
* [string, string, number] ||
* [string, string, number, string, number]
*/

/* element */
// add prng to element | .val(input/textarea) | .text(!input/!textarea)
// return $(element).val(Math.round(prng))
$('input').prng()

// add prng between 1-100 to element | .val(input/textarea) | .text(!input/!textarea)
// return $(element).text(Math.round(prng) * 100)
$('body').prng(['round', '*', 100])

// add prng between 1-50 devided by 2 to element | .val(input/textarea) | .text(!input/!textarea)
// return $(element).val(Math.round(prng) * 50 / 2)
$('textarea').prng(['round', '*', 50, '/', 2])


5325134743470699
/* sync */
/**
* $.prngSync(config)
* @param {array} config ~ optional | config options
* [string, string, number] ||
* [string, string, number, string, number]
*/

// return random base prng
let sync = $.prngSync();
console.log(sync);

// return Math.round(prng) * 10;
sync = $.prngSync(['round', '*', 10])
console.log(sync);

// return Math.round(prng) * 100 - 2;
sync = $.prngSync(['round', '*', 100, '-', 2])
console.log(sync);


/* callback */
/**
* $.prng(config,cb)
* @param {array} config ~ optional | config options
* @param {function} cb ~ callback function(err,res)
* [string, string, number] ||
* [string, string, number, string, number]
*/

// return random base prng
$.prng(function(err, res){
  if(err){return console.log(err)}
  console.log(res)
});

// return Math.floor(prng) * 100;
$.prng(['floor', '*', 100], function(err, res){
  if(err){return console.log(err)}
  console.log(res)
});

// return Math.floor(prng) * 10 / 2;
$.prng(['floor', '*', 10, '/', 2], function(err, res){
  if(err){return console.log(err)}
  console.log(res)
});

/* promise */
/* sync */
/**
* $.prngP(config)
* @param {array} config ~ optional | config options
* [string, string, number] ||
* [string, string, number, string, number]
*/

// return random base prng
$.prngP().then(function(res){
  console.log(res)
}).catch(function(err){
  console.log(err)
})

// return Math.fround(prng) - 100;
$.prngP(['fround', '-', 100]).then(function(res){
  console.log(res)
}).catch(function(err){
  console.log(err)
})

// return Math.fround(prng) * 1000 + 200;
$.prngP(['fround', '*', 1000, '+', 200]).then(function(res){
  console.log(res)
}).catch(function(err){
  console.log(err)
})


/* numbered string */

/* sync */
/**
* $.prngStrSync(num)
* @param {number} num ~ number string length;
*/

// return random string of 3 numbers;
sync = $.prngStrSync(3)
console.log(sync)


/* callback */
/**
* $.prngStr(num, cb)
* @param {number} num ~ number string length;
* @param {function} cb ~ callback function(err,res)
*/

// return random string of 10 numbers;
$.prngStr(10,function(err,res){
  if(err){return console.log(err)}
  console.log(res)
})


/* promise */
/**
* $.prngStrP(num)
* @param {number} num ~ number string length;
*/

// return random string of 5 numbers;
$.prngStrP(5).then(function(res){
  console.log(res)
}).catch(function(err){
  console.log(err)
})


/* numbered array */

/* sync */
/**
* $.prngStrSync(al,nl)
* @param {number} al ~ array length;
* @param {number} nl ~ number length;
*/

// return random numbered array;
sync = $.prngArrSync(3,4)
console.log(sync)


/* callback */
/**
* $.prngStr(al, nl, cb)
* @param {number} al ~ array length;
* @param {number} nl ~ number length;
* @param {function} cb ~ callback function(err,res)
*/

// return random numbered array;
$.prngArr(10,12,function(err,res){
  if(err){return console.log(err)}
  console.log(res)
})


/* promise */
/**
* $.prngStrP(num)
* @param {number} al ~ array length;
* @param {number} nl ~ number length;
*/

// return random numbered array;
$.prngArrP(5,5).then(function(res){
  console.log(res)
}).catch(function(err){
  console.log(err)
})
