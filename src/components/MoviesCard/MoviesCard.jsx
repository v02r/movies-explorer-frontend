import {useLocation} from "react-router-dom";
import {MOVIES_API_URL} from "../../utils/constants";
import {useEffect, useState} from "react";

function getMovieDuration(mins) {
    return `${Math.floor(mins / 60)}ч ${mins % 60}м`;
}

function MoviesCard({ movie, savedMoviesToggle, filmsSaved }) {
    const { pathname } = useLocation();
    const [favorite, setFavorite] = useState(false);

    function handleFavoriteToogle() {
        const newFavorite = !favorite;
        const savedFilm = filmsSaved.filter((obj) => {
            return obj.movieId == movie.id;
        });
        savedMoviesToggle({ ...movie, _id: savedFilm.length > 0 ? savedFilm[0]._id : null }, newFavorite);
    }

    function handleFavoriteDelete() {
        savedMoviesToggle(movie, false);
    }



    useEffect(() => {
        if (pathname !== '/saved-movies') {
            const savedFilm = filmsSaved.find((obj) =>  obj.movieId == movie.id);
            setFavorite(!!savedFilm);
        }
    }, [pathname, filmsSaved, movie.id]);

    const location = useLocation();

    const path = location.pathname;
    const isSavedMovies = path === "/saved-movies";
    const imageUrl = isSavedMovies ? movie.thumbnail : MOVIES_API_URL + movie.image.formats.thumbnail.url;
    const link = movie.trailerLink;

    return (
        <article className="card">
            <div className="card__container">
                {pathname === "/saved-movies" ? (
                    <button
                        type="button"
                        className="card__favorite link card__favorite_delete"
                        onClick={handleFavoriteDelete}
                    />
                ) : (
                    <button
                        type="button"
                        className={`card__favorite card__favorite${
                            favorite ? "_active" : ""
                        }`}
                        onClick={handleFavoriteToogle}
                    />
                )}
                <a href={link} target={"_blank"}>
                <img  className="card__image" src={imageUrl} alt={movie.nameRU}/>
                </a>
            </div>
            <div className="card__footer">
                <h2 className="card__title">{movie.nameRU}</h2>
                <p className="card__duration text color-text">{getMovieDuration(movie.duration)}</p>
            </div>
        </article>
    );
}

export default MoviesCard;
