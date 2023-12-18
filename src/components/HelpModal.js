import CloseButton from './CloseButton'

const HelpModal = ({ closeModal }) => {
  return (
    <div className="dialog">
      <CloseButton onClick={closeModal} />
      <h1>How To Play</h1>
      <ul>
        <li>{"Each guess must be a valid 6-letter word."}</li>
        <li>{"First guess must start with the predetermined letter. " +
        "This letter is not guaranteed to be in the word unless playing " + 
          "in Tato mode (coming soon)."}</li>
        <li>{"Subsequent guesses must be valid guesses given the previous " + 
        "information for what letters are or aren't in the word."}</li>
      </ul>
    </div>
  )
}

export default HelpModal;
