function PopupWithForm({name, onClose, isOpen, title, children, textButton,  onSubmit, buttonDisabled}) {
  const buttonClassName = `popup__button ${!buttonDisabled && "popup__button_disabled"}`;
  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`} >
      <div className="popup__content">
        <button
          type="button"
          className="popup__close"
          aria-label="Закрыть попап"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          className="popup__form popup__form_data_edit"
          method="POST"
          name={name}
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button type="submit" className={buttonClassName} disabled={!buttonDisabled}>
            {textButton}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm