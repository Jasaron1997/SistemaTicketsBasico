import mongoose from 'mongoose';
import {personales,estados,tickets,dependencias} from '../Conexion/db';
import { rejects } from 'assert';
import bcrypt from 'bcrypt';
const ObjectId=mongoose.Types.ObjectId;

//Generando token
import dotenv from 'dotenv';
dotenv.config({ path: 'variables.env' });

import jwt from 'jsonwebtoken';

const crearToken = (usuarioLogin, secreto, expiresIn) => {
	const { Usuario } = usuarioLogin;
	return jwt.sign({ Usuario }, secreto, { expiresIn });
};

export const	Mutation={

	CreateTickets:async (root, { input }) => {

		const count = await tickets.count({});


		const Save_Data = new tickets({				
				Actividad:input.Actividad,
				Ticket:count+1,
				FechaSolicitud:input.FechaSolicitud,
				FechaIncio:input.FechaIncio,
				Observaciones:input.Observaciones,
				Reportado:input.Reportado,
				Realizado:input.Realizado,
				Estado:input.Estado,
				Finalizado:input.Finalizado
		})

		// return(`El Usuario fue creado con exito`)
		
		Save_Data.id = Save_Data._id;

		return new Promise((resolve, object) => {
			Save_Data.save((error) => {
				if (error) rejects(error);
				else resolve(Save_Data);
			});
		});
	},
	
	UpdateTickets: (root, { input }) => {
		return new Promise((resolve, object) => {
			tickets.findOneAndUpdate({ _id: input.id }, input, { new: true }, (error, data) => {
				if (error) rejects(error);
				else resolve(data);
			});
		});
	},
	DeleteTickets:(root,{id})=>{
		return new Promise((resolve,object)=>{
			// console.log(id)
			tickets.findByIdAndUpdate({_id:id},{"$set":{"Eliminado":1}},(error,data)=>{
				if(error) rejects(error);
				else resolve('Se al eliminado correctamente el Personal')
			})
		}) 
	},

	CreatePersonal:async (root, { input }) => {
		const {Nombre}=input
		const existe = await personales.findOne({ Nombre });

		//  console.log(input)
		if (existe) {
			throw new Error('El Personal ya existe');
		}

		const Save_Data = new personales({				
			Nombre:input.Nombre,
			Dependencia:input.Dependencia,
			RealizarTareas:input.RealizarTareas,
			Eliminado:0
		})

		// return(`El Usuario fue creado con exito`)
		
		Save_Data.id = Save_Data._id;

		return new Promise((resolve, object) => {
			Save_Data.save((error) => {
				if (error) rejects(error);
				else resolve(Save_Data);
			});
		});
	},
	
	UpdatePersonal: (root, { input }) => {
		return new Promise((resolve, object) => {
			personales.findByIdAndUpdate({ _id: input.id }, input, { new: true }, (error, data) => {
				if (error) rejects(error);
				else resolve(data);
			});
		});
	},
	DeletePersonal:(root,{id})=>{
		return new Promise((resolve,object)=>{
			// console.log(id)
			personales.findByIdAndUpdate({_id:id},{"$set":{"Eliminado":1}},(error,data)=>{
				if(error) rejects(error);
				else resolve('Se al eliminado correctamente el Personal')
			})
		}) 
	},

	CreateEstado:async (root, { input }) => {
		const {Nombre}=input
		const existe = await estados.findOne({ Nombre });

		//  console.log(input)
		if (existe) {
			throw new Error('El Estado ya existe');
		}

		const Save_Data = new estados({				
			Nombre:input.Nombre,
			Descripcion:input.Descripcion,
			Color:input.Color,
			Eliminado:0
		})

		// return(`El Usuario fue creado con exito`)
		
		Save_Data.id = Save_Data._id;

		return new Promise((resolve, object) => {
			Save_Data.save((error) => {
				if (error) rejects(error);
				else resolve(Save_Data);
			});
		});
	},
	
	UpdateEstado: (root, { input }) => {
		return new Promise((resolve, object) => {
			estados.findByIdAndUpdate({ _id: input.id }, input, { new: true }, (error, data) => {
				if (error) rejects(error);
				else resolve(data);
			});
		});
	},
	DeleteEstado:(root,{id})=>{
		return new Promise((resolve,object)=>{
			// console.log(id)
			estados.findByIdAndUpdate({_id:id},{"$set":{"Eliminado":1}},(error,data)=>{
				if(error) rejects(error);
				else resolve('Se al eliminado correctamente el Estado')
			})
		}) 
	},

	CreateDependencias:async (root, { input }) => {
		const {Nombre}=input
		const existe = await dependencias.findOne({ Nombre });

		//  console.log(input)
		if (existe) {
			throw new Error('El Estado ya existe');
		}

		const Save_Data = new dependencias({				
			Nombre:input.Nombre,
			Eliminado:0
		})

		// return(`El Usuario fue creado con exito`)
		
		Save_Data.id = Save_Data._id;

		return new Promise((resolve, object) => {
			Save_Data.save((error) => {
				if (error) rejects(error);
				else resolve(Save_Data);
			});
		});
	},
	
	UpdateDependencias: (root, { input }) => {
		return new Promise((resolve, object) => {
			dependencias.findByIdAndUpdate({ _id: input.id }, input, { new: true }, (error, data) => {
				if (error) rejects(error);
				else resolve(data);
			});
		});
	},
	DeleteDependencias:(root,{id})=>{
		return new Promise((resolve,object)=>{
			// console.log(id)
			dependencias.findByIdAndUpdate({_id:id},{"$set":{"Eliminado":1}},(error,data)=>{
				if(error) rejects(error);
				else resolve('Se al eliminado correctamente el Estado')
			})
		}) 
	}










};
