interface CardItem {
  name: string,
  imagePath: string
  selected?: boolean
}

interface BoardCell extends CardItem {
  id: string
  opened?: boolean
  guessed?: boolean
}

interface Cell extends BoardCell {}

interface Board extends Array<BoardCell> {}
