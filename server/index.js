import express from 'express';
// graphql
import { createServer } from 'http';

import {ApolloServer} from 'apollo-server-express';

import jwt from 'jsonwebtoken';

import {resolvers} from './Data/Resolvers/Resolvers';
import typeDefs from './Data/Schema/master.graphql';


import depthLimit from 'graphql-depth-limit';





const app=express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    validationRules: [depthLimit(10)],
    introspection: true
    // ,context:async ({req})=>{
    //     //obtener el token del servidor
    //     const token=req.headers['authorization'];
       
    //     if(token !=="null"){
    //         try {
    //             // Verificar el token del front end (cliente)
    //             const usuarioActual=await jwt.verify(token,process.env.SECRETO);
    //             // agregamos el usuario actual al request
          
    //             req.usuarioActual=usuarioActual;

    //             return{
    //                 usuarioActual
    //             };
                
    //         } catch (err) {
    //             //  console.log(err);
    //         }

    //     }
    // }
});

const v8 = require('v8');
const totalHeapSize = v8.getHeapStatistics().total_available_size;
const totalHeapSizeGb = (totalHeapSize / 1024 / 1024 / 1024).toFixed(2);
console.log('totalHeapSizeGb: ', totalHeapSizeGb);



const port=4000;
server.applyMiddleware({app});
const httpServer = createServer(app);

// const PORT = process.env.PORT || 5200;

// app.listen({port},()=>console.log(`El servidor esta corriendo http://localhost:${port}${server.graphqlPath}`));

httpServer.listen(
    {
        port: port
    },
    () => console.log(`Listo http://localhost:${port}${server.graphqlPath}`)
);
