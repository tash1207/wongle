import Button from './Button'

const Header = ({ tatoModeEnabled, onHelpClick, onSettingsClick }) => {
  return (
    <header className="appHeader">
      <Button text='Help' onClick={onHelpClick} />
      <h1>{tatoModeEnabled ? 'Tatongle' : 'Wongle'}</h1>
      <Button text='Settings' onClick={onSettingsClick} />
    </header>
  )
}

export default Header;
