const Tile = ({ tile }) => {
  return (
    <div className={`tile ${tile.state || 'tbd'}`}>
      {tile.letter}
    </div>
  )
}

export default Tile;
