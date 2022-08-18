import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithConfirmation from "./PopupWithConfirmation";
import Loader from "../UI/Loader";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/Auth";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isRemoveCardPopupOpen, setRemoveCardPopupOpen] = useState(false);
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedCardForRemove, setSelectedCardForRemove] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  useEffect(() => {
    setLoadingPage(true);
    api
      .getInitialCards()
      .then((cards) => {
        cards.sort((card1, card2) => card1['createdAt'] > card2['createdAt'] ? -1 : 1);
        setCards(cards);
        setLoadingPage(false);
      })
      .catch((err) => {
        console.log(err);
      });
    api
      .getInitialUser()
      .then((promis) => {
        setCurrentUser(promis);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedFilter]);

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, [loggedIn]);

  const navigate = useNavigate();

  const handleRegister = (password, email) => {
    auth
      .register(password, email)
      .then((res) => {
        if (res.user.email) {
          setUserEmail(res.user.email);
          setStatus(true);
          setMessage("Вы успешно зарегистрировались");
          handleLoginSubmit();
          navigate("/sign-in");
        }
      })
      .catch(() => {
        setStatus(false);
        setMessage("Что то пошло не так! Попробуйте еще раз.");
        handleLoginSubmit();
      });
  };

  const handleLogin = (password, email) => {
    auth
      .authorize(password, email)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setUserEmail(email);
          setLoggedIn(true);
          setStatus(true);
          setLoadingPage(false);
          checkToken();
          setMessage("Вы успешно авторизировались");
          handleLoginSubmit();
        }
      })
      .catch(() => {
        setStatus(false);
        setMessage("Что то пошло не так! Попробуйте еще раз.");
        handleLoginSubmit();
      });
  };

  const checkToken = () => {
    let jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          if (res.email) {
            setUserEmail(res.email);
            setLoggedIn(true);
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setUserEmail(null);
    navigate("/sign-in");
  };

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleLoginSubmit() {
    setLoginPopupOpen(true);
  }

  function handleRemoveCardClick(card) {
    setRemoveCardPopupOpen(true);
    setSelectedCardForRemove(card);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setRemoveCardPopupOpen(false);
    setLoginPopupOpen(false);
    setSelectedCard({});
  }

  function handleUpdateUser(currentUser) {
    setLoading(true);
    api
      .setUserInfo(currentUser)
      .then((promis) => {
        setCurrentUser(promis);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleUpdateAvatar(currentUser) {
    setLoading(true);
    api
      .updateAvatar(currentUser)
      .then((promis) => {
        setCurrentUser(promis);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleAddPlaceSubmit(card) {
    setLoading(true);
    api
      .addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="container">
          <Header email={userEmail} handleLogOut={handleLogOut} />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  {loadingPage ? (
                    <div className="loader">
                      <Loader />
                    </div>
                  ) : (
                    <Main
                      onEditProfile={handleEditProfileClick}
                      onAddPlace={handleAddPlaceClick}
                      onEditAvatar={handleEditAvatarClick}
                      onCardClick={handleCardClick}
                      cards={cards}
                      onCardLike={handleCardLike}
                      onCardDelete={handleRemoveCardClick}
                      selectedFilter={selectedFilter}
                      setSelectedFilter={setSelectedFilter}
                    />
                  )}
                </ProtectedRoute>
              }
            />
            <Route
              path="/sign-in"
              element={
                <>
                  <Login handleLogin={handleLogin} />
                </>
              }
            />
            <Route
              path="/sign-up"
              element={<Register handleRegister={handleRegister} />}
            />
          </Routes>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={loading}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={loading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={loading}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <PopupWithConfirmation
            isOpen={isRemoveCardPopupOpen}
            onClose={closeAllPopups}
            card={selectedCardForRemove}
            onDeleteCard={handleCardDelete}
          />
          <Footer />
          <InfoTooltip
            status={status}
            message={message}
            isOpen={isLoginPopupOpen}
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
