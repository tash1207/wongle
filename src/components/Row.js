import Tile from './Tile'

const Row = ({ row }) => {
  return (
    <div className={`row ${row.isValidWord ? '' : 'notWord'}`}>
      {row.tiles.map((tile, index) => (
        <Tile key={index} tile={tile} />
      ))}
    </div>
  )
}

export default Row;
