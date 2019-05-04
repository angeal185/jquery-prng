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

the seed is a generated from a random array of integers put through a fisher yates shuffle.

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
