import { view } from './ts/View';
import { storeTodos } from './ts/Store';
import { storeFilterStatus } from './ts/Store';
// import { TodoModel } from './ts/model/TodoModel';
import { emitter } from './ts/Events';
// import { ItodoObj } from './/ts/interface/interface';
import './styles/styles.scss';
import './styles/nullstyle.scss';

let orderN: number;

//looking if any filter is up
const filterCondition = storeFilterStatus.getFilterStatus();
//if any data in db build dom/looking for filters and filter/turn on drag and drop
storeTodos
  .getAll()
  .then((todoArr) => {
    for (const todo of todoArr) {
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
  })
  .then(() => view.listenAll());
//turn on all listeners
view.listenAll();

//subscribes on all handmade events
emitter.subscribe(`event:onEnter`, async function (name: string) {
  if (orderN == undefined) {
    orderN = 1;
  }
  orderN++;
  await storeTodos.post(name, orderN).then((todoObject) => {
    todoObject.order = orderN;
    view.printTodo(todoObject);
  });
  view.listenAll();
});

emitter.subscribe('event:Delete', function (id: string) {
  if (confirm('Do you realy want to delete this pretty task?')) {
    view.delete(id);
    storeTodos.delete(id);
  } else {
    return;
  }
});
emitter.subscribe('event:Mark', function (id: string) {
  view.mark(id);
  storeTodos.update(id, null);
});
emitter.subscribe('event:MarkAll', function (condition: string | null) {
  view.markAll(!condition);
  storeTodos.markAll(condition);
});
emitter.subscribe('event:ClearCompleted', function () {
  view.clearCompleted();
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
