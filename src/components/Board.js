import Row from './Row'

const Board = () => {
  const row1Tiles = [
    {
      'letter': 'w',
      'state': 'correct',
    },
    {
      'letter': 'o',
      'state': 'correct',
    },
    {
      'letter': 'n',
      'state': 'present',
    },
    {
      'letter': 'g',
      'state': 'absent',
    },
    {
      'letter': 'l',
      'state': 'present',
    },
    {
      'letter': 'e',
      'state': 'present',
    },
  ];

  const row2Tiles = [
    {
      'letter': 'w',
    },
    {
      'letter': 'o',
    },
    {
      'letter': '',
    },
    {
      'letter': '',
    },
    {
      'letter': '',
    },
    {
      'letter': '',
    },
  ];

  return (
    <div className='board'>
      <Row tiles={row1Tiles} />
      <Row tiles={row2Tiles} />
      <Row />
      <Row />
      <Row />
    </div>
  )
}

export default Board;
