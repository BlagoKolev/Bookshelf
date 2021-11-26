import BookCard from '../BookCard/BookCard.js'
import style from './Category.module.css';

function Category({books}) {

  console.log({books})
    return (
        <article className={style.category}>
           { {books}.books.map(x => <BookCard title={x.title} image={x.image} /> )}
        </article>
    )
}

export default Category;