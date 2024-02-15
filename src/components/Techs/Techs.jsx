import { forwardRef } from "react";

const Techs = forwardRef((props, ref) => {
  return (
    <section className="techs" ref={ref}>
      <h2 className="techs__header subtitle">Технологии</h2>
      <div className="techs__info">
        <h3 className="techs__title text-title">7 технологий</h3>
        <p className="techs__text">
          На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
        </p>
      </div>
      <ul className="techs__list text">
        <li className="techs__list-item">HTML</li>
        <li className="techs__list-item">CSS</li>
        <li className="techs__list-item">JS</li>
        <li className="techs__list-item">React</li>
        <li className="techs__list-item">Git</li>
        <li className="techs__list-item">Express.js</li>
        <li className="techs__list-item">mongoDB</li>
      </ul>
    </section>
  );
});

export default Techs;
