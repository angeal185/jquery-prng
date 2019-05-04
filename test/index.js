require('../')

let obj = {}

let conf = [
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

let test = [
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
