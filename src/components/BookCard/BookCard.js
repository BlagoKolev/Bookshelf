import style from './BookCard.module.css'

function BookCard({ title, image }) {

    return (
        <div className={style.container}>
            <div className={style.imageContainer}>
                <img className={style.image} src={image}></img>
                {/* <img className={style.image} src="https://cdn.picpng.com/book/book-view-30965. */}
            </div>
            <p>Title: {title}</p>
            <button className={style.detailsBtn}>Details</button>
        </div>
    )
}

export default BookCard;