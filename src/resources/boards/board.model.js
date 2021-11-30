const uuid = require('uuid').v4;
const Column = require('./column.model');

class Board {
  constructor({
    id = uuid(),
    title = 'Board_Title',
    columns = [new Column()],
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;
