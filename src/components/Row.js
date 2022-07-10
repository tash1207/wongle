import Tile from './Tile'

const Row = ({ tiles }) => {
  const defaultTiles = [
    {'letter': ''},
    {'letter': ''},
    {'letter': ''},
    {'letter': ''},
    {'letter': ''},
    {'letter': ''},
  ];
  const tilesArray = tiles || defaultTiles;
  
  return (
    <div className='row'>
      {tilesArray.map((tile, index) => (
        <Tile key={index} tile={tile} />
      ))}
    </div>
  )
}

export default Row;
