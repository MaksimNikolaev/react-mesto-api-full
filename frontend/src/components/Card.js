import { useContext } from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext'

function Card({card, onCardClick, onCardLike, onTrashClick}) {

  const currentUser = useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `elements__trash ${isOwn && 'elements__trash_visible'}`
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `elements__like ${isLiked && 'elements__like_active'}`
  );

  function handleClick() {
    onCardClick(card);
  }  

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleTrashClick() {
    onTrashClick(card);
  }

  return (
    <li className="elements__item">
        <div className="elements__cover">
          <div className="elements__photo-container">
            <img src={card.link} alt={card.name} className="elements__photo" onClick={handleClick}/>
          </div>
          <div className="elements__info">
            <h2 className="elements__title">{card.name}</h2>
            <div className="elements__group">
              <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
              <p className="elements__count-like">{card.likes.length}</p>
            </div>
          </div>
          <button type="button" className={cardDeleteButtonClassName} onClick={handleTrashClick}></button>
        </div>
      </li>
  )
}

export default Card;