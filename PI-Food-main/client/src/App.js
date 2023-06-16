import './App.css';
import {Route, Routes, useLocation } from 'react-router-dom'
import LandingPage from './Views/LandingPage/LandingPage';
import Home from './Views/Home/Home'
import Details from './Views/Details/Details'
import About from './Views/About/About'
// import ErrorPage from './Views/ErrorPage/ErrorPage'
import NavBar from './Components/NavBar/NavBar'
import Form from './Views/Form/Form';



function App() {
  const location = useLocation()


  return (
    <div className="App">
      {location.pathname !== "/" && (
        <NavBar />
      )}

      <Routes>
        <Route path= '/' element= {<LandingPage/>} />
        <Route path= '/home' element= {<Home />} />
        <Route path= '/details/:id' element= {<Details />} />
        <Route path= '/about' element={<About />} />
        <Route path= '/form' element={<Form />} />
        {/* <Route path= '*' element= {<ErrorPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
