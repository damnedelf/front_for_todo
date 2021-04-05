//model
class TodoModel implements Idata {
  id: string;
  name: string;
  isCompleted: boolean;
  order: number;
  data: Idata;

  constructor(name: string, order: number) {
    this.id = '0';
    this.data = {
      name: name,
      isCompleted: false,
      order: order,
    };
  }
}
export { TodoModel };
