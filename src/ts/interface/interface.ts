/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
interface Idata {
  name: string;
  isCompleted: boolean;
  order: number;
}
//describes solo todo item
interface ItodoObj {
  id: string;
  data: Idata;
}
//hotfix for firestore typings

//describes collection for eventhandler
interface eventContainerType {
  [key: string]: Array<Function>;
}

//req body for order
interface Iheaders {
  'Content-Type': string;
}
interface Ibody {
  order: number | null;
  condition: string | null;
  id: string | null;
}
interface IMongoTodo {
  _id: string;
  name: string;
  isCompleted: boolean;
  order: number;
}
export { IMongoTodo, Ibody, eventContainerType };
