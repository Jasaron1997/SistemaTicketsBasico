import gql from 'graphql-tag';

export const CREATEESTADO = gql`
	mutation CreateEstado($input: EstadosInput) {
  CreateEstado(input: $input) {
    id
    Nombre
    Descripcion
    Color
    Eliminado
  }
}
`;
