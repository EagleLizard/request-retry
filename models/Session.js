
module.exports = class Session{
  constructor(id){
    this.id = id;
    this.count = 0;
  }

  getCount(){
    return this.count;
  }

  incCount(){
    this.count++;
  }
}