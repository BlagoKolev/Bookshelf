import Category from '../Category/Category.js';
import style from './Main.module.css';

function Main() {
    return (
        <section className={style.section}>
            <Category />
            <Category />
            <Category />
        </section>
    )
}

export default Main;