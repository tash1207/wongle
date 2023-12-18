import Button from './Button'
import CloseButton from './CloseButton'

const SettingsModal = ({ closeModal, toggleDarkMode, toggleTatoMode }) => {
  return (
    <div className="dialog">
      <CloseButton onClick={closeModal} />
      <h1>Settings</h1>
      <Button text='Toggle Dark Mode' onClick={toggleDarkMode} />
      <Button text='Toggle Tato Mode' onClick={toggleTatoMode} />
    </div>
  )
}

export default SettingsModal;