import gql from 'graphql-tag';

export const GETPERSONALES = gql`
	query getPersonales($tareas:Int){
    getPersonales(tareas:$tareas) {
     id
     Nombre
     Dependencia
     RealizarTareas
   }
 }
`;
