import KeyboardRow from './KeyboardRow'

const Keyboard = () => {
  const firstRow = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
  const secondRow = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
  const thirdRow = ['ent', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'bksp'];

  return (
    <div className='keyboard'>
      <KeyboardRow keys={firstRow} />
      <KeyboardRow keys={secondRow} />
      <KeyboardRow keys={thirdRow} />
    </div>
  )
}

export default Keyboard;
