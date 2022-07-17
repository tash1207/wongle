import KeyboardRow from './KeyboardRow'

const Keyboard = ({ rows, onKeyPress }) => {
  return (
    <div className='keyboard'>
      {rows.map((row, index) => (
        <KeyboardRow key={index} keys={row} onKeyPress={onKeyPress} />
      ))}
    </div>
  )
}

export default Keyboard;
