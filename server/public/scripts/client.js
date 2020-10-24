$(document).ready(clickWait);

function clickWait() {
  $('#taskNew').hover(entry, handleMouseOut);
}

function entry() {
  $(this).removeClass('head');
  $(this).addClass('toggleMouseOver');
  $('#taskNew').one('click', Input);
}

function handleMouseOut() {
  $(this).empty();
  $(this).append(`<img id="noteIcon" src="./images/noteIcon.png" />TASK`);
  $(this).removeClass('toggleMouseOver');
  $(this).addClass('head');
}

function Input() {
  $(this).empty();
  $(this).append(`
      <input id="inputTask" type="text"></input>
      <button id="sendTask">Add Task</button>`);
  $('#sendTask').on('click', function () {
    let task = { task: $('#inputTask').val() };
    toServer(task);
  });
}

function toServer(task) {
  $.ajax({
    method: 'POST',
    url: '/task',
    data: task,
  })
    .then(function () {
      render();
    })
    .catch(function (err) {
      console.log('error:', err);
    });
}
