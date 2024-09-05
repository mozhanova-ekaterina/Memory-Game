export class Item{
  src: string
  index: number
  state? : string
  constructor(src: string, i: number){
    this.src = src
    this.index = i
    this.close()
  }

  open(){
    this.state = 'open'
  }
  close(){
    this.state = 'close'
  }
  done(){
    this.state = 'done'
  }

}