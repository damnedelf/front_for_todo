import { storeFilterStatus } from './Store';
import { handleDD } from './dd';
import { template } from './Template';
import { emitter } from './Events';
// const storeFilterStatus = new StoreFilterStatus();

class View {
  //input field
  private input: HTMLInputElement = document.querySelector('#input');

  //filter buttons
  private allBtn: HTMLButtonElement = document.querySelector('#all');
  private activeBtn: HTMLButtonElement = document.querySelector('#active');
  private completedBtn: HTMLButtonElement = document.querySelector('#completed');
  //markallBtn(visible label)
  private markallBtn: HTMLLabelElement = document.querySelector('#label-mark-all');
  //display none checkbox
  private markAllCheckbox: HTMLInputElement = document.querySelector('#mark-all');
  //task list
  private tasklist: HTMLElement = document.querySelector('.task-list');
  constructor() {}
  //add listeners
  listenAll() {
    //filter status
    let filterCondition: string = '';
    //emits events
    //onEnter
    this.input.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.code == 'Enter' && this.input.value != '') {
        emitter.emit('event:onEnter', this.input.value);
        this.input.value = '';
      }
    });
    //Mark&Delete
    this.tasklist.addEventListener('click', function (e: Event): void {
      let x: any = e.target;
      let id: string;
      if (x.className == 'close') {
        id = x.id.slice(7);
        emitter.emit('event:Delete', id);
      } else if (x.className == 'checkbox-label') {
        id = x.id.slice(6);
        emitter.emit('event:Mark', id);
      }
    });
    //markall
    this.markallBtn.addEventListener('click', () => {
      emitter.emit('event:MarkAll', this.markAllCheckbox.checked);
    });
    //filters
    this.allBtn.addEventListener('click', function () {
      filterCondition = 'all';
      emitter.emit('filter:all', filterCondition);
    });
    this.activeBtn.addEventListener('click', function () {
      filterCondition = 'active';
      emitter.emit('filter:active', filterCondition);
    });
    this.completedBtn.addEventListener('click', function () {
      filterCondition = 'completed';
      emitter.emit('filter:completed', filterCondition);
    });
  }
  //for solo todo
  printTodo(todo: todoObj) {
    template.insertTodo(todo);
    View.showFooter(true);
    View.count();
    handleDD();
  }
  //delete todo from DOM
  delete(id: string): void {
    let task = document.getElementById(id);
    task.remove();
    View.count();
  }
  //switch isCompleted (marks) todo in DOM
  mark(id: string): void {
    let task = document.getElementById(id);
    task.classList.toggle('completed');
  }
  //marks/unmarks all todos in DOM
  markAll(condition: boolean) {
    let todosArray = Array.from(document.querySelectorAll('.task-list-task'));

    for (let todo of todosArray) {
      let checkbox: any = todo.querySelector('.checkbox-input');

      checkbox.checked = condition;

      if (condition) {
        todo.className = 'task-list-task completed';
      } else {
        todo.className = 'task-list-task';
      }
    }
  }
  //visibility of btns and counter block
  static showFooter(param: boolean): void {
    //counts and buttons block
    let butCountBar = document.querySelector('.task-list-footer-wrapper');
    if (param) {
      butCountBar.setAttribute('style', 'display:block');
    } else {
      butCountBar?.setAttribute('style', 'display:none');
    }
  }
  //counts
  static count(): void {
    let counter: any = document.querySelector('.counter');
    let todoArray = document.querySelectorAll('.task-list-task');
    let x: number | null = todoArray.length;
    counter.innerHTML = `todo amount: ${x}`;
    if (x == 0) {
      View.showFooter(false);
    }
  }
  //filters when DOM is build
  async filter(filterCondition: string | null | undefined) {
    if (filterCondition == 'noFilter') {
      return;
    }
    let todosArray: any[] = Array.from(document.querySelectorAll('.task-list-task'));

    if (filterCondition) {
      await storeFilterStatus.setFilterStatus(filterCondition);
    }
    for (let todo of todosArray) {
      let style: string = 'display:inline-flex';

      let isCompletedTodo: boolean = todo.classList.contains('completed');

      if (filterCondition == 'active' && isCompletedTodo) {
        style = 'display:none';
      }

      if (filterCondition == 'completed' && !isCompletedTodo) {
        style = 'display:none';
      }

      todo.setAttribute('style', style);
    }
  }
  getOrder(): null | number {
    let todoArray: HTMLDivElement[] = Array.from(document.querySelectorAll('.task-list-task'));
    let todo = todoArray[todoArray.length - 1];
    if (!todo) {
      return null;
    }

    return +todo.dataset.order;
  }
}
const view = new View();
// export default { view, storeFilterStatus };
export { view };
