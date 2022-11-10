const mongoose = require("mongoose");

const username = "admin";
const password = "admin";
const database = "ServiplusBD";

const URI = "mongodb://"+username+":"+password+"@ac-djrcsyn-shard-00-00.p0exsn4.mongodb.net:27017,ac-djrcsyn-shard-00-01.p0exsn4.mongodb.net:27017,ac-djrcsyn-shard-00-02.p0exsn4.mongodb.net:27017/"+database+"?ssl=true&replicaSet=atlas-tbe3pb-shard-0&authSource=admin&retryWrites=true&w=majority";
/*"mongodb+srv://"+username+":"+password+"@cluster0.p0exsn4.mongodb.net/"+database+"?retryWrites=true&w=majority";*/
const conectar = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Atlas está en linea");
    } catch (error) {
        console.log("Error de conexión. "+error);
    }
    /*
    mongoose.connect(URI)
        .then(()=>{ console.log("Atlas está en linea"); })
        .catch(()=>{ console.log("Error de conexión. "+error); })
    */
}
conectar();

module.exports = mongoose;