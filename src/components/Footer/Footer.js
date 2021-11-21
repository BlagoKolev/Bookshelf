import style from './Footer.module.css';

function Footer() {
    return (
        <footer className={style.footer}>
            <h3 className={style.footerLogo}>BookShelf</h3>
            <p className={style.footerRights}>All Rights Reserved &copy;</p>
        </footer>
    )
}

export default Footer;