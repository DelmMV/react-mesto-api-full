import React from "react";
import {
  Route,
  Routes,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Footer from "./Footer";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api.js";
import Union from "../images/Union.png";
import UnionError from "../images/UnionError.png";
import * as auth from "../utils/auth.js";

function App() {
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [isInfoTooltipRegister, setIsInfoTooltipRegister] =
    React.useState(false);
  const [isInfoTooltipError, setIsInfoTooltipError] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    if (isLoggedIn) {
      api
        .getUserInfo()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => alert(err));

      api
        .getCardInfo()
        .then((res) => {
          setCards(res);
        })
        .catch((err) => alert(err));
    }
  }, [isLoggedIn]);

  const location = useLocation();

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipRegister(false);
    setIsInfoTooltipError(false);
    setSelectedCard(null);
  };

  const handleUpdateUser = (name, about) => {
    api
      .setUserInfo(name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => alert(err));
  };

  const handleUpdateAvatar = (link) => {
    api
      .setUserAvatar(link)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => alert(err));
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => alert(err));
  }

  function handleCardDelete(card) {
    api
      .changeCardStatus(card._id)
      .then(setCards((state) => state.filter((c) => (c === card ? null : c))))
      .catch((err) => alert(err));
  }

  function handleAddPlaceSubmit(name, link) {
    api
      .setCardInfo(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => alert(err));
  }

  const tokenCheck = () => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .checkToken(token)
        .then((data) => {
          if (data.email) {
            localStorage.setItem("email", data.email);
            setIsLoggedIn(true);
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
          setIsInfoTooltipError(true);
        });
    }
  };

  const handleRegister = (email, password) => {
    auth
      .register({ email, password })
      .then((res) => {
        if (res) {
          setIsInfoTooltipRegister(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltipError(true);
      });
  };

  const navigate = useNavigate();

  const handleLogin = (email, password) => {
    auth
      .authorize({ email, password })
      .then((data) => {
        if (data.jwt) {
          localStorage.setItem("token", data.jwt);
          tokenCheck();
          setIsLoggedIn(true);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltipError(true);
      });
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/sign-in");
  };

  const goTo = () => {
    if (isLoggedIn) {
      handleLogout();
    } else {
      location.pathname === "/sign-up"
        ? navigate("/sign-in")
        : navigate("/sign-up");
    }
  };

  return (
    <div className="root">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header
            location={location.pathname}
            isLoggedIn={isLoggedIn}
            goTo={goTo}
          />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Main
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/sign-up"
              element={<Register handleRegister={handleRegister} />}
            />
            <Route
              exact
              path="/sign-in"
              element={<Login handleLogin={handleLogin} />}
            />
            <Route
              path="*"
              element={
                isLoggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
              }
            />
          </Routes>
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <PopupWithForm
            title={"Вы уверены"}
            name={"popupDelete"}
            typeForm={"delete"}
            buttonText={"Да"}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip
            title={"Вы успешно зарегистрировались!"}
            onClose={closeAllPopups}
            isOpen={isInfoTooltipRegister}
            image={Union}
          />
          <InfoTooltip
            title={"Что-то пошло не так! Попробуйте еще раз."}
            onClose={closeAllPopups}
            isOpen={isInfoTooltipError}
            image={UnionError}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
