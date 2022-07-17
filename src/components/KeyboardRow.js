import KeyboardKey from './KeyboardKey'

const KeyboardRow = ({ keys, onKeyPress }) => {
  return (
    <div className='keyboardRow'>
      {keys.map((key) => (
        <KeyboardKey key={key.letter} keyboardKey={key}
          onKeyPress={onKeyPress} />
      ))}
    </div>
  )
}

export default KeyboardRow;
