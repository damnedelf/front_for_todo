import { storeTodos } from './Store';

//block of drag and drop +
function handleDD(): void {
  const tasksListElement: HTMLDivElement = document.querySelector('.task-list');
  const taskElements: HTMLDivElement[] = Array.from(tasksListElement.querySelectorAll('.task-list-task'));

  for (const task of taskElements) {
    task.draggable = true;
  }

  tasksListElement.addEventListener('dragstart', (evt) => {
    const target = evt.target as HTMLTextAreaElement;
    target.classList.add('selected');
  });

  tasksListElement.addEventListener('dragend', (evt) => {
    const target = evt.target as HTMLTextAreaElement;
    target.classList.remove('selected');
    //work with order using Nodelist
    const reqBody = { id: target.id, order: 0 };
    const todoNodeArray = Array.from(document.querySelectorAll('.task-list-task'));
    const todoArray: any[] = [];
    for (const todoNode of todoNodeArray) {
      todoArray.push(todoNode);
    }

    const currentElem = todoArray.find((item) => item.id == reqBody.id);

    const nextElem = currentElem.nextElementSibling || 0;
    const previosElem = currentElem.previousElementSibling || 0;

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
    storeTodos.update(reqBody.id, reqBody.order);
  });

  const getNextElement = (cursorPosition: number, currentElement: HTMLDivElement) => {
    const currentElementCoord = currentElement.getBoundingClientRect();
    const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;

    const nextElement = cursorPosition < currentElementCenter ? currentElement : currentElement.nextElementSibling;

    return nextElement;
  };

  tasksListElement.addEventListener('dragover', (evt: DragEvent) => {
    evt.preventDefault();

    const activeElement = tasksListElement.querySelector('.selected');
    const currentElement = evt.target as HTMLDivElement;
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
