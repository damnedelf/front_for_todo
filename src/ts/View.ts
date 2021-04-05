import { storeFilterStatus } from './Store';
import { handleDD } from './dd';
import { template } from './Template';
import { emitter } from './Events';
import { storeTodos } from './Store';

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
  private clearCompletedBtn: HTMLButtonElement = document.querySelector('#clear-completed');
  constructor() {}
  //add listeners
  listenAll() {
    //filter status
    let filterCondition: string = '';
    //emits events
    //onEnter
    this.input.addEventListener('keydown', (e: KeyboardEvent) => {
      if ((e.code == 'Enter' || e.code == 'NumpadEnter') && this.input.value != '') {
        emitter.emit('event:onEnter', this.input.value);
        this.input.value = '';
      }
    });
    //Mark&Delete
    this.tasklist.addEventListener('click', function (e): void {
      let x = e.target as Element;
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
    //clear completed
    this.clearCompletedBtn.addEventListener('click', () => {
      let test = '';
      emitter.emit('event:ClearCompleted', test);
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
  printTodo(todo: ItodoObj) {
    template.insertTodo(todo);
    this.showFooter(true);
    this.count();
    handleDD();
  }
  //delete todo from DOM
  delete(id: string): void {
    let task = document.getElementById(id);
    task.remove();
    this.count();
  }
  clearCompleted() {
    let todosArray: NodeListOf<HTMLDivElement> = document.querySelectorAll('.task-list-task');
    let completedTodosArr = Array.from(todosArray).filter((todo) => todo.classList.contains('completed'));

    completedTodosArr.forEach((todo) => {
      this.delete(todo.id);
      storeTodos.delete(todo.id);
    });
  }
  //switch isCompleted (marks) todo in DOM
  mark(id: string): void {
    let task = document.getElementById(id);
    task.classList.toggle('completed');
    this.count();
  }
  //marks/unmarks all todos in DOM
  markAll(condition: boolean) {
    let todosArray = Array.from(document.querySelectorAll('.task-list-task'));

    for (let todo of todosArray) {
      let checkbox: HTMLInputElement = todo.querySelector('.checkbox-input');

      checkbox.checked = condition;

      if (condition) {
        todo.className = 'task-list-task completed';
      } else {
        todo.className = 'task-list-task';
      }
    }
    this.count();
  }
  //visibility of btns and counter block
  private showFooter(param: boolean): void {
    //counts and buttons block
    let butCountBar = document.querySelector('.task-list-footer-wrapper');
    if (param) {
      butCountBar.setAttribute('style', 'display:block');
    } else {
      butCountBar?.setAttribute('style', 'display:none');
    }
  }
  //counts
  private count(): void {
    let counter: HTMLDivElement = document.querySelector('.counter');
    let todoArray: NodeListOf<HTMLDivElement> = document.querySelectorAll('.task-list-task');
    let toDisplayAr = Array.from(todoArray).filter((todo) => !todo.classList.contains('completed'));
    let x: number | null = toDisplayAr.length;
    counter.innerHTML = `todo amount: ${x}`;
    if (todoArray.length == 0) {
      this.showFooter(false);
    }
  }
  //filters when DOM is build
  async filter(filterCondition: string | null | undefined) {
    if (filterCondition == 'noFilter') {
      return;
    }
    let todosArray: Element[] = Array.from(document.querySelectorAll('.task-list-task'));

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
      this.filterEnlight();
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
  filterEnlight() {
    let filterCondition: string = storeFilterStatus.getFilterStatus();
    if (filterCondition == 'noFilter') {
      return;
    }
    let btnArr: HTMLButtonElement[] = [this.activeBtn, this.allBtn, this.completedBtn];
    btnArr.forEach((it) => it.setAttribute('style', 'background-color:#a1df2e'));
    if (filterCondition == 'all') {
      this.allBtn.setAttribute('style', 'background-color:red');
      return;
    }
    if (filterCondition == 'completed') {
      this.completedBtn.setAttribute('style', 'background-color:red');
      return;
    }

    this.activeBtn.setAttribute('style', 'background-color:red');
  }
}
const view = new View();

export { view };
