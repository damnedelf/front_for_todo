class Template {
  constructor() {}
  //build todo=>DoM
  private buildTodo(todo: ItodoObj): HTMLDivElement {
    let newTodoWrapper = document.createElement('div');
    let taskName = document.createElement('div');
    taskName.innerHTML = todo.data.name;
    taskName.className = 'taskname';
    if (todo.data.isCompleted) {
      newTodoWrapper.className = 'task-list-task completed dragster-block';
    } else {
      newTodoWrapper.className = 'task-list-task dragster-block';
    }
    newTodoWrapper.id = todo.id;
    newTodoWrapper.setAttribute('data-order', `${todo.data.order}`);
    newTodoWrapper.setAttribute('draggable', 'true');
    newTodoWrapper.append(taskName);
    return newTodoWrapper;
  }
  private buildDelBtn(todo: ItodoObj): HTMLButtonElement {
    let button = document.createElement('button');
    button.className = 'close';
    button.id = `delete-${todo.id}`;
    return button;
  }
  private buildCheckbox(todo: ItodoObj): HTMLDivElement {
    let checkboxWrapper = document.createElement('div');
    let checkbox = document.createElement('input');
    let checkboxLabel = document.createElement('label');
    checkbox.checked = todo.data.isCompleted;
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
  insertTodo(todo: ItodoObj): void {
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
