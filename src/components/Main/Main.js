import { Route } from 'react-router-dom';
import Home from '../Home/Home.js'

function Main() {
    return (
        <div>
            {/* <Home /> */}
            
                <Route path="/" component={Home} />
           
        </div>
    )
}

export default Main;