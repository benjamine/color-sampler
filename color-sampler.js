
var sampler = document.querySelector('.color-sampler');
var items = document.querySelectorAll('.color-sampler li');
var img =  document.querySelector('.selected-image img');
var colorName = document.querySelector('.color-name');

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
  var selectedItem = document.querySelector('.color-sampler .selected');
  showColor(selectedItem);
});

sampler.addEventListener('click', function(e) {
  if (e.target.nodeName !== 'LI') {
    return;
  }
  if (!sampler.classList.contains('expanded')) {
    sampler.classList.add('expanded');
    return;
  }
  document.querySelector('.color-sampler .selected').classList.remove('selected');
  e.target.classList.add('selected');
  sampler.classList.remove('expanded');

  showColor(e.target);
});

var over = false;

sampler.addEventListener('mouseover', function(e) {
  over = true;
  if (e.target.nodeName !== 'LI') {
    return;
  }
  showColor(e.target);
});

sampler.addEventListener('mouseleave', function(e) {
  over = false;
  setTimeout(function() {
    if (over) {
      return;
    }
    var selectedItem = document.querySelector('.color-sampler .selected');
    showColor(selectedItem);
  }, 1000);
});

function showColor(item) {
  var color = item.getAttribute('data-color');
  colorName.innerText = item.innerText;
  img.src = 'colors/' + color + '.jpg';
}
