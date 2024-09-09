import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Nav from './components/Nav/Nav';
import Body from './components/Body/Body';
import Nav2 from './components/Nav2/Nav2';
import { Report } from './components/Report/Report';
import Footer from './components/Footer/Footer'
function App() {
    return ( 
        <div>
        <Nav/>
        <Nav2/>
        <Body/>
        <Report/>
        <Footer/>
      </div>
    );
}

export default App;