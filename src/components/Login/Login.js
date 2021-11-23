import style from './Login.module.css';

function Login() {
    return (
        <div className={style.loginContainer}>
            <form className={style.login}>
                <h2 className={style.loginTitle}>Login to your account</h2>
                <label className={style.label}>
                    <i style={{ color: "white", marginRight: 10 }} className="fas fa-user login-icon" ></i>
                    <input type="text" name="email" id="email" className={style.input} placeholder="Type your E-mail" autoFocus />
                </label>
                <label className={style.label}>
                    <i style={{ color: "white", marginRight: 10 }} className="fas fa-key login-icon" ></i>
                    <input name="password" id="password" type="password" className={style.input} placeholder="Type your Password" />
                </label>
                <input type="submit" value="Login" className={style.button}></input>
            </form>
        </div>
    )
}

export default Login;