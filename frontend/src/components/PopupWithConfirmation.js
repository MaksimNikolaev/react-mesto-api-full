import PopupWithForm from "./PopupWithForm";


function PopupWithConfirmation ({isOpen, onClose, card, onDeleteCard}) {

  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard(card);
  }

  return (
    <PopupWithForm
            name="deleteCard"
            title="Вы уверены?"
            textButton="ДА"
            onSubmit={handleSubmit}
            isOpen={isOpen}
            onClose={onClose}
            buttonDisabled={true}
        >
        </PopupWithForm>
        )
}

export default PopupWithConfirmation;