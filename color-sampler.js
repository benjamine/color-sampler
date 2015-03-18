
var sampler = document.querySelector('.color-sampler');
var items = document.querySelectorAll('.color-sampler li');
var img =  document.querySelector('.selected-image img');
var colorName = document.querySelector('.color-name');
sampler.setAttribute('title', 'click to expand');
var isTouchDevice = 'ontouchstart' in document.documentElement;

document.querySelector('body').classList.add(isTouchDevice ? 'touch-device' : 'mouse-device');

Array.prototype.forEach.call(items, function(item) {
  var color = item.innerText.toLowerCase().replace(/ /g, '-');
  item.style['background-image'] = 'url(\'colors/' + color + '.jpg\')';
  item.setAttribute('data-color', color);

  if (item.classList.contains('selected')) {
    showColor(item);
  }
});

document.body.addEventListener('click', function(e) {
  if (e.target.nodeName === 'LI') {
    return;
  }
  if (!sampler.classList.contains('expanded')) {
    return;
  }
  sampler.classList.remove('expanded');
  sampler.setAttribute('title', 'click to expand');
  var selectedItem = document.querySelector('.color-sampler .selected');
  showColor(selectedItem);
});

sampler.addEventListener('dragstart', function(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  if (e.preventDefault) {
    e.preventDefault();
  }
});

sampler.addEventListener('mousemove', function(e) {
  if (e.target.nodeName !== 'LI') {
    return;
  }
  if (!sampler.classList.contains('expanded')) {
    return;
  }
  window.getSelection().removeAllRanges();
});

var expandTime;

function elementUnderPointer(e) {

  if (event.touches && event.touches[0]) {
    var x = e.pageX || event.touches[0].pageX;
    var y = e.pageY || event.touches[0].pageY;
    if (x && y) {
      x = x - (window.pageXOffset || 0);
      y = y - (window.pageYOffset || 0);
      var item = document.elementFromPoint(x, y);
      return document.elementFromPoint(x, y);
    }
  }
  return e.target;
}

function touchStart(e) {
  if (e.target.nodeName !== 'LI') {
    return;
  }
  if (selectionTime &&
    new Date().getTime() - selectionTime.getTime() < 200) {
    return;
  }
  if (itemOver) {
    itemOver.classList.remove('hover');
  }
  itemOver = e.target;
  itemOver.classList.add('hover');

  if (!sampler.classList.contains('expanded')) {
    sampler.classList.add('expanded');
    sampler.setAttribute('title', '');
    expandTime = new Date();
    return;
  }
}

var selectionTime;

function touchEnd(e) {
  var target = itemOver || elementUnderPointer(e);
  if (itemOver) {
    itemOver.classList.remove('hover');
    itemOver = null;
  }

  if (target.nodeName !== 'LI') {
    return;
  }
  if (!sampler.classList.contains('expanded')) {
    return;
  }
  if (new Date().getTime() - expandTime.getTime() < 300) {
    return;
  }
  document.querySelector('.color-sampler .selected').classList.remove('selected');
  target.classList.add('selected');
  selectionTime = new Date();
  sampler.classList.remove('expanded');
  sampler.setAttribute('title', 'click to expand');

  showColor(target);
}

var over = false;
var itemOver;

function touchMove(e) {
  e.preventDefault();
  over = true;
  var target = elementUnderPointer(e);
  if (target.nodeName !== 'LI') {
    return;
  }
  if (itemOver) {
    itemOver.classList.remove('hover');
  }
  itemOver = target;
  itemOver.classList.add('hover');
  showColor(target);
}

function touchLeave(e) {
  over = false;
  if (itemOver) {
    itemOver.classList.remove('hover');
    itemOver = null;
  }
  setTimeout(function() {
    if (over) {
      return;
    }
    var selectedItem = document.querySelector('.color-sampler .selected');
    showColor(selectedItem);
  }, 1000);
}

sampler.addEventListener('mousedown', touchStart);
sampler.addEventListener('touchstart', touchStart);

sampler.addEventListener('mouseup', touchEnd);
sampler.addEventListener('touchend', touchEnd);

sampler.addEventListener('mouseover', touchMove);
sampler.addEventListener('touchmove', touchMove);

sampler.addEventListener('mouseleave', touchLeave);
sampler.addEventListener('touchleave', touchLeave);

function showColor(item) {
  var color = item.getAttribute('data-color');
  colorName.innerText = item.innerText;
  img.src = 'colors/' + color + '.jpg';
}
