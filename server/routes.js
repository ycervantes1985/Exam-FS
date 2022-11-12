const UserController = require("./controllers/user.controller")
const {getCommentsFromPeli, addPeli, getAllPelis, deletePeli, updatePeli, getOnePeli, addPeliReview } = require("./controllers/pelis.controllers");
const authenticate = require("./config/authenticate")

module.exports = function(app){

    app.post("/api/register",UserController.Register);
    app.post("/api/login",UserController.Login);
    app.post("/api/logout",UserController.Logout);

    //Rutas de Peliculas
    app.post('/api/peli', addPeli);
    app.get('/api/peli', getAllPelis);
    app.get('/api/peli/:id', getOnePeli)
    app.delete('/api/peli/:id', deletePeli);
    app.put('/api/peli/:id', updatePeli)
    app.post('/api/peli/review/:id', addPeliReview)
    app.get('/api/peli/review/:id', getCommentsFromPeli)

    //ENDPOINTS QUE NECESITAN AUTENTICACION
    app.get("/api/users",authenticate, UserController.getAll);
    app.get("/api/user/:id",authenticate,UserController.getUser)
}