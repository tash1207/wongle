import Button from './Button'

const SettingsModal = ({ toggleDarkMode }) => {
  return (
    <div className="dialog">
      <h1>Settings</h1>
      <Button text='Toggle Dark Mode' onClick={toggleDarkMode} />
    </div>
  )
}

export default SettingsModal;