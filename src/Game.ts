import { Item } from "./Item"

export class Game {
  board: Element
  items: Item[]
  constructor(items: Item[], board: Element) {
    this.items = items
    this.board = board
  }

  draw() {
    this.items.forEach(item => {
      this.board.insertAdjacentHTML('beforeend',
        `
          <div class='game_item' id='${item.index}'>
            <div class='front'>
              <img src='${item.src}'  alt='image'/>
            </div>
            <div class='back'>
            </div>
          </div> 
        `
      )
    })
  }

  start() {
    this.draw()
    const items = document.querySelectorAll('.game_item')
    items.forEach((el, i) => el.addEventListener('click', (e) => this.handleClick(e, i)))
  }

  handleClick(e: Event, i: number) {
    const el = e.currentTarget as Element
    el.classList.add('open')
    this.items[i].open()
    this.check()
  }

  check() {
    const openItems = this.items.filter(item => item.state === 'open')

    if (openItems.length > 1 && openItems[0].src === openItems[1].src) {
      openItems.forEach(item => {
        item.done()
        document.getElementById(`${item.index}`)?.classList.add('done')
        // document.getElementById(`${item.index}`)?.removeEventListener('click',() => this.handleClick())
      })
    }
    else if (openItems.length > 1 && openItems[0].index !== openItems[1].index) {
      setTimeout(() => {
        openItems.forEach(item => {
          item.close()
          document.getElementById(`${item.index}`)?.classList.remove('open')
        })
      }, 500);
    }

    setTimeout(() => {
      if (this.items.every(item => item.state === 'done')) {
        const winText = document.querySelector('.win_text') as HTMLElement
        document.querySelectorAll('.game_item').forEach(item => item.classList.add('win'))
        if (winText) winText.style.display = 'block'

      }
    }, 1000);

  }
}