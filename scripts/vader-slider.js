var vaderSliderModule = (function() {

  var vaderSliderDefaultOptions = {
    interval: 1500,
    random_display: 0,
    imageArrayPath: new Array()
  };  
  var imageArray = new Array();
  var vaderSliderOptions = {};
  var imageNum = 0;
  var totalImages = 0;
  var timerId;

  function clearInterval() {
    clearInterval(timerId);
  };

  function imageItem(image_location) {
    this.image_item = new Image();
    this.image_item.src = image_location;
  };

  function imageArrayGeneration() {
    for (i = 0; i < vaderSliderOptions.imageArrayPath.length; i++) { 
      imageArray[imageNum++] = new imageItem(vaderSliderOptions.imageArrayPath[i]);
    }
  };

  function getImageItemLocation(imageObj) {
    return(imageObj.image_item.src)
  };

  function randNum(x, y) {
    var range = y - x + 1;
    return Math.floor(Math.random() * range) + x;
  };

  function getNextImage() {
    if (vaderSliderOptions.random_display) {
      imageNum = randNum(0, totalImages - 1);
    } else {
      imageNum = (imageNum + 1) % totalImages;
    }
    var new_image = getImageItemLocation(imageArray[imageNum]);
    return(new_image);
  };

  function getPrevImage() {
    imageNum = (imageNum - 1) % totalImages;
    var new_image = getImageItemLocation(imageArray[imageNum]);
    return(new_image);
  };

  function prevImage(place) {
    var new_image = getPrevImage();
    document[place].src = new_image;
  };

  function switchImageTimer(place) {
    timerId = setTimeout(function switchImage() {
      var new_image = getNextImage();
      document[place].src = new_image;
      timerId = setTimeout(switchImage, 2000);
    }, vaderSliderOptions.interval);
  };

  function vaderSliderStart(container, params) {
    makeImageContainer(container);
    extendParams(params);
    imageArrayGeneration();
  };

  function extendParams(params){
    for(var key in vaderSliderDefaultOptions)
      if(params.hasOwnProperty(key))
        vaderSliderOptions[key] = params[key];
      else
        vaderSliderOptions[key] = vaderSliderDefaultOptions[key];
    totalImages = vaderSliderOptions.imageArrayPath.length;
  };

  function makeImageContainer(container) {
    var sliderImage = document.createElement("img");
    sliderImage.src = 'images/slider1.jpg';
    sliderImage.name = 'vaderSliderImage';
    sliderImage.style.width = 500;
    sliderImage.style.height = 375; 
    sliderImage.className += 'vader-slider-image';
    var vaderSliderNode = document.getElementById(container);
    insertAfter(vaderSliderNode, sliderImage);
    switchImageTimer(sliderImage.name);
  };

  function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  };

  return {
    init: vaderSliderStart
  };
}());