document.addEventListener('click', function (e) {
  var target = e.target.closest('.has-tooltip');
  if (!target || target.getAttribute('href') === '') e.preventDefault();

  var tooltip = document.querySelector('.tooltip');

  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    document.body.appendChild(tooltip);
  } else {
    document.querySelectorAll('.tooltip').forEach(function (t) {
      if (t !== tooltip) t.classList.remove('tooltip_active');
    });
  }

  tooltip.textContent = target.getAttribute('title');
  tooltip.classList.add('tooltip_active');

  var position = target.dataset.position || 'top';
  var rect = target.getBoundingClientRect();
  var scrollY = window.scrollY || window.pageYOffset;

  var left = rect.left;
  var top = rect.top + scrollY;

  switch (position) {
    case 'top':
      top = top - tooltip.offsetHeight;
      left = left + rect.width / 2 - tooltip.offsetWidth / 2;
      break;
    case 'bottom':
      top = top + rect.height;
      left = left + rect.width / 2 - tooltip.offsetWidth / 2;
      break;
    case 'left':
      left = left - tooltip.offsetWidth;
      top = top + rect.height / 2 - tooltip.offsetHeight / 2;
      break;
    case 'right':
      left = left + rect.width;
      top = top + rect.height / 2 - tooltip.offsetHeight / 2;
      break;
  }

  tooltip.style.left = left + 'px';
  tooltip.style.top = top + 'px';
});

document.addEventListener('click', function (e) {
  if (!e.target.closest('.has-tooltip') && !e.target.closest('.tooltip')) {
    var allTooltips = document.querySelectorAll('.tooltip');
    allTooltips.forEach(function (t) { t.classList.remove('tooltip_active'); });
  }
});
