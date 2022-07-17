const KeyboardKey = ({ keyboardKey, onKeyPress }) => {
  return (
    <button className={`keyboardKey ${keyboardKey.state}`}
      onClick={() => onKeyPress(keyboardKey.key)}>
      {keyboardKey.letter}
    </button>
  )
}

export default KeyboardKey;
