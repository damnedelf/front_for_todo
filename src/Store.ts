// const db = (window as any)._DB_;
import { db } from './firestoreConfig';
const todosRef = db.collection('todos');

class StoreTodos {
  constructor() {}
  //new todo
  async post(todo: todoObj) {
    try {
      await todosRef.add({
        name: `${todo.name}`,
        id: `${todo.id}`,
        isCompleted: todo.isCompleted,
        order: todo.order,
      });
    } catch (error) {
      console.log(error);
    }
  }
  //get todoArray
  async getAll() {
    let todoArray: todoObj[] = [];

    try {
      let todos = await todosRef.get();
      await todos.forEach((doc: any) => {
        todoArray.push(doc.data());
      });
      todoArray.sort((a, b) => (a.order > b.order ? 1 : -1));
    } catch (error) {
      console.log(`get all error ${error}`);
    }

    return todoArray;
  }
  //for delete
  async delete(id: string) {
    try {
      let todos = await todosRef.where('id', '==', `${id}`).get();
      todos.forEach((doc: any) => {
        db.collection('todos').doc(doc.id).delete();
      });
    } catch (error) {
      console.log(`delete: ===>>> ${error}`);
    }
  }
  // mark isCompleted
  async update(id: string) {
    try {
      let todos = await todosRef.where('id', '==', `${id}`).get();
      todos.forEach((doc: any) => {
        db.collection('todos').doc(doc.id).update({ isCompleted: !doc.data().isCompleted });
      });
    } catch (error) {
      console.log(`update===>>>${error}`);
    }
  }
  ///for mark/unmark all isCompleted
  async updateAll(status: boolean) {
    try {
      let allTodos = await db.collection('todos').get();
      await allTodos.forEach((todo: any) => {
        console.log(todo);
        todo.ref.update({
          isCompleted: status,
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
  async patchOrder(reqBody: orderBody) {
    try {
      let todos = await todosRef.where('id', '==', `${reqBody.id}`).get();
      todos.forEach((doc: any) => {
        db.collection('todos').doc(doc.id).update({ order: reqBody.order });
      });
    } catch (error) {
      console.log(`update===>>>${error}`);
    }
  }
}
//local storage for filter condition
class StoreFilterStatus {
  constructor() {}
  setFilterStatus(status: string): void {
    localStorage.setItem('status', status);
  }
  getFilterStatus(): string | undefined | null {
    if (localStorage.getItem('status')) {
      return localStorage.getItem('status');
    } else {
      return 'noFilter';
    }
  }
}
const storeTodos = new StoreTodos();
const storeFilterStatus = new StoreFilterStatus();

export { storeTodos };
export { storeFilterStatus };
