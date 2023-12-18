import Button from './Button'
import CloseButton from './CloseButton'

const SettingsModal = ({ closeModal, toggleDarkMode }) => {
  return (
    <div className="dialog">
      <CloseButton onClick={closeModal} />
      <h1>Settings</h1>
      <Button text='Toggle Dark Mode' onClick={toggleDarkMode} />
    </div>
  )
}

export default SettingsModal;