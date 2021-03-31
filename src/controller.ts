import { view } from './View';
import { storeTodos } from './Store';
import { storeFilterStatus } from './Store';
import { TodoModel } from './TodoModel';
import { emitter } from './Events';

import './styles.scss';
import './nullstyle.scss';

let orderN: number = 0;

//looking if any filter is up
let filterCondition = storeFilterStatus.getFilterStatus();
//if any data in db build dom/looking for filters and filter/turn on drag and drop
storeTodos
  .getAll()
  .then((todoArr) => {
    for (let todo of todoArr) {
      view.printTodo(todo);
    }

    if (todoArr.length > 1) {
      orderN = todoArr[todoArr.length - 1].order;
    }
  })
  .then(() => {
    if (filterCondition) {
      view.filter(filterCondition);
    }
  });
//turn on all listeners
view.listenAll();

//subscribes on all handmade events
emitter.subscribe(`event:onEnter`, async function (name: string) {
  orderN++;
  let todoObj: todoObj = new TodoModel(name, orderN);

  storeTodos.post(todoObj);
  view.printTodo(todoObj);
});

emitter.subscribe('event:Delete', function (id: string) {
  view.delete(id);
  storeTodos.delete(id);
});
emitter.subscribe('event:Mark', function (id: string) {
  view.mark(id);
  storeTodos.update(id);
});
emitter.subscribe('event:MarkAll', function (condition: boolean) {
  view.markAll(!condition);
  storeTodos.updateAll(!condition);
});
//handler for filters on air
function emitFilterHandler(status: string) {
  emitter.subscribe(status, function (filterCondition: string) {
    view.filter(filterCondition);
  });
}
emitFilterHandler('filter:all');
emitFilterHandler('filter:completed');
emitFilterHandler('filter:active');
