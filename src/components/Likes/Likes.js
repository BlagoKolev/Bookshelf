import style from './Likes.module.css';

function Likes({ likes, unlikes, book }) {

    console.log(book)
    return (
        <div className={style.likesContainer}>
            <button type="submit" className={style.likeBtn} onClick={console.log('aaaaa')}>
               {likes} <i className="far fa-thumbs-up fa-3x"></i>
            </button>
            <button className={style.unlikeBtn}>
               {unlikes} <i className="far fa-thumbs-down  fa-3x" ></i>
            </button>
        </div>
    );
};

export default Likes;