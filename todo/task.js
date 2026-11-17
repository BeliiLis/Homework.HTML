(function () {
  var form = document.getElementById('tasks__form');
  var input = document.getElementById('task__input');
  var list = document.getElementById('tasks__list');

  function createTask(title) {
    var task = document.createElement('div');
    task.classList.add('task');

    var titleEl = document.createElement('div');
    titleEl.classList.add('task__title');
    titleEl.textContent = title;
    task.appendChild(titleEl);

    var removeLink = document.createElement('a');
    removeLink.classList.add('task__remove');
    removeLink.textContent = '\u00D7';
    removeLink.href = '#';
    removeLink.addEventListener('click', function (e) {
      e.preventDefault();
      task.remove();
      saveTasks();
    });
    task.appendChild(removeLink);

    list.appendChild(task);
    saveTasks();
  }

  function saveTasks() {
    var tasks = list.querySelectorAll('.task__title');
    var data = [];
    tasks.forEach(function (t) { data.push(t.textContent); });
    localStorage.setItem('tasks', JSON.stringify(data));
  }

  function loadTasks() {
    var data = localStorage.getItem('tasks');
    if (!data) return;
    JSON.parse(data).forEach(function (title) { createTask(title); });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var value = input.value.trim();
    if (value) {
      createTask(value);
      input.value = '';
    }
  });

  loadTasks();
})();



