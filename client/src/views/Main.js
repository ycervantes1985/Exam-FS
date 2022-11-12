import React from 'react';
import {useUser} from "../contexts/userContext"
import { useNavigate } from 'react-router-dom';
import logout from '../services/logout';
import Detail from './Detail';
import Button from 'react-bootstrap/Button';


const Main = () => {

    const {user,setUser} = useUser();
    const navigate = useNavigate();

    const renderInfo=()=>{
        if(user){
            return (<div className='user-log'></div>)
        }else{
            return(<div className='user-log'></div>)
        }
    }

    const logOut = async() => {
        const {success} = await logout();
        navigate(`/`)
        if(success) setUser(null)
        
        else window.alert("Error. No se pude desloguear")
    }

    const createMovie = () => {
        navigate(`/crear-peli/`)
    }


    return (
        <div>
            <h2>{renderInfo()} </h2>
            {user && <Button className="logout-button" variant="warning" onClick={logOut}>LOGOUT</Button>}
            {user && <Button className="create-button" variant="success" onClick={createMovie}>Add a New Movie</Button>}
            {user && <Detail></Detail> }
        </div>
    );
}

export default Main;
