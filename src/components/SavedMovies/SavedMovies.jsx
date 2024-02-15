import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies({ moviesList }) {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList moviesList={moviesList} loading={false} />
    </main>
  );
}

export default SavedMovies;
