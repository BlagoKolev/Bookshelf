import BookCard from '../BookCard/BookCard.js'
import style from './Category.module.css';

function Category({books}) {

  console.log({books})
    return (
        <article className={style.category}>
           { {books}.books.map(x => <BookCard key={x.id} details={x} /> )}
        </article>
    )
}

export default Category;