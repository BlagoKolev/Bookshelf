import './App.css';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import Main from './components/Main/Main.js';
import { AuthProvider } from './Context/Context.js'

function App() {

  return (
    <AuthProvider className="App">
      <Header />
      <Main />
      <Footer />
    </AuthProvider>
  );
}

export default App;
