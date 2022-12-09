import { userContex } from "../contexts/CurrentUserContext";

import React from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import api from "../utils/Api";
import auth from "./Auth";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";

import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import СonfirmationRemovePopup from "./СonfirmationRemovePopup";

import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";

import Spinner from "./Spinner";

function App() {
  const history = useHistory();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isСonfirmationPopupOpen, setIsСonfirmationPopupOpen] =
    React.useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [card, setCard] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [loadingText, setLoadingText] = React.useState("");
  const [btnFormText, setBtnFormText] = React.useState(`Сохранить`);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [requestStatus, setRequestStatus] = React.useState(false);
  const [headerEmail, setHeaderEmail] = React.useState('');


  React.useEffect(() => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        auth
          .getAuthenticationUser(jwt)
          .then((res) => {
            if (res) {

              setLoggedIn(true);
              setHeaderEmail(res.data.email);
              history.push('/');
            }
          })
          .catch((err) => console.log(err));
      }
    }
  })

  React.useEffect(() => {
    // Загрузочный экран
    spinnerInfo(true, `Загружаем сайт...😊`);

    Promise.all([api.getInitialCards(), api.getInitialUsers()])
      .then(([dataCards, dataUser]) => {
        // Рендер карточек на сайт из массива
        setCards(dataCards.map((card) => card));
        // Делаю запрос данных - пользователя
        setCurrentUser(dataUser);

        spinnerInfo(false);
        setLoadingText(`Сохранить`);
      })

      .catch((err) => {
        setLoadingText(`Карточки не загрузились... 😢 ${err}`);
        console.log(err); // выведем ошибку в консоль
      });
  }, []);

  function handleLoggedIn(evt) {
    evt.preventDefault();
    setLoggedIn(true);
  }

  function handleCardLike(card) {
    // Проверяем, есть ли уже лайк на этой карточке
    const checkLike = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !checkLike)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((arrCard) => (arrCard._id === card._id ? newCard : arrCard))
        );
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  function handleCardDelete(card) {
    setBtnFormText(`Удаление карточки...😢`);

    // Отправляем запрос в API для удаления карточки
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((arrCards) => arrCards._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        setBtnFormText(`${err}`);
        setTimeout(() => {
          setBtnFormText(`Повторить попытку 🔄️`);
        }, 1000);
        console.log(err); // выведем ошибку в консоль
      });
  }

  const handleEditAvatarClick = () => {
    setBtnFormText(`Сохранить`);
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setBtnFormText(`Сохранить`);
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setBtnFormText(`Сохранить`);
    setIsAddPlacePopupOpen(true);
  };

  const handleСonfirmationClick = (card) => {
    setBtnFormText(`Да`);
    setIsСonfirmationPopupOpen(true);
    setCard(card);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleInfoTooltip = (boolean) => {
    setInfoTooltipPopupOpen(true);
    setRequestStatus(boolean);
  };

  const spinnerInfo = (boolew, text) => {
    setLoading(boolew);
    setLoadingText(text);
  };

  const handleUpdateUser = (dataUser) => {
    setBtnFormText(`Сохраняем крутые данные...😎`);

    // Отправляем в API новые данные пользователя
    api
      .setInitialUsers(dataUser.name, dataUser.about)
      .then((userData) => {
        setCurrentUser(userData);
        // Закрываем окна после отправки
        closeAllPopups();
      })
      .catch((err) => {
        setBtnFormText(`${err}`);
        setTimeout(() => {
          setBtnFormText(`Повторить попытку 🔄️`);
        }, 1000);
        console.log(err); // выведем ошибку в консоль
      });
  };

  const handleUpdateAvatar = (dataAvatar) => {
    setBtnFormText(`Обновляем аватарку... 🖼️`);

    // Отправляем в API новые данные пользователя
    api
      .setNewAvatar(dataAvatar.avatar)
      .then((newUserAvatar) => {
        setCurrentUser(newUserAvatar);
        // Закрываем окна после отправки
        closeAllPopups();
      })
      .catch((err) => {
        setBtnFormText(`${err}`);
        setTimeout(() => {
          setBtnFormText(`Повторить попытку 🔄️`);
        }, 1000);
        console.log(err); // выведем ошибку в консоль
      });
  };

  const handleAddPlaceSubmit = (dataNewCard) => {
    setBtnFormText(`Добавляем карточку... 🤩`);

    // Отправляем в API новые данные карточки и добавляем в массив
    api
      .setAddNewCard(dataNewCard.title, dataNewCard.link)
      .then((arrNewCard) => {
        setCards([arrNewCard, ...cards]);
        // Закрываем окна после отправки
        closeAllPopups();
      })
      .catch((err) => {
        setBtnFormText(`${err}`);
        setTimeout(() => {
          setBtnFormText(`Повторить попытку 🔄️`);
        }, 1000);
        console.log(err); // выведем ошибку в консоль
      });
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsСonfirmationPopupOpen(false);
    setInfoTooltipPopupOpen(false);
    setSelectedCard(false);
  };

  return (
    <>
      {loading ? (
        <Spinner loading={loading} spinnerText={loadingText} />
      ) : (
        <>
          <Header
            emailUser={headerEmail}
          />

          <Switch>
            <Route path="/sign-up">
              <Register auth={auth} booleanRequestStatus={handleInfoTooltip} />
              <InfoTooltip
                isRequestStatus={requestStatus}
                isOpenInfoTooltip={isInfoTooltipPopupOpen}
                onClose={closeAllPopups}
              />
            </Route>

            <Route path="/sign-in">
              <Login
                auth={auth}
                handleLoggedIn={handleLoggedIn}
                booleanRequestStatus={handleInfoTooltip}
              />
              <InfoTooltip
                isRequestStatus={requestStatus}
                isOpenInfoTooltip={isInfoTooltipPopupOpen}
                onClose={closeAllPopups}
              />
            </Route>

            <userContex.Provider value={currentUser}>
              <ProtectedRoute
                path="/"
                component={Main}
                loggedIn={loggedIn}
                arrCards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onСonfirmationRemove={handleСonfirmationClick}
              />
              <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                btnText={btnFormText}
                onUpdateAvatar={handleUpdateAvatar}
                onClose={closeAllPopups}
              />
              <ImagePopup card={selectedCard} onClose={closeAllPopups} />
              <EditProfilePopup
                isOpenEditProfile={isEditProfilePopupOpen}
                btnText={btnFormText}
                onUpdateUser={handleUpdateUser}
                onClose={closeAllPopups}
              />
              <AddPlacePopup
                isOpenAddPlace={isAddPlacePopupOpen}
                btnText={btnFormText}
                onAddPlace={handleAddPlaceSubmit}
                onClose={closeAllPopups}
              />
              <СonfirmationRemovePopup
                isOpenСonfirmation={isСonfirmationPopupOpen}
                btnText={btnFormText}
                onCardDelete={handleCardDelete}
                card={card}
                onСonfirmationRemove={handleСonfirmationClick}
              />
              <Footer />
            </userContex.Provider>

            <Route exact path="/">
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
        </>
      )}
    </>
  );
}

export default App;
