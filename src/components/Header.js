const Header = ({ toggleDarkMode }) => {
  return (
    <header onDoubleClick={() => toggleDarkMode()}>
      <h1>
        Wongle
      </h1>
    </header>
  )
}

export default Header;
