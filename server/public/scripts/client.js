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
      <button>Add Task</button>`);
}
