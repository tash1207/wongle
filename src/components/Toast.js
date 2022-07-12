const Toast = ({ toast }) => {
  return (
    <div className={`toastContainer ${toast.shown ? 'shown' : ''}`}>
      <div>
        {toast.message}
      </div>
    </div>
  )
}

export default Toast;
