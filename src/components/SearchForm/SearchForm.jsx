import FilterCheckbox from "./FilterCheckbox";
import {useState} from "react";

function SearchForm({ handleShortFilms, isChecked, handleSetSearch, search }) {
  const [input, setInput] = useState(search || "");


  function handleSubmit(e) {
    e.preventDefault();
    handleSetSearch(input);
  }

  function handleCheckBoxChange(e) {
    handleShortFilms(!isChecked);
    console.log("check", isChecked)
  }

  console.log(input, search, isChecked)
  return (
    <section className="search ">
      <form className="search__form" onSubmit={handleSubmit}>
        <div className="search__movie">
        <input type="text" className="search__form-input" placeholder="Фильм" required value={input} onChange={e => setInput(e.target.value)} />
        <button className="search__submit link" type="submit"/>
        </div>
        <FilterCheckbox handleTumblerChange={handleCheckBoxChange} checked={isChecked} />
      </form>
    </section>
  );
}

export default SearchForm;
