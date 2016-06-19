var vaderSliderModule = (function() {
  var interval = 1500;
  var random_display = 0;
  var imageDir = "images/";
  var imageNum = 0;
  var totalImages = 0;
  var imageArray = new Array();
  var timerId;

  function clearInterval() {
    clearInterval(timerId);
  }

  function imagesArrayGeneration() {
    for (i = 1; i < 9; i++) { 
      imageArray[imageNum++] = new imageItem(imageDir + 'slider' + i + '.jpg');
    }
    totalImages = imageArray.length;
  };

  function imageItem(image_location) {
    this.image_item = new Image();
    this.image_item.src = image_location;
  };

  function get_ImageItemLocation(imageObj) {
    return(imageObj.image_item.src)
  };

  function randNum(x, y) {
    var range = y - x + 1;
    return Math.floor(Math.random() * range) + x;
  };

  function getNextImage() {
    if (random_display) {
      imageNum = randNum(0, totalImages - 1);
    } else {
      imageNum = (imageNum + 1) % totalImages;
    }
    var new_image = get_ImageItemLocation(imageArray[imageNum]);
    return(new_image);
  };

  function getPrevImage() {
    imageNum = (imageNum - 1) % totalImages;
    var new_image = get_ImageItemLocation(imageArray[imageNum]);
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
    }, interval);
  };

  function vaderSliderStart(container) {
    imagesArrayGeneration();

  	var vaderSliderNode = document.getElementById(container);
    var imageContainer = makeImageContainer();
    insertAfter(vaderSliderNode, imageContainer);
    switchImageTimer(imageContainer.name);
  };

  function makeImageContainer() {
    var sliderImage = document.createElement("img");
    sliderImage.src = 'images/slider1.jpg';
    sliderImage.name = 'vaderSliderImage';
    sliderImage.style.width = 500;
    sliderImage.style.height = 375; 
    sliderImage.className += 'vader-slider-image';
    return sliderImage;
  };

  function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  };

  return {
    init: vaderSliderStart
  };
}());