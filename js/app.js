$(document).ready(function(){

    $(document).foundation();

});

var s = skrollr.init({
  edgeStrategy: 'set',
  easing: {
    WTF: Math.random,
    inverted: function(p) {
      return 1-p;
    }
  }
});
