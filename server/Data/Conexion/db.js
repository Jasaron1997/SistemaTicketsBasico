import mongoose,{Schema,model} from 'mongoose';
import bcrypt from 'bcrypt';
import { arch } from 'os';


//Variable db[0] mongoServer (Atlas)
const db=['nuebe',
'mongodb://localhost/tickets'];

mongoose.Promise = global.Promise;
mongoose.connect(db[1], { useNewUrlParser: true });

mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);

// mongoose.set('setFindAndModify', false);

// definir el schema de clientes mongoose.Types.ObjectId
//usuarios


const ticketsSchema = new Schema({
	Actividad: String,
	Ticket: Number,
	FechaSolicitud:Date,
	FechaInicio: Date,
    Observaciones: String,
    Reportado: Array,
    Realizado: Array,
    Estado: Array,
    Finalizado: Date

});


const dependenciasSchema = new Schema({
	Nombre: String,
    Eliminado: Number
});

const personalesSchema = new Schema({
	Nombre: String,
	Dependencia: String,
	RealizarTareas:Number,
    Eliminado: Number
});


const estadosSchema=new Schema ({
    Nombre: String,
    Descripcion: String,
	Color: String,
    Eliminado: Number
})


const dependencias  = model('dependencias', dependenciasSchema);
const personales = model('personales', personalesSchema);
 const estados = model('estados', estadosSchema);
 const tickets = model('tickets', ticketsSchema);




export { personales,estados,tickets,dependencias};
