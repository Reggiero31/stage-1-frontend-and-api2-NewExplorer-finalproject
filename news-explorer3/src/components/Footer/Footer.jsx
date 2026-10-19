import "./Footer.css";
import github from "../../assets/images/Github.svg";
import LinkedIn from "../../assets/images/LinkedIn.svg";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">© 2026 News Explorer</p>
      <div className="footer__links">
        <div className="footer__page-links">
          <a className="footer__link" href="/">
            Home
          </a>
          <a className="footer__link" href="https://www.tripleten.com">
            TripleTen
          </a>
        </div>
        <img src={github} alt="github" className="footer__icon" />
        <img src={LinkedIn} alt="LinkedIn" className="footer__icon" />
      </div>
    </footer>
  );
}

export default Footer;
