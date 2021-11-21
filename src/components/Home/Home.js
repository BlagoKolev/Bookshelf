import style from './Home.module.css';
import Category from '../Category/Category.js';
import CategoryTitle from '../Category/CategoryTitle.js';

function Home() {
    return (
        <section className={style.section}>
        <CategoryTitle>Action and Adventure</CategoryTitle>
        <Category />
        <CategoryTitle>Classics</CategoryTitle>
        <Category />
        <CategoryTitle>Comic Book or Graphic Novel</CategoryTitle>
        <Category />
        <CategoryTitle>Detective and Mystery</CategoryTitle>
        <Category />
        <CategoryTitle>Fantasy</CategoryTitle>
        <Category />
        <CategoryTitle>Science</CategoryTitle>
        <Category />
        <CategoryTitle>Horror</CategoryTitle>
        <Category />
        <CategoryTitle>Literary Fiction</CategoryTitle>
        <Category />
    </section>
    )
}

export default Home;