import React, { useState, useEffect } from "react";
import { createPeli, getPeli, updatePeli } from "../services/peli-services";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function PeliForm() {

    const [errors, setErrors] = useState([]);
    const [peli, setPeli] = useState({
        name: '',
        yourname: '',
        rating: 0,
        review: '',
        
    });
    const { id } = useParams();
    const navigate = useNavigate();

    const getOnePeli = async () => {
        try {
            const peliFromService = await getPeli(id);
            setPeli({ ...peliFromService.data.peli});
        } catch(err) {
            console.log("Errorr", err);
        }
    }

    useEffect(() => {
        console.log("Peli", peli)
        id && getOnePeli();
    }, [id])

    useEffect(() => {
        console.log("Peli", peli)

    }, [peli])

    const addPeli = async (values) => {
        console.log("datos desde el formik", values)
        const createPeliInService = !id ? await createPeli(values) : await updatePeli(id, values);        
            if (createPeliInService.data.message ==="" || createPeliInService.data.message ===" ") {
                alert("Se ha creado la pelicula")
                navigate("/");               
                }else {
                    const errorResponse = createPeliInService.data.errors;
                    const errorArr = [];
                for (const llave of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[llave].message);
                }
                setErrors(errorArr);
                }        
    }

    const backtoHome = () => {
        navigate(`/`)
    }

    const peliSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, "El nombre de la pelicula no puede tener menos de 2 caracteres")
            .required("Este campo es obligatorio"),

        yourname: Yup.string()
            .min(3, "Su nombre debe tener al menos 3 caracteres")
            .max(15, "Su nombre no puede superar los 15 caracteres")
            .required("Este campo es obligatorio"),

        rating: Yup.number()
            .required("Este campo es obligatorio")
            .max(5, "No puede tener más de 5 estrellas")
            .min(0, "No puede tener menos de 0 estrellas"),


        review: Yup.string()
            .min(3, "La review no debe tener menos de 3 caracteres")
            .required("Este campo es obligatorio"),

});



return (
    <div className="form-login">
        {errors?.map((error, index) => <p key={index}>{error}</p>)}
            <Formik
                enableReinitialize
                initialValues={peli}
                validationSchema={peliSchema}
                onSubmit={(values) => addPeli(values)}
            >
                {({ errors, touched }) => (
                    <Form className="form-group">
                        <div>
                            <label htmlFor='name' className="col-form-label">Nombre de la pelicula </label>
                            <Field type='text' name='name' className={`form-control`} />
                            {errors.name && touched.name ? <p>{errors.name}</p> : null}
                        </div>

                        <div>
                            <label htmlFor='yourname' className="col-form-label">Su Nombre </label>
                            <Field type='text' name='yourname' className={`form-control`}/>
                            {errors.yourname && touched.yourname ? <p>{errors.yourname}</p> : null}
                        </div>

                        <div>
                            <label htmlFor='rating' className="col-form-label">Rating </label>
                            <Field type='text' name='rating' as="select" className={`form-control`}>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Field>
                            {errors.origin && touched.origin ? <p>{errors.origin}</p> : null}
                        </div>    

                        <div>
                            <label htmlFor='review' className="col-form-label" >Agrega tu review</label>
                            <Field type='text' name='review' className={`form-control`}/>
                            {errors.review && touched.review ? <p>{errors.review}</p> : null}
                        </div>

                        <div>
                            <button type='submit' disabled={Object.values(errors).length>0 || Object.values(touched).length===0}>Agregar</button>
                            <button onClick={() => backtoHome()} >Cancelar</button>
                        </div>


                    </Form>
                )}

            </Formik>
        </div>
)
}

export default PeliForm