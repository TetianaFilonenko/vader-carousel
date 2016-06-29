document.addEventListener("DOMContentLoaded", function(event) {
  imageArray = new Array();
  for (i = 0; i < 8; i++) { 
    imageArray[i] = 'images/slider' + (i+1) + '.jpg';
  };
  vaderSliderModule.init('slideImg', {
    imageArrayPath: imageArray, 
    interval: 2000
  })
});