$(document).ready(clickWait);

function clickWait() {
  $('#taskNew').hover(entry, handleMouseOut);
  $('.render').on('click', '.delete', deleteTask);
  $('.render').on('click', '.complete', complete);
}

function entry() {
  $(this).removeClass('taskHead');
  $(this).addClass('toggleMouseOver');
  $('#taskNew').one('click', Input);
}

function handleMouseOut() {
  $(this).empty();
  $(this).append(`<img id="noteIcon" src="./images/noteIcon.png" />`);
  $(this).removeClass('toggleMouseOver');
  $(this).addClass('taskHead');
}

function Input() {
  $(this).empty();
  $(this).append(`
      <input id="inputTask" autocomplete="off" type="text"></input>
      <button id="sendTask">Add Task</button>`);
  $('#sendTask').on('click', function () {
    let task = { task: $('#inputTask').val(), complete: 'no' };
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

function deleteTask() {
  let id = $(this).data('id');
  $.ajax({
    method: 'DELETE',
    url: `/taskTable/${id}`,
  })
    .then((deleteMessage) => {
      render();
    })
    .catch((err) => {
      console.log(err);
      alert('Delete Error');
    });
}

function complete() {
  let id = $(this).data('id');
  $.ajax({
    method: 'PUT',
    url: `/taskTable/complete/${id}`,
    data: { complete: 'yes' },
  })
    .then((putMessage) => {
      render();
    })
    .catch((err) => {
      console.log(err);
      alert('Oh SHOOT Did Not UPDATE!!!');
    });
}

function render() {
  $('.render').empty();
  $.ajax({
    method: 'GET',
    url: '/task',
  }).then(function (response) {
    let tasks = response;
    for (const thisTask of tasks) {
      if (thisTask.complete == 'no') {
        $('.render').append(`<tr>
      <td class="incomplete">${thisTask.task}</td>
      <td class="incomplete">Incomplete</td>
      <td><button class="complete" data-id=${thisTask.id}>Complete</button></td>
      <td><button class="delete" data-id=${thisTask.id}>Delete</button></td>
    </tr>`);
      } else {
        $('.render').append(`<tr>
        <td class="iscomplete">${thisTask.task}</td>
        <td>Task Complete</td>
        <td></td>
        <td><button class="delete" data-id=${thisTask.id}>Delete</button></td>
      </tr>`);
      }
    }
  });
}
