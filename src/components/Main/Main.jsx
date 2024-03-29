import AboutMe from "../AboutMe/AboutMe";
import AboutProject from "../AboutProject/AboutProject";
import Portfolio from "../Portfolio/Portfolio";
import Promo from "../Promo/Promo";
import Techs from "../Techs/Techs";

import { useRef } from "react";
import NavTab from "../NavTab/NavTab";

function Main() {
  const refs = {
    aboutProject: useRef(null),
    techs: useRef(null),
    student: useRef(null),
  };

  function handleButtonClick(e) {
    const name = e.target.attributes.id.value;
    const element = refs[name].current;
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div className="content">
      <Promo>
        <NavTab handleButtonClick={handleButtonClick} />
      </Promo>
      <AboutProject ref={refs.aboutProject} />
      <Techs ref={refs.techs} />
      <AboutMe ref={refs.student} />
      <Portfolio />
    </div>
  );
}

export default Main;
