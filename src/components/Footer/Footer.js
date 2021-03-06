import style from './Footer.module.css';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className={style.footer}>
            <h3 className={style.footerLogo}>
                <Link to="/" className={style.footerLogoLink}>BookShelf</Link>
            </h3>
            <p className={style.reactFooter}>Powered by   <i className="fab fa-react fa-2x"></i></p>
            <p className={style.footerRights}>All Rights Reserved &copy;</p>
        </footer>
    )
}

export default Footer;