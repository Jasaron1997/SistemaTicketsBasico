import mongoose from 'mongoose';
import { rejects } from 'assert';
import bcrypt from 'bcrypt';
const ObjectId = mongoose.Types.ObjectId;

import { personales, estados, tickets } from '../Conexion/db';

//Generando token
import dotenv from 'dotenv';
dotenv.config({ path: 'variables.env' });

export const Query = {
	getTickets: (root, {}) => {
		return new Promise((resolve, object) => {
			tickets.find({}, (error, data) => {
				if (error) rejects(error);
				else resolve(data);
			});
		});
	},
	getTicket: (root, { id }) => {
		return new Promise((resolve, object) => {
			tickets.findById({ id }, (error, data) => {
				if (error) rejects(error);
				else resolve(data);
			});
		});
	},
	getPersonales: (root, { tareas }) => {
		return new Promise((resolve, object) => {
			let filters = { Eliminado: 0 };
			if (tareas != null) {
				filters = {
					...filters,
					RealizarTareas: tareas
				};
			}
			personales.find(filters, (error, data) => {
				if (error) rejects(error);
				else resolve(data);
			});
		});
	},
	getPersonal: (root, { id }) => {
		return new Promise((resolve, object) => {
			personales.findById({ id }, (error, data) => {
				if (error) rejects(error);
				else resolve(data);
			});
		});
	},

	// getPersonalReportado:[Personales]
	// getPersonalRealizado:[Personales]

	getEstados: (root, {}) => {
		return new Promise((resolve, object) => {
			estados.find({ Eliminado: 0 }, (error, data) => {
				if (error) rejects(error);
				else resolve(data);
			});
		});
	},
	getEstado: (root, { id }) => {
		return new Promise((resolve, object) => {
			estados.findById({ id }, (error, data) => {
				if (error) rejects(error);
				else resolve(data);
			});
		});
	}
};
