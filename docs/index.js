//test

function initTest(){

  $('#elePrng').prng(['round', '*', 50, '/', 2])

  let sync = $.prngSync(['round', '*', 100, '-', 2])

  if(typeof sync === 'number'){
    console.log('prngSync pass.')
    $('#prngSync').val(sync);
  }


  /* callback */
  // return Math.floor(prng) * 10 / 2;
  $.prng(['floor', '*', 10, '/', 2], function(err, res){
    if(err){return console.log(err)}
    console.log(res)
    $('#prng').val(res);
  });

  $.prngP(['fround', '*', 100, '-', 2]).then(function(res){
    console.log(res)
    $('#prngP').val(res);
  }).catch(function(err){
    console.log(err)
  })

  $('#prngStrSync').val($.prngStrSync(3));

  $.prngStr(10,function(err,res){
    if(err){return console.log(err)}
    console.log(res)
    $('#prngStr').val(res);
  })

  $.prngStrP(5).then(function(res){
    console.log(res)
    $('#prngStrP').val(res);
  }).catch(function(err){
    console.log(err)
  })

  $('#prngArrSync').val($.prngArrSync(3,4));

  $.prngArr(5,6,function(err,res){
    if(err){return console.log(err)}
    console.log(res)
    $('#prngArr').val(res);
  })

  $.prngArrP(6,7).then(function(res){
    console.log(res)
    $('#prngArrP').val(res);
  }).catch(function(err){
    console.log(err)
  })

}

// demo only;

let dv = $('<div />');
$('body').append(
    dv.clone().addClass('container').append(
      $('<h3 />', {
        class: 'text-center mt-4 mb-4',
        text: 'jquery-prng test'
      }),
      dv.clone().addClass('main row')
    )
  )

$(document).ready(function() {
  let testObj = [
    'prngSync','prng','prngP',
    'prngStrSync', 'prngStr','prngStrP',
    'prngArrSync','prngArr','prngArrP'
  ];


  $('.main').append('<div class="col-sm-6"><div class="form-group"><label>prng element</label><input type="text" id="elePrng" class="form-control" readonly></div></div>')

  testObj.forEach(function(i){
    $('.main').append('<div class="col-sm-6"><div class="form-group"><label>'+ i +'</label><input type="text" id="'+ i +'" class="form-control" readonly></div></div>')
  })

  setInterval(function(){
    initTest();
  },100)
});
