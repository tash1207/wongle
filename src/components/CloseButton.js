const CloseButton = ({ onClick }) => {
  return (
    <button class="closeButton" onClick={onClick}>
      <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.86 9l-5.417 5.416a1.514 1.514 0 0 0 2.14 2.14L9 11.14l5.416 5.417a1.514 1.514 0 0 0 2.14-2.14L11.14 9l5.417-5.416a1.514 1.514 0 0 0-2.14-2.14L9 6.86 3.584 1.443a1.514 1.514 0 0 0-2.14 2.14L6.86 9z" fill="#111" fill-rule="nonzero"></path>
      </svg>
    </button>
  )
}

export default CloseButton;