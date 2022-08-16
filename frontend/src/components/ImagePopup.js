function ImagePopup({card,onClose}) {
  return (
    <div className={`popup popup_photo ${card.link && "popup_opened"}`}>
      <div className="popup__galery">
        <button
          type="button"
          className="popup__close"
          aria-label="Закрыть попап"
          onClick={onClose}
        ></button>
        <figure className="popup__figure">
          <img className="popup__photo" src={card.link} alt={`Фотография ${card.name}`} />
          <figcaption className="popup__caption">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  )
}
export default ImagePopup;