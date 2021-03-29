//model
class TodoModel {
  id: string;
  name: string;
  isCompleted: boolean;
  order: number;

  constructor(name: string, order: number) {
    this.id = this.uuidv4();
    this.name = name;
    this.isCompleted = false;
    this.order = order;
  }
  //generate id
  private uuidv4(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
}
export { TodoModel };
