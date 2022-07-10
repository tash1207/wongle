import Tile from './Tile'

const Row = ({ tiles }) => {
  return (
    <div className='row'>
      {tiles.map((tile, index) => (
        <Tile key={index} tile={tile} />
      ))}
    </div>
  )
}

export default Row;
