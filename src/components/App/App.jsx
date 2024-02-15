import {useState} from "react";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Footer from "../Footer/Footer";
import {Routes, Route, useNavigate} from "react-router-dom";
import Login from "../Auth/Login";
import Register from "../Auth/Register";

import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import InfoToolTip from "../InfoToolTip/InfoToolTip";
import {data} from "../../utils/constants";



function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({name: "Тест", email: "test@gmail.com"});

    const [favoriteMovies, setFavoriteMovies] = useState(data.slice(0,6));
    const [moviesList, setMoviesList] = useState(data);

    const [infoToolTip, setInfoTooltip] = useState({
        message: "",
        isOpen: false,
        success: false,
    });

    const navigate = useNavigate();


    function onClosePopup() {
        setInfoTooltip({...infoToolTip, isOpen: false});
    }

    function handleUpdateUser(body) {
    }

    function onLogin() {
        setIsAuth(true);
        setInfoTooltip({
            message: "Вы успешно вошли в аккаунт!",
            isOpen: true,
            success: true,
        });
        navigate("/");
    }

    function onRegister() {
        setIsAuth(true);
        setInfoTooltip({
            message: "Вы успешно зарегистрировались!",
            isOpen: true,
            success: true,
        })
        navigate("/signin");
    }

    function onSignout() {
        setIsAuth(false);
        navigate("/")
    }

    const Wrap = ({children, footer = true}) => {
        return (
            <>
                <Header isAuth={isAuth}/>
                <main>
                    {children}
                </main>
                {
                    footer && <Footer/>
                }
            </>
        );
    };

    return (
        <div className="page">
            <Routes>
                <Route
                    exact
                    path="/"
                    element={
                        <Wrap>
                            <Main/>
                        </Wrap>
                    }
                />
                <Route
                    path="/movies"
                    element={
                        <Wrap>
                            <Movies moviesList={moviesList} loading={loading}/>
                        </Wrap>
                    }
                />
                <Route
                    path="/saved-movies"
                    element={
                        <Wrap>
                            <SavedMovies moviesList={favoriteMovies}/>
                        </Wrap>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <Wrap footer={false}>
                            <Profile handleSignout={onSignout} user={user} handleUpdateUser={handleUpdateUser}/>
                        </Wrap>
                    }
                />
                <Route
                    path="/signin"
                    element={<Login onLogin={onLogin} success={infoToolTip.success}/>}
                />
                <Route
                    path="/signup"
                    element={<Register onRegister={onRegister} success={infoToolTip.success}/>}
                />
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
            <InfoToolTip onClose={onClosePopup} infoToolTip={infoToolTip}/>
        </div>
    );
}

export default App;
