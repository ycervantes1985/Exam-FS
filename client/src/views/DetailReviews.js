import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import { getCommentsFP } from "../services/peli-services";
import { useParams } from 'react-router-dom';
import { getAllPelis,getPeli, deletePeli } from "../services/peli-services";
import Button from 'react-bootstrap/Button';

function Details() {

    const { id } = useParams();
    
    const [pelis, setPelis] = useState([]); 
    const [peli, setPeli] = useState(); 
    const [comments, setComments] = useState([]);    
    const navigate = useNavigate();    

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
    

   return (
    <div>
        <h3>{"Reviews for "+names}</h3>
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
            <Button variant="danger" className="action-btn" onClick={() => delPelicula(id)} >Eliminar</Button>

    </div>
  )
}

export default Details