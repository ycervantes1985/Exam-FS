const Peli = require("../models/pelis.model")
const Comment = require("../models/comments.model")

module.exports.addPeli = async (req, res) => {
    console.log("Esto es el body",req)   
    const {yourname, review, rating}= req.body
        const reviwss = [yourname, review, rating]
        req.body.comments={
                    yourname,
                    review,
                    rating

        }  
    try {      
        
            
        const newPeli = await Peli.create(req.body);  
        const average = await Peli.updateMany({}, [{$set: {avg: {$avg: "$comments.rating"}}}])
             
        
        res.json({ 
            message: "",
            peli: newPeli
        });
        
    } catch (error) {
        res.status(500).json({ 
            message: 'Ups no hemos podido crear la pelicula',
            error:error
        })
        
    }
        
}

module.exports.getAllPelis = async (req, res) => {
    try {
        const pelis = await Peli.find()           
        res.json({ 
            message: 'Se han traído de manera exitosa las peliculas',
            pelis
        })

    } catch(err) {
        res.status(500).json({ 
            message: 'No hemos conseguido las pelis',
            err
        })
    }
}

module.exports.deletePeli = async (req, res) => {
    try {
        const { id } = req.params;

        await Peli.deleteOne({ _id: id });
        res.json({ 
            message: 'Se ha eliminado la peli'
        })

    } catch(err) {
        res.status(500).json({ 
            message: 'Ups no hemos podido eliminar la peli',
            err
        })
    };
}

module.exports.updatePeli = async (req, res) => {
    try {
        const { id } = req.params;
        
        const peliUpdated = await Peli.findByIdAndUpdate(id, req.body, { new: true });           
        res.json({ 
            message: "",
            peli: peliUpdated
        })


    } catch(err) {
        res.status(500).json({ 
            message: 'Ups no hemos podido actualizar la pelicula',
            err
        });
    };
}

module.exports.getOnePeli = async (req, res) => {
    try {
        const { id } = req.params;

        const peli = await Peli.findById(id);
        res.json({ 
            message: 'Se ha conseguido la peli',
            peli
        });

    } catch(err) {
        res.status(404).json({ 
            message: 'Ups no hemos podido conseguir la peli',
            err
        });
    }
}

module.exports.addPeliReview = async (req, res) => {
    try {
        const { id } = req.params;
        const peliUpdated = await Peli.findByIdAndUpdate(id, {
            $push: {
                comments: req.body,                
            }
        }, { new: true });

        const average = await Peli.updateMany({}, [{$set: {avg: {$avg: "$comments.rating"}}}])

        res.json({ message: "", peli:peliUpdated })


    } catch(err) {
        res.status(500).json({ 
            message: 'Ups no hemos podido actualizar la peli',
            errors:err.errors
        });
    }
}

module.exports.getCommentsFromPeli = async (req, res) =>{
    try {
        const { id } = req.params;
        const peli = await Peli.findById(id).populate("comments").exec();
        console.log(peli.comments)
        res.json({ 
            message: 'Se ha conseguido las reviews',
            comments: peli.comments
        });

    } catch(err) {
        res.status(404).json({ 
            message: 'Ups no hemos podido conseguir las reviews',
            err
        });
    }
}