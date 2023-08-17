const Button = ({ text, onClick }) => {
  return (
    <div className='buttonContainer'>
      <button className='button' onClick={onClick}>
        {text}
      </button>
    </div>
  )
}

export default Button;
