import BookCard from '../BookCard/BookCard.js'
import style from './Category.module.css';

function Category() {
    return (
        <article className={style.category}>
            <BookCard />
            <BookCard />
            <BookCard />
            <BookCard />
            <BookCard />
        </article>
    )
}

export default Category;