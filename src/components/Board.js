import Row from './Row'

const Board = () => {
  const Tile = (letter, state) => {
    return {
      letter : letter || '',
      state : state || 'tbd',
    }
  }

  const defaultTiles = Array(6).fill(Tile());

  const row1Tiles = [
    Tile('w', 'correct'),
    Tile('o', 'correct'),
    Tile('n', 'present'),
    Tile('g', 'absent'),
    Tile('l', 'present'),
    Tile('e', 'present'),
  ];

  const row2Tiles = [
    Tile('w'),
    Tile('o'),
    Tile(),
    Tile(),
    Tile(),
    Tile(),
  ];

  return (
    <div className='board'>
      <Row tiles={row1Tiles} />
      <Row tiles={row2Tiles} />
      <Row tiles={defaultTiles} />
      <Row tiles={defaultTiles} />
      <Row tiles={defaultTiles} />
    </div>
  )
}

export default Board;
