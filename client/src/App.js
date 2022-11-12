import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Main from "./views/Main";
import Login from "./views/Login";
import Register from "./views/Register";
import { UserProvider } from "./contexts/userContext";
import PeliForm from "./components/PeliForm";
import CommentForm from "./components/CommentForm";
import DetailReviews from "./views/DetailReviews";

function App() {

  return (
    <div className="App">
      <UserProvider>
      <nav className='nav-container'>
        <div className='logo'>
          <img className='remove-bg' src='data:image/jpeg;base64,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'></img>
          <p>MIS PELIS</p>
        </div>        
        <ul className='nav justify-content-end'>
          <li className='nav-item'>
            <Link className='nav-link' to={"/"}>HOME</Link>
          </li>          
          <li className='nav-item'>
            <Link className='nav-link' to={"/register"}>REGISTRO</Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to={"/login"}>LOGIN</Link>
          </li>
        </ul>
      </nav>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path='crear-peli' element={<PeliForm/>} />
          <Route path='list-reviews/:id' element={<DetailReviews></DetailReviews>} />
          <Route path='update-peli/:id' element={<PeliForm />} />
          <Route path='agregar-review/:id' element={<CommentForm />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
