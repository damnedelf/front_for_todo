/* eslint-disable @typescript-eslint/no-empty-function */
import { IMongoTodo } from './interface/interface';

class Template {
  constructor() {}
  //build todo=>DoM
  private buildTodo(todo: IMongoTodo): HTMLDivElement {
    const newTodoWrapper = document.createElement('div');
    const taskName = document.createElement('div');
    taskName.innerHTML = todo.name;
    taskName.className = 'taskname';
    if (todo.isCompleted) {
      newTodoWrapper.className = 'task-list-task completed dragster-block';
    } else {
      newTodoWrapper.className = 'task-list-task dragster-block';
    }
    newTodoWrapper.id = todo.id + '';
    newTodoWrapper.setAttribute('data-order', `${todo.order}`);
    newTodoWrapper.setAttribute('draggable', 'true');
    newTodoWrapper.append(taskName);
    return newTodoWrapper;
  }
  private buildDelBtn(todo: IMongoTodo): HTMLButtonElement {
    const button = document.createElement('button');
    button.className = 'close';
    button.id = `delete-${todo.id}`;
    return button;
  }
  private buildCheckbox(todo: IMongoTodo): HTMLDivElement {
    const checkboxWrapper = document.createElement('div');
    const checkbox = document.createElement('input');
    const checkboxLabel = document.createElement('label');
    checkbox.checked = todo.isCompleted;
    checkboxWrapper.className = 'checkbox';
    checkbox.setAttribute('type', 'checkbox');
    checkbox.id = `mark-${todo.id}`;
    checkbox.className = 'checkbox-input';
    checkboxLabel.className = 'checkbox-label';
    checkboxLabel.setAttribute('for', checkbox.id);
    checkboxLabel.id = `label-${todo.id}`;
    checkboxWrapper.append(checkbox);
    checkboxWrapper.append(checkboxLabel);
    return checkboxWrapper;
  }
  insertTodo(todo: IMongoTodo): void {
    const tasklist: Element | null = document.querySelector('.task-list');
    const task: HTMLDivElement = this.buildTodo(todo);
    const button = this.buildDelBtn(todo);
    const checkbox = this.buildCheckbox(todo);

    if (tasklist) {
      tasklist.append(task);
      task.append(button);
      task.append(checkbox);
    } else {
      alert('no needed element error');
    }
  }
}
const template = new Template();
export { template };
