const validate = (input) => {
  let errors = {};

  if (!input.nombre) {
    errors.nombre = "La receta debe tener un nombre";
  } else if (input.nombre.length < 3) {
    errors.nombre = "Debe tener 3 o mas letras.";
  } else if (input.nombre.length > 50) {
    errors.nombre = "El nombre es muy largo.";
  }
  // } else {
  //   errors.nombre = "";
  // }

  if (!input.resumen) {
    errors.resumen = "Campo requerido.";
  } else if (input.resumen.length < 20) {
    errors.resumen = "Escribe un poco mas.";
  } 
  // else {
  //   errors.resumen = "";
  // }

  if (!input.healthScore) {
    errors.healthScore = "Debes ingresar un puntaje.";
  } else if (input.healthScore < 0 || input.healthScore > 100) {
    errors.healthScore = "Rango permitido: 0 a 100";
  } 
  // else {
  //   errors.healthScore = "";
  // }

  if (!input.instrucciones) {
    errors.instrucciones = "Campo requerido.";
  } else if (input.instrucciones.length < 30) {
    errors.instrucciones = "Escribe un poco mas.";
  } 
  // else {
  //   errors.instrucciones = "";
  // }

  if (!input.imagen) {
    errors.imagen = "Debes cargar una imagen.";
//   } else if (
//     !/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(input.imagen)
//   ) {
//     errors.imagen = "Formato inválido. Se esperaba una URL.";
  } 
  // else {
  //   errors.imagen = "";
  // }

  if (!input.diets) {
    errors.diets = "Debes seleccionar una opción.";
  } 
  // else {
  //   errors.diets = "";
  // }

  return errors
};

export default validate;
