import "./About.css";
import  avatarImage from "../../assets/images/football bighit.jpg";
function About() {
  return (
    <section className="about" aria-label="About the author">
      <img className="about__avatar" src={avatarImage} alt="Author's avatar" />
      <div className="about__text-container">
      <h2 className="about__title">About the author</h2>
      <p className="about__text">
        This section can later describe the author’s background and expertise.
        Hello everyone I am Reggie, a passionate web developer with a unique
        interest in creating intuitive and user-friendly web applications. I
        have experience in front-end development, working with technologies such
        as React, JavaScript, HTML, and CSS,Node.js,Python. My goal is to build responsive and
        accessible websites that provide a seamless user experience. In my free
        time, I enjoy exploring new web technologies and contributing to
        open-source projects.
      </p>
      </div>
    </section>
  );
}

export default About;
