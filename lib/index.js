
(function($) {

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function randSeed(length, max) {
    return parseInt(shuffle(Array.apply(null, Array(length)).map(function() {
      return Math.round(Math.random() * max);
    })).join(''));
  }

  const Mt = function(seed) {
    var seed = randSeed(15, 9);
    this.N = 624;
    this.M = 397;
    this.MATRIX_A = 0x9908b0df;
    this.UPPER_MASK = 0x80000000;
    this.LOWER_MASK = 0x7fffffff;

    this.mt = new Array(this.N);
    this.mti=this.N+1;

    this.init_genrand(seed);
  }

  Mt.prototype.init_genrand = function(s) {
    this.mt[0] = s >>> 0;
    for (this.mti=1; this.mti<this.N; this.mti++) {
        let s = this.mt[this.mti-1] ^ (this.mt[this.mti-1] >>> 30);
     this.mt[this.mti] = (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + (s & 0x0000ffff) * 1812433253)
    + this.mti;
        this.mt[this.mti] >>>= 0;
    }
  }



  Mt.prototype.genrand_int32 = function() {
    let y,
    mag01 = new Array(0x0, this.MATRIX_A);

    if (this.mti >= this.N) {
      let kk;
      if (this.mti == this.N+1){
        this.init_genrand(5489);
      }

      for (kk=0;kk<this.N-this.M;kk++) {
        y = (this.mt[kk]&this.UPPER_MASK)|(this.mt[kk+1]&this.LOWER_MASK);
        this.mt[kk] = this.mt[kk+this.M] ^ (y >>> 1) ^ mag01[y & 0x1];
      }
      for (;kk<this.N-1;kk++) {
        y = (this.mt[kk]&this.UPPER_MASK)|(this.mt[kk+1]&this.LOWER_MASK);
        this.mt[kk] = this.mt[kk+(this.M-this.N)] ^ (y >>> 1) ^ mag01[y & 0x1];
      }
      y = (this.mt[this.N-1]&this.UPPER_MASK)|(this.mt[0]&this.LOWER_MASK);
      this.mt[this.N-1] = this.mt[this.M-1] ^ (y >>> 1) ^ mag01[y & 0x1];
      this.mti = 0;
    }

    y = this.mt[this.mti++];
    y ^= (y >>> 11);
    y ^= (y << 7) & 0x9d2c5680;
    y ^= (y << 15) & 0xefc60000;
    y ^= (y >>> 18);

    return y >>> 0;
  }

  Mt.prototype.random = function() {
    return this.genrand_int32()*(1.0/4294967296.0);
  }

  const mt = new Mt();
  const conf = ['']

  function calc(i){
     if(typeof i === 'object' && i.length > 1){
      try {
        if(
          i.length === 3 &&
          typeof i[0] === 'string' &&
          typeof i[1] === 'string' &&
          typeof i[2] === 'number'
        ){
          if(i[1] === '*'){
            return Math[i[0]](mt.random() * i[2]);
          } else if(i[1] === '+'){
            return Math[i[0]](mt.random() + i[2]);
          } else if(i[1] === '/'){
            return Math[i[0]](mt.random() / i[2]);
          } else if(i[1] === '-'){
           return Math[i[0]](mt.random() - i[2]);
          }
        }

        if(
          i.length === 5 &&
          typeof i[0] === 'string' &&
          typeof i[1] === 'string' &&
          typeof i[2] === 'number' &&
          typeof i[3] === 'string' &&
          typeof i[4] === 'number'
        ){
          if(i[1] === '*'){
            if(i[3] === '+'){
              return Math[i[0]](mt.random() * i[2] + i[4]);
            } else if(i[3] === '-'){
              return Math[i[0]](mt.random() * i[2] - i[4]);
            } else if(i[3] === '/'){
              return Math[i[0]](mt.random() * i[2] / i[4]);
            }
          } else if(i[1] === '/'){
            if(i[3] === '+'){
              return Math[i[0]](mt.random() / i[2] + i[4]);
            } else if(i[3] === '-'){
              return Math[i[0]](mt.random() / i[2] - i[4]);
            } else if(i[3] === '*'){
              return Math[i[0]](mt.random() / i[2] * i[4]);
            }
          } else if(i[1] === '+'){
            if(i[3] === '/'){
              return Math[i[0]](mt.random() + i[2] / i[4]);
            } else if(i[3] === '-'){
              return Math[i[0]](mt.random() + i[2] - i[4]);
            } else if(i[3] === '*'){
              return Math[i[0]](mt.random() + i[2] * i[4]);
            }
          } else if(i[1] === '-'){
            if(i[3] === '/'){
              return Math[i[0]](mt.random() - i[2] / i[4]);
            } else if(i[3] === '+'){
              return Math[i[0]](mt.random() - i[2] + i[4]);
            } else if(i[3] === '*'){
              return Math[i[0]](mt.random() - i[2] * i[4]);
            }
          }
        }

      } catch (err) {
        if(err){
          console.err('prng method error')
         return null;
        }
      }
    } else if (!i){
      return mt.random();
    }
  }
  // callback
  $.prng = function(i, cb){
    let err = false;
    if(!cb){
      cb = i;
      i = false;
    } else if(!cb && !i){
      err = 'incorrect jq-prng args';
    } else if(typeof cb !== 'function'){
      err = 'jq-prng callback must be a function';
    } else if(typeof i !== 'object'){
      err = 'jq-prng options error';
    }
    cb(err, calc(i))
  };


  // sync
  $.prngSync = function(i){
    return calc(i);
  }

  $.prngP = function(i){
    return new Promise(function(resolve, reject){
        let res = calc(i);
        if(res === null){
          reject(res);
        } else {
          resolve(res);
        }
    })
 }

   // sync
  $.fn.prng = function(i){

      if($(this).prop('nodeName').toUpperCase() === "INPUT" || "TEXTAREA"){
        $(this).val(calc(i))
        console.log('is')
      }
      if($(this).prop('nodeName').toUpperCase() !== "INPUT" || !"TEXTAREA"){
        $(this).text(calc(i))
        console.log('not')
      }
  }

}(jQuery));
