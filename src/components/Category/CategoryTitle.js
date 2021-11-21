import style from './CategoryTitle.module.css';

function CategoryTitle(props) {
    return (
        <h3 className={style.categoryTitle}>{props.children}</h3>
    )
}

export default CategoryTitle;