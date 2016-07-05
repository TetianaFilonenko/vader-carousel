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

  function clearCarouselInterval() {
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

  function switchImageTimer(place, interval = vaderSliderOptions.interval) {
    timerId = setTimeout(function switchImage() {
      var new_image = getNextImage();
      document[place].src = new_image;
      timerId = setTimeout(switchImage, 2000);
    }, interval);
  };

  function vaderSliderStart(container, params) {
    makeImageContainer(container);
    extendParams(params);
    imageArrayGeneration();
    hoverCarouselGeneration(container);
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
    sliderImage.className += 'vader-slider-image';
    var sliderContainer = document.createElement("div");
    sliderContainer.className += 'vader-slider-container';
    sliderContainer.appendChild(sliderImage);
    var vaderSliderNode = document.getElementById(container);
    vaderSliderNode.className += 'vader-slider-main-container'; 
    vaderSliderNode.appendChild(sliderContainer);
    vaderSliderNode.appendChild(navContainer());
    switchImageTimer(sliderImage.name);
  };

  function navContainer() {
    var navContainer = document.createElement("div");
    navContainer.className += 'vader-slider-nav-container';
    navContainer.appendChild(nextButton());
    navContainer.appendChild(prevButton());
    return navContainer;
  };

  function nextButton() {
    var nextButton = document.createElement("div");
    nextButton.className += 'vader-slider-next-button';
    nextButton.addEventListener('click', function(){
      clearCarouselInterval();
      switchImageTimer('vaderSliderImage', 0);
    });
    return nextButton;
  };

  function prevButton() {
    var prevButton = document.createElement("div");
    prevButton.className += 'vader-slider-prev-button';
    prevButton.addEventListener('click', function(){
      clearCarouselInterval();
      prevImage('vaderSliderImage');
      switchImageTimer('vaderSliderImage');
    });
    return prevButton;
  };

  function addEventListenerList(list, event, fn) {
    for (var i = 0, len = list.length; i < len; i++) {
      list[i].addEventListener(event, fn, false);
    }
  };

  function hoverCarouselGeneration(container){
    var list = document.getElementsByClassName('vader-slider-main-container')[0].getElementsByClassName('vader-slider-image');
    addEventListenerList(list, 'mouseover', function(){
      clearCarouselInterval();
    });
    addEventListenerList(list, 'mouseleave', function(){
      switchImageTimer('vaderSliderImage');
    })
    
  };

  function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  };

  return {
    init: vaderSliderStart
  };
}());