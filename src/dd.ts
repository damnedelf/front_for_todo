//DnD npm init
import { smoothDnD } from 'smooth-dnd';

import { storeTodos } from './Store';

//block of drag and drop +
function handleDD() {
  let container: any = document.querySelector('.task-list');
  let id = '';

  smoothDnD(container, {
    lockAxis: 'y',
    behaviour: 'move',
    groupName: undefined,
    autoScrollEnabled: false,
    dragHandleSelector: '.task-list',
    dragClass: '.task-list-task',
    dropPlaceholder: true,
    removeOnDropOut: true,

    //here we get id of touched for draggin element
    onDropReady: (res) => {
      id = res.element.id;
    },
    //here we get nodelist of tasks after drop is over and with id from last func get needed orderN => firestore
    onDrop: () => {
      let todoNodeArray = Array.from(document.querySelectorAll('.task-list-task'));
      let todoArray: any = [];
      for (let todoNode of todoNodeArray) {
        todoArray.push(todoNode);
      }

      let currentElem = todoArray.find((item: HTMLElement) => item.id == id).parentNode;
      let nextElem: HTMLDivElement | null = null;
      let previosElem: HTMLDivElement | null = null;
      if (currentElem.nextElementSibling) {
        nextElem = currentElem.nextElementSibling.firstChild;
      }
      if (currentElem.previousElementSibling) {
        previosElem = currentElem.previousElementSibling.firstChild;
      }
      let reqBody = { id: id, order: 0 };
      let orderN = 0;
      if (nextElem === null) {
        orderN = +previosElem.dataset.order * 2 + 1;
      } else if (previosElem === null) {
        orderN = +nextElem.dataset.order - 0.1;
      } else {
        orderN = (+previosElem.dataset.order + +nextElem.dataset.order) / 2;
      }

      reqBody.order = orderN;
      //front=> back element id to change + order to change
      storeTodos.update(null, reqBody);
    },
  });
}

export { handleDD };
