import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { addCommentToPeli } from '../services/peli-services';
import { useNavigate } from "react-router-dom";

const CommentForm = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const [comment, setComment] = useState({
        review: '',
        yourname:'',
        rating: 0
    })
    const { id } = useParams();
    
    const commentSchema = Yup.object().shape({
        yourname: Yup.string()
            .min(5, "El nombre no debe tener menos de 5 caracteres")
            .required("Este campo es obligatorio"),
        review: Yup.string()
            .min(3, "La review no debe tener menos de 3 caracteres")
            .required("Este campo es obligatorio"),

        rating: Yup.number()
            .required("Este campo es obligatorio")
            .max(5, "No puede tener más de 5 estrellas")
            .min(0, "No puede tener menos de 0 estrellas"),

    });

    const addComment = async (values) => {
            const updatedPeli = await addCommentToPeli(id, values)
            if (updatedPeli.data.message === "") {
                alert("Se agrego la Review")
                navigate("/");               
                } else {
                    console.log("ERRORES", updatedPeli.data);
                    const errorResponse = updatedPeli.data.errors;
                    console.log("Object keys", Object.keys(errorResponse));
                    const errorArr = [];
                for (const llave of Object.keys(errorResponse)) {
                    console.log(errorResponse[llave]);
                    errorArr.push(errorResponse[llave].message);
                }
                setErrors(errorArr);
                }        
    }

    const backtoHome = () => {
        navigate(`/`)
    }

    return (
        <div className="card">
            {errors?.map((error, index) => <p key={index}>{error}</p>)}
            <Formik
                enableReinitialize
                initialValues={comment}
                validationSchema={commentSchema}
                onSubmit={(values) => addComment(values)}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div>
                            <label htmlFor='yourname' className="col-form-label">Tu Nombre</label>
                            <Field type='text' name='yourname' className={`form-control`}/>
                            {errors.yourname && touched.yourname ? <p>{errors.yourname}</p> : null}
                        </div>
                        <div>
                            <label htmlFor='review' className="col-form-label">Agrega tu review</label>
                            <Field type='text' name='review' className={`form-control`}/>
                            {errors.review && touched.review ? <p>{errors.review}</p> : null}
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
                            <button type='submit' disabled={Object.values(errors).length>0 || Object.values(touched).length===0} >Agregar</button>
                            <button onClick={() => backtoHome()} >Cancelar</button>
                        </div>
                    </Form>
                )}

            </Formik>
        </div>
    )
}

export default CommentForm;