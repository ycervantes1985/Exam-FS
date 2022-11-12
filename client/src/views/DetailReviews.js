import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import { getCommentsFP } from "../services/peli-services";
import {useUser} from "../contexts/userContext"
import { useParams } from 'react-router-dom';
import { getAllPelis,getPeli, deletePeli } from "../services/peli-services";
import Button from 'react-bootstrap/Button';
import logout from '../services/logout';

function Details() {

    const { id } = useParams();
    
    const [pelis, setPelis] = useState([]); 
    const [peli, setPeli] = useState(); 
    const [comments, setComments] = useState([]);    
    const navigate = useNavigate();   
    const {user,setUser} = useUser(); 

    const getComments = async () => {
        try {
            const commentsFromService = await getCommentsFP(id);   
            console.log("este es el comentario que necesito",commentsFromService)         
            setComments(commentsFromService.data.comments);
            } catch(err) {           

        }
    };

    const getPelisFromService = async () => {
        try {
            const pelisFromService = await getAllPelis();
            setPelis(pelisFromService.data.pelis);
            setPeli(pelisFromService.data.pelis.filter(peli=>peli._id === id))
        } catch(err) {
            console.log("Error:", err)
    
        }
    };

    const delPelicula = async (id) => {
        try {
            
            const peliculaBorrada = await deletePeli(id);
            setPelis(pelis.filter(peli=>peli._id !== id))            
            navigate(`/`)
            } catch(err) {
                console.log("Error:", err)
            }
    };

    useEffect(() => {
        getComments();
        getPelisFromService();        
    }, []);

    let names = ""
    if(peli){
         names = peli[0]?.name;
    }


    const logOut = async() => {
        const {success} = await logout();
        navigate(`/`)
        if(success) setUser(null)
        
        else window.alert("Error. No se pude desloguear")
    }
    

   return (
    <div className="container-reviews">
        <h3>{"Reviews for "+names}</h3>
        <Button className="logout-button" variant="warning" onClick={logOut}>LOGOUT</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>REVIEWER</th>
                        <th>REVIEW</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        comments?.map(comment => (
                            <tr key={comment._id}>
                                <td>{comment.yourname}</td>
                                <td>{comment.review}</td>
                                <td>{comment.rating}</td>
                            </tr>
                        ))
                    }
                    
                </tbody>
            </Table>
            <Button variant="danger" className="action-btn" onClick={() => delPelicula(id)}>Delete Movie</Button>

    </div>
  )
}

export default Details