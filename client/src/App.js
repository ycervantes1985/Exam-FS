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
      
        <Routes>
          
          <Route path="/" element={<div className="container"><div className="container-register"><Register /></div><div className="container-login"><Login /></div></div>}></Route>   
          <Route path="/home" element={<div><Main /></div>}></Route>       
          <Route path='crear-peli' element={<div className="container-peli"><PeliForm/></div>} />
          <Route path='list-reviews/:id' element={<DetailReviews></DetailReviews>} />
          <Route path='update-peli/:id' element={<PeliForm />} />
          <Route path='agregar-review/:id' element={<CommentForm />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
