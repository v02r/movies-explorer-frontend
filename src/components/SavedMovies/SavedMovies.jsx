import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import MainApi from "../../utils/MainApi";
import {useState} from "react";
import {useSavedMovies} from "../../hooks/useSavedMovies";
import Preloader from "../Preloader/Preloader";

function SavedMovies({ moviesList }) {
    const [preloader, setPreloader] = useState(false);
    const [errorText, setErrorText] = useState("");

    const mainApi = new MainApi(localStorage.getItem("jwt"));

    const {
        handleSetSearch,
        handleSetShortFilms,
        filteredFilms,
        initFilms,
        shortFilms,
        search,
        handleDeleteSaved,
    } = useSavedMovies(mainApi);

    console.log(filteredFilms)

  return (
    <div className="movies">
        <SearchForm
            isChecked={shortFilms}
            handleSetSearch={handleSetSearch}
            handleShortFilms={handleSetShortFilms}
            search={search}
        />
        {preloader && <Preloader />}
        {errorText && <div className="text-medium">{errorText}</div>}
        <MoviesCardList
            filmsRemains={0}
            savedMoviesToggle={handleDeleteSaved}
            moviesList={filteredFilms}
        />
    </div>
  );
}

export default SavedMovies;
