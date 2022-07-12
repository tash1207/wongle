import Row from './Row'

const Board = ({ rows }) => {
  return (
    <div className='board'>
      {rows.map((row, index) => (
        <Row key={index} row={row} />
      ))}
    </div>
  )
}

export default Board;
