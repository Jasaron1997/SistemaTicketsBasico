import mongoose from 'mongoose';
import { rejects } from 'assert';
import { personales,estados } from '../Conexion/db';
const ObjectId = mongoose.Types.ObjectId;

export const types = {
	Tickets: {
		Reportado: async ({ Reportado }) => {
			let ids;
			let ReportadoDate;

			try {
				ids = Reportado ? Reportado.map((Reportados) => ObjectId(Reportados.id)) : [];
				ReportadoDate = ids.length > 0 ? await personales.find({ _id: { $in: ids } }) : [];
			} catch (error) {
				console.error(error);
			}

			return ReportadoDate;
		},
		Realizado: async ({ Realizado }) => {
			let ids;
			let RealizadoDate;

			try {
				ids = Realizado ? Realizado.map((Realizados) => ObjectId(Realizados.id)) : [];
				RealizadoDate = ids.length > 0 ? await personales.find({ _id: { $in: ids } }) : [];
			} catch (error) {
				console.error(error);
			}

			return RealizadoDate;
    },
    Estado: async ({ Estado }) => {
			let ids;
			let EstadoDate;

			try {
				ids = Estado ? Estado.map((Estados) => ObjectId(Estados.id)) : [];
				EstadoDate = ids.length > 0 ? await estados.find({ _id: { $in: ids } }) : [];
			} catch (error) {
				console.error(error);
			}

			return EstadoDate;
		},
	}
};
