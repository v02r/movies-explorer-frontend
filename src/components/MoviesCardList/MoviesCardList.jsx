import { useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import {useLocation} from "react-router-dom";
import More from "../More/More";

function MoviesCardList( { moviesList, savedMoviesToggle, filmsSaved, filmsRemains, handleMore, notFound }) {
    const { pathname } = useLocation();

  return (
    <div className="cards">
          <section className="cards__list">
            {moviesList.map((film) => (
                <MoviesCard
                    key={film.id || film.movieId}
                    movie={film}
                    savedMoviesToggle={savedMoviesToggle}
                    filmsSaved={filmsSaved}
                />
            ))}
              {
                  notFound && <div className="text-input">Ничего не найдено</div>
              }
          </section>

        {filmsRemains > 0 && pathname !== '/saved-movies' && (
            <More handleMore={handleMore}/>
        )}
    </div>
  );
}

export default MoviesCardList;
