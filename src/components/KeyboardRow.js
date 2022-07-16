import KeyboardKey from './KeyboardKey'

const KeyboardRow = ({ keys }) => {
  return (
    <div className='keyboardRow'>
      {keys.map((key, index) => (
        <KeyboardKey key={index} letter={key} />))
      }
    </div>
  )
}

export default KeyboardRow;
