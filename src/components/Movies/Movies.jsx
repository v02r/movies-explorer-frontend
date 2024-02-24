import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import MainApi from "../../utils/MainApi";
import {useEffect, useState} from "react";
import {moviesApi} from "../../utils/MoviesApi";
import {useMovies} from "../../hooks/useMovies";
import Preloader from "../Preloader/Preloader";

function getMoviesCount(width) {
    let countCards;
    const MoviesCountConfig = {
        1200: [12, 3],
        760: [8, 2],
        320: [5, 2],
    };

    Object.keys(MoviesCountConfig)
        .sort((a, b) => a - b)
        .forEach((key) => {
            if (width > +key) {
                countCards = MoviesCountConfig[key];
            }
        });

    return countCards;
}

function Movies() {
    const [filmsSaved, setFilmsSaved] = useState([]);
    const [MoviesCount, setMoviesCount] = useState([]);
    const [filmsShowed, setFilmsShowed] = useState([]);

    const {
        handleSetSearch,
        handleSetShortFilms,
        filteredFilms,
        notFound,
        initFilms,
        shortFilms,
        search,
        loading
    } = useMovies(moviesApi.getMovies.bind(moviesApi));


    const mainApi = new MainApi(localStorage.getItem("jwt"));

    useEffect(() => {
        const clientWidth1 = document.documentElement.clientWidth;
        setMoviesCount(getMoviesCount(clientWidth1));


        const handlerResize = () => {
            const clientWidth = document.documentElement.clientWidth;
            setMoviesCount(getMoviesCount(clientWidth))
        };
        window.addEventListener("resize", handlerResize);

        return () => {
            window.removeEventListener("resize", handlerResize);
        };
    }, []);

    useEffect(() => {
        const ind = filmsShowed.length - filmsShowed.length % MoviesCount[1];
        setFilmsShowed(prev => prev.slice(0, ind))
    }, [MoviesCount]);

    function handleMore() {
        const spliceFilms = filteredFilms;
        const newFilmsShowed = filmsShowed.concat(
            spliceFilms.slice(filmsShowed.length, MoviesCount[1] + filmsShowed.length)
        );
        setFilmsShowed(newFilmsShowed);
    }

    useEffect(() => {
        const clientWidth = document.documentElement.clientWidth;

        const sliceData = filteredFilms.slice(0, getMoviesCount(clientWidth)[0]);
        setFilmsShowed(sliceData);
    }, [filteredFilms]);

    async function savedMoviesToggle(film, favorite) {
        const jwt = localStorage.getItem("jwt");
        const api = new MainApi(jwt);
        if (favorite) {
            const objFilm = {
                image: "https://api.nomoreparties.co" + film.image.url,
                trailerLink: film.trailerLink,
                thumbnail: "https://api.nomoreparties.co" + film.image.url,
                movieId: film.id,
                country: film.country || "Неизвестно",
                director: film.director,
                duration: film.duration,
                year: film.year,
                description: film.description,
                nameRU: film.nameRU,
                nameEN: film.nameEN,
            };
            try {
                const res = await api.save(objFilm);
                const savedMovies = JSON.parse(localStorage.getItem("savedFilms"));
                const newSaved = savedMovies.concat(res);
                setFilmsSaved(newSaved);
                localStorage.setItem("savedFilms", JSON.stringify(newSaved));
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                await api.delete(film._id);
                const savedMovies = JSON.parse(localStorage.getItem("savedFilms"));
                const newSaved = savedMovies.filter((element) => {
                    return element._id !== film._id;
                });
                setFilmsSaved(newSaved);
                localStorage.setItem("savedFilms", JSON.stringify(newSaved));
            } catch (err) {
                console.log(`${err}`);
            }
        }
    }

    useEffect(() => {
        const localStorageFilmsSaved = localStorage.getItem("savedFilms");

        if (!localStorageFilmsSaved) {
            mainApi.getSaved().then((savedFilms) => {
                setFilmsSaved(savedFilms);
                localStorage.setItem("savedFilms", JSON.stringify(savedFilms));
            });
        } else {
            const savedLocalFilms = JSON.parse(localStorageFilmsSaved);
            setFilmsSaved(savedLocalFilms);
        }
    }, []);

  return (
    <div className="movies">
      <SearchForm
        isChecked={shortFilms}
          handleSetSearch={handleSetSearch}
          handleShortFilms={handleSetShortFilms}
          search={search}
      />
        {loading && <Preloader />}
        {filteredFilms !== null && filmsShowed !== null && (
            <MoviesCardList
                filmsRemains={filteredFilms.length - filmsShowed.length}
                handleMore={handleMore}
                moviesList={filmsShowed}
                savedMoviesToggle={savedMoviesToggle}
                filmsSaved={filmsSaved}
                notFound={notFound}
            />
        )}
    </div>
  );
}

export default Movies;
