/*! dom-script.js © yamoo9.net, 2016 */

class Cacteil extends HTMLElement {
  name:string;
  constructor(name:string = 'cacteil') {
    super();
    this.name = name;
  }
  getName() {
    return this.name;
  }
}
