const Tile = ({ tile }) => {
  return (
    <div className={`tile ${tile.state}`}>
      {tile.letter}
    </div>
  )
}

export default Tile;
