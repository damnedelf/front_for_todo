import { IMongoTodo } from './interface/interface';

class StoreTodos {
  private reqUrl = 'http://localhost:5500/api/todo';

  // eslint-disable-next-line @typescript-eslint/ban-types
  private async reqHandler(url: string, method = 'GET', dataObject: object) {
    try {
      const headers: any = {};
      let body: string;
      if (dataObject) {
        headers['Content-Type'] = 'application/json';

        body = JSON.stringify(dataObject);
      }

      const response = await fetch(url, {
        method,
        headers,
        body,
      });

      if (response.status == 204) {
        return;
      }
      return await response.json();
    } catch (error) {
      console.warn(error.message);
    }
  }
  //request for creating new todo. Expecting id as response
  async post(name: string, order: number) {
    try {
      const reqBody = { name: name, order: order };

      const id = await this.reqHandler(this.reqUrl, 'POST', reqBody);

      return id;
    } catch (error) {
      console.log(error);
    }
  }
  //get todoArray
  async getAll() {
    const todoArr: IMongoTodo[] = await this.reqHandler(this.reqUrl, 'GET', null);

    return todoArr;
  }
  //for delete
  async delete(id: string) {
    try {
      const reqBody = {};
      this.reqHandler(this.reqUrl + '/' + id, 'DELETE', reqBody);
    } catch (error) {
      console.log(`delete: ===>>> ${error}`);
    }
  }

  // mark isCompleted
  async update(id: string, condition: string | null, order: number) {
    try {
      const reqBody = {
        condition: condition,
        order: order,
      };
      this.reqHandler(this.reqUrl + '/' + id, 'PATCH', reqBody);
    } catch (error) {}
  }
}
//local storage for filter condition
class StoreFilterStatus {
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
