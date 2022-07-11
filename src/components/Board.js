import Row from './Row'

const Board = ({ rows }) => {
  return (
    <div className='board'>
      {rows.map((row, index) => (
        <Row key={index} tiles={row.tiles} />
      ))}
    </div>
  )
}

export default Board;
