import { storeTodos } from './Store';

//block of drag and drop +
function handleDD() {
  const tasksListElement = document.querySelector('.task-list');
  const taskElements: HTMLDivElement[] = Array.from(tasksListElement.querySelectorAll('.task-list-task'));

  for (let task of taskElements) {
    task.draggable = true;
  }

  tasksListElement.addEventListener('dragstart', (evt) => {
    let target = evt.target as HTMLTextAreaElement;
    target.classList.add('selected');
  });

  tasksListElement.addEventListener('dragend', (evt) => {
    let target = evt.target as HTMLTextAreaElement;
    target.classList.remove('selected');
    //work with order using Nodelist
    let reqBody = { id: target.id, order: 0 };
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
    //element id to change + order to change
    storeTodos.update(null, reqBody);
  });

  const getNextElement = (cursorPosition: number, currentElement: HTMLDivElement) => {
    const currentElementCoord = currentElement.getBoundingClientRect();
    const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;

    const nextElement = cursorPosition < currentElementCenter ? currentElement : currentElement.nextElementSibling;

    return nextElement;
  };

  tasksListElement.addEventListener('dragover', (evt: any) => {
    evt.preventDefault();

    const activeElement = tasksListElement.querySelector('.selected');
    const currentElement = evt.target;
    const isMoveable = activeElement !== currentElement && currentElement.classList.contains('task-list-task');

    if (!isMoveable) {
      return;
    }

    const nextElement = getNextElement(evt.clientY, currentElement);

    if ((nextElement && activeElement === nextElement.previousElementSibling) || activeElement === nextElement) {
      return;
    }

    tasksListElement.insertBefore(activeElement, nextElement);
  });
}

export { handleDD };
