class Template {
  constructor() {}
  //build todo=>DoM
  private buildTodo(todo: todoObj): HTMLDivElement {
    let newTodoWrapper = document.createElement('div');
    let taskName = document.createElement('div');
    taskName.innerHTML = todo.name;
    taskName.className = 'taskname';
    if (todo.isCompleted) {
      newTodoWrapper.className = 'task-list-task completed';
    } else {
      newTodoWrapper.className = 'task-list-task';
    }
    newTodoWrapper.id = todo.id;
    newTodoWrapper.setAttribute('data-order', `${todo.order}`);
    newTodoWrapper.setAttribute('draggable', 'true');
    newTodoWrapper.append(taskName);
    return newTodoWrapper;
  }
  private buildDelBtn(todo: todoObj): HTMLButtonElement {
    let button = document.createElement('button');
    button.className = 'close';
    button.id = `delete-${todo.id}`;
    return button;
  }
  private buildCheckbox(todo: todoObj): HTMLDivElement {
    let checkboxWrapper = document.createElement('div');
    let checkbox = document.createElement('input');
    let checkboxLabel = document.createElement('label');
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
  insertTodo(todo: todoObj): void {
    const tasklist: Element | null = document.querySelector('.task-list');
    let task: HTMLDivElement = this.buildTodo(todo);
    let button = this.buildDelBtn(todo);
    let checkbox = this.buildCheckbox(todo);

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
