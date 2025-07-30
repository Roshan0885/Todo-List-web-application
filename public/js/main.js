document.querySelector('form').addEventListener('submit', function (e) {
  const input = document.getElementById('taskInput');
  if (input.value.trim() === '') {
    alert('Task cannot be empty!');
    e.preventDefault();
  }
});
