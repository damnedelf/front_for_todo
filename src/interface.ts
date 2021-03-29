//describes solo todo item
interface todoObj {
  id: string;
  name: string;
  isCompleted: boolean;
  order: number;
}

//describe this for btn keydown listener
interface elemObjForEnter {
  e: object;
  value: string;
}
//describes collection for eventhandler
interface eventContainerType {
  [key: string]: Array<Function>;
}

//describes checkbox elem
interface domElem extends HTMLElement {
  checked: any;
}
//req body for order
interface orderBody {
  id: string;
  order: number;
}
//event target for dd block
interface eventDD extends MouseEventInit {
  target: any;
  preventDefault: Function;
  setAttribute: Function;
  ondrag: Function;
  ondragend: Function;
}
