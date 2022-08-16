import { useContext } from "react";
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext'
import Myselect from "./MySelect";

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete, selectedFilter, setSelectedFilter}) {
  
  const currentUser = useContext(CurrentUserContext);
 
  const filterCard = (filter) => {
    setSelectedFilter(filter)
  }

  return (
    <main className="content">
        <section className="profile">
          <button onClick={onEditAvatar}  className="profile__button">
            {currentUser.avatar && (<img src={currentUser.avatar} alt={`Avatar ${currentUser.name}`} className="profile__avatar"/>)}
          </button>

          <div className="profile__info">
            <div className="profile__main">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button onClick={onEditProfile} type="button" className="profile__edit-button"></button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
          <button onClick={onAddPlace} type="button" className="profile__add-button"></button>
        </section>
        <Myselect
          value={selectedFilter}
          onChange={filterCard}
          defaultValue="Фильтр" 
          options={[
            {value: "My card", name: "Мои карточки"},
            {value: "Alien card", name: "Чужие карточки"},
            {value: "All", name: "Все карточки"}
          ]}
        />
        <section className="elements" aria-label="Фотографии мест">
          <ul className="elements__items">
          {(() => {
                switch(selectedFilter) {
                  case "My card": 
                  const newArr = cards.filter((data) => {if (currentUser._id === data.owner._id) {
                    return (
                     <Card card={data} key={data._id} onCardClick={onCardClick} onCardLike={onCardLike} onTrashClick={onCardDelete}/>
                     )
                  }});
                  if (newArr.length>0) {
                    return newArr.map((data) => { 
                      return (
                       <Card card={data} key={data._id} onCardClick={onCardClick} onCardLike={onCardLike} onTrashClick={onCardDelete}/>
                       )
                    });  
                  } else {
                    return <h2 style={{color: "white", fontSize:"18px", display: "flex", justifyContent:"center"}}>Собственных карточек нет, для отображения загрузите новые</h2>
                  }
                 
                                  
                  case "Alien card": 
                  return cards.map((data) => {if (currentUser._id !== data.owner._id) {
                    return (
                     <Card card={data} key={data._id} onCardClick={onCardClick} onCardLike={onCardLike} onTrashClick={onCardDelete}/>
                     )
                  }             
                  });
                  case "All": 
                  return cards.map((data) => {
                    return (
                       <Card card={data} key={data._id} onCardClick={onCardClick} onCardLike={onCardLike} onTrashClick={onCardDelete}/>
                    )
                  });
                  default:
                  return cards.map((data) => {
                      return (
                         <Card card={data} key={data._id} onCardClick={onCardClick} onCardLike={onCardLike} onTrashClick={onCardDelete}/>
                      )
                    });
                }
            })()}


         


          </ul>
        </section>
      </main>
  )
}

export default Main;