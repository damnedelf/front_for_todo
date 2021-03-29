// import StoreTodos from "../../build/src/Store.js";
import { storeTodos } from './Store';
// const store = new StoreTodos();
//block of drag and drop +
function handleDD() {
  const todoList = document.getElementsByClassName('task-list');
  Array.prototype.map.call(todoList, (list) => {
    enableDragList(list);
  });
}

function enableDragList(list: HTMLElement) {
  Array.prototype.map.call(list.children, (item) => {
    enableDragItem(item);
  });
}

function enableDragItem(elem: eventDD) {
  elem.setAttribute('draggable', true);

  elem.ondrag = handleDrag;
  elem.ondragend = handleDrop;
}
//dragging visualisation
function handleDrag(event: eventDD) {
  const selectedItem = event.target,
    list = selectedItem.parentNode,
    x = event.clientX,
    y = event.clientY;

  selectedItem.classList.add('drag-sort-active');
  let swapItem = document.elementFromPoint(x, y) === null ? selectedItem : document.elementFromPoint(x, y);

  if (list === swapItem.parentNode) {
    swapItem = swapItem !== selectedItem.nextSibling ? swapItem : swapItem.nextSibling;
    list.insertBefore(selectedItem, swapItem);
  }
}
//drop event + finding target element id and element before and after targetElements
function handleDrop(event: eventDD) {
  let reqBody = { id: event.target.id, order: 0 };
  let todoNodeArray = Array.from(document.querySelectorAll('.task-list-task'));
  let todoArray: any[] = [];
  for (let todoNode of todoNodeArray) {
    todoArray.push(todoNode);
  }

  let currentElem = todoArray.find((item) => item.id == reqBody.id);

  let nextElem = currentElem.nextElementSibling || 0;
  let previosElem = currentElem.previousElementSibling || 0;

  let orderN = 0;
  if (nextElem === 0) {
    orderN = +previosElem.dataset.order * 2 + 1;
  } else if (previosElem === 0) {
    orderN = +nextElem.dataset.order - 0.1;
  } else {
    orderN = (+previosElem.dataset.order + +nextElem.dataset.order) / 2;
  }

  reqBody.order = orderN;
  //front=> back element id to change + order to change
  storeTodos.patchOrder(reqBody);
  event.target.classList.remove('drag-sort-active');
}
export { handleDD };
