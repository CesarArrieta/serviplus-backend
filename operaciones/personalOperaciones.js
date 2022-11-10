const personalModelo = require("../modelos/PersonalModelo");
const personalOperaciones = {}

personalOperaciones.crearPersonal = async (req, res)=>{
    try {
        const objeto = req.body;
        const personal = new personalModelo(objeto);
        const personalGuardado = await personal.save();
        res.status(201).send(personalGuardado);
    } catch (error) {
        res.status(400).send("Mala petición. "+error);
    }
}

personalOperaciones.buscarPersonal = async(req, res)=>{
    try { 
        const filtro = req.query;
        let listapersonal;
        if (filtro.q != null) {
            listapersonal = await personalModelo.find({
                "$or" : [ 
                    { "nombres": { $regex:filtro.q, $options:"i" }},
                    { "apellidos": { $regex:filtro.q, $options:"i" }},
            
                ]
            });
        }

        else{
            listapersonal = await personalModelo.find();
        }
        
        if (listapersonal.length > 0){
            res.status(200).send(listapersonal);
        } else{
            res.status(404).send("no hay datos");
        }
    } catch (error) {
            res.status(400).send("Mala petición." + error);
    }
}


personalOperaciones.buscarAgente = async(req, res)=>{
    try { 
        const id = req.params.id;
        const agente = await personalModelo.findById(id);
        if (agente != null){
            res.status(200).send(agente);
        } else{
            res.status(404).send("no hay datos");
        }
    } catch (error) {
            res.status(400).send("Mala petición." + error);
    }
}
    

personalOperaciones.modificarPersonal = async (req, res)=>{

    try {
        const id = req.params.id;
        const body = req.body;
        const datosActualizar = {
            nombres: body.nombres,
            apellidos: body.apellidos,
            telefono: body.telefono,
            password: body.password,
        }
        const personalActualizado = await personalModelo.findByIdAndUpdate(id, datosActualizar, { new : true });
        if (personalActualizado != null) {
            res.status(200).send(personalActualizado);
        }
        else {
            res.status(404).send("No hay datos");
        }
    } catch (error) {
        res.status(400).send("Mala petición. " +error);
    }
}

personalOperaciones.eliminarPersonal = async (req, res)=>{

        try {
            const id = req.params.id;
            const agente = await personalModelo.findByIdAndDelete(id);
            if (agente != null){
                res.status(200).send(agente);
            } else {
                res.status(404).send("No hay datos");
            }
        } catch (error) {
            res.status(400).send("Mala petición. " + error);
        }
    }
    

module.exports = personalOperaciones;