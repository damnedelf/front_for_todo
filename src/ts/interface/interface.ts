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
interface Ifire {
  id: string;
  data: any;
}
//describes collection for eventhandler
interface eventContainerType {
  [key: string]: Array<Function>;
}

//req body for order
interface IorderBody {
  id: string;
  order: number;
}
