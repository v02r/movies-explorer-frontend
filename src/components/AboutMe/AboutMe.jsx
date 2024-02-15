import {forwardRef} from "react";
import foto from "../../images/profile.jpeg";

const AboutMe = forwardRef((props, ref) => {
    return (
        <section className="about" id="student" ref={ref}>
            <h2 className="about__header text_subtitle underline-about">Студент</h2>
            <div className="about__info">
                <div className="about__info-description">
                    <h3 className="about__info-title text_title">Валерий</h3>
                    <p className="about__info-subtitle">Фронтенд-разработчик, 41 год</p>
                    <p className="about__info-description">
                        Я из Рязани, закончил МГУКИ по направлению реклама и PR. Женат, дочка учится в
                        четвертом классе. Работаю в региональном банке, веду два проекта: развитие корпоративного сайта
                        и внедрение CRM. По работе много приходится общаться с разработчиками, поэтому пошел на курс в
                        Яндекс Практикум.
                    </p>
                    <ul className="about__links">
                        <li>
                            <a href="https://github.com/v02r" className="link" target="_blank"
                               rel="noreferrer">
                                GitHub
                            </a>
                        </li>
                    </ul>
                </div>
                <img className="about__info-image" src={foto} alt="Фотография студента"/>
            </div>
        </section>
    );
});

export default AboutMe;
