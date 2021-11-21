import style from './BookCard.module.css'

function BookCard() {
    return (
        <div className={style.container}>
            <div className={style.imageContainer}>
                <img className={style.image} src="https://cdn.picpng.com/book/book-view-30965.png"></img>
            </div>
            <button className={style.detailsBtn}>Details</button>
        </div>
    )
}

export default BookCard;