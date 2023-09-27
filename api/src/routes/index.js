const { Router } = require('express');
// Import todos los routers;
const pokemonsRouter = require("./routers/pokemonsRouter");
const typesRouter = require("./routers/typesRouter");


const router = Router();
// Configuración de los routers
router.use("/pokemons", pokemonsRouter);
router.use("/types", typesRouter);


module.exports = router;
