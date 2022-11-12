import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPelis, deletePeli } from "../services/peli-services";
import Table from 'react-bootstrap/Table';
import { UserProvider } from "../contexts/userContext";
import Button from 'react-bootstrap/Button';


const Detail = () => {

    const [pelis, setPelis] = useState([]);    
  const navigate = useNavigate();

  const getPelisFromService = async () => {
    try {
        const pelisFromService = await getAllPelis();
        console.log(pelisFromService)
        setPelis(pelisFromService.data.pelis);
    } catch(err) {
        console.log("Error:", err)

    }
};

useEffect(() => {
    getPelisFromService();
}, []);

useEffect(() => {

}, [pelis]);


const goToForm = (id) => {
    navigate(`/update-peli/${id}`)
}

const listReviews = (id) =>{
    navigate(`/list-reviews/${id}`)
}

const redirectToAddPeliReview = id => navigate(`/agregar-review/${id}`)

    return (
        <div>
            <UserProvider>
            <h3 className="movie-list">Movie List</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>NOMBRE DE LA PELICULA</th>
                        <th>RATING</th>
                        <th>ACCIONES</th>
                    </tr>
                </thead>
                <tbody>
                    {
                            pelis?.map(peli => (
                            <tr key={peli._id}>
                                <td>{peli.name}</td>
                                <td>{peli.avg ? parseFloat(peli.avg.toFixed(2)) : 0}</td>
                                <td>
                                    <Button variant="danger" className="action-btn" onClick={() => listReviews(peli._id)} >Read Review</Button>
                                    <Button variant="info" className="action-btn" onClick={() => goToForm(peli._id)} >Editar</Button>
                                    <Button variant="success" className="action-btn" onClick={() => redirectToAddPeliReview(peli._id)} >Add a Review</Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            </UserProvider>
        </div>
    );
}

export default Detail;
