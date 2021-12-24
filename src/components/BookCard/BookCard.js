import style from './BookCard.module.css';
import { Link } from 'react-router-dom';

function BookCard(props) {

    return (
        <div className={style.container}>
            <div className={style.imageContainer}>
                {
                    props.details.bookCoverUrl 
                    ? <img className={style.image} src={props.details.bookCoverUrl}></img>
                    : <img className={style.image} src="https://cdn.picpng.com/book/book-view-30965.png" />
                }
                
                
            </div>
            {props.details.title.length > 25
                ? <div>Title: {props.details.title.slice(0, 25)} ...</div>
                : <p>Title: {props.details.title}</p>}
            <Link to={`/bookDetails/${props.details.id}`} className={style.detailsBtn} details={props.details} >Details</Link>
        </div>
    )
}

export default BookCard;