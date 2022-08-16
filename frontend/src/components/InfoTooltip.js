import OkRegister from '../images/popup/Ok.svg';
import NotRegister from '../images/popup/Error.svg'

const InfoTooltip = ({isOpen, onClose, message, status}) => {
  return (
    <div className={`popup ${isOpen && 'popup_opened'}`} >
      <div className="popup__content infoTooltip">
        <button
          type="button"
          className="popup__close"
          aria-label="Закрыть попап"
          onClick={onClose}
        ></button>
        <img
          className="infoTooltip__img"
          src={status ? OkRegister : NotRegister}
          alt="images yes or not registed"
        />
        <h2 className="infoTooltip__text">
          {message}  
        </h2>        
      </div>
    </div>
  )
}

export default InfoTooltip;