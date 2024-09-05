import { Game } from "./Game"
import { Item } from "./Item"

const board = document.querySelector('.game_board')
const data = [
  {
    src: '/public/1.jpg'
  },
  {
    src: '/public/2.webp'
  },
  {
    src: '/public/3.webp'
  },
  {
    src: '/public/4.jpg'
  },
  {
    src: '/public/5.jpg'
  },
  {
    src: '/public/6.jpg'
  },
  {
    src: '/public/7.webp'
  },
  {
    src: '/public/8.jpg'
  },
  {
    src: '/public/1.jpg'
  },
  {
    src: '/public/2.webp'
  },
  {
    src: '/public/3.webp'
  },
  {
    src: '/public/4.jpg'
  },
  {
    src: '/public/5.jpg'
  },
  {
    src: '/public/6.jpg'
  },
  {
    src: '/public/7.webp'
  },
  {
    src: '/public/8.jpg'
  },
  
]
const items = data.map((item, i) => new Item(item.src, i)).sort(() => Math.random() - 0.5)


if (board) {
  const game = new Game(items, board)
  game.start()
  document.querySelector('.restart')?.addEventListener('click', () => {
    window.location.reload()
  })
}
