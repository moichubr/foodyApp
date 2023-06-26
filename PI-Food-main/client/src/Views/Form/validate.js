const validate = (input) => {
  let errors = {};

  if (!input.nombre) {
    errors.nombre = "La receta debe tener un nombre";
  } else if (input.nombre.length < 3) {
    errors.nombre = "Debe tener 3 o mas letras.";
  } else if (input.nombre.length > 50) {
    errors.nombre = "El nombre es muy largo.";
  }
 

  if (!input.resumen) {
    errors.resumen = "Campo requerido.";
  } else if (input.resumen.length < 20) {
    errors.resumen = "Escribe un poco mas.";
  } 
 

  if (!input.instrucciones) {
    errors.instrucciones = "Campo requerido.";
  } else if (input.instrucciones.length < 30) {
    errors.instrucciones = "Escribe un poco mas.";
  } 
 

  if (!input.imagen) {
    errors.imagen = "Debes cargar una imagen.";
  }
 
  
  return errors
};

export default validate;
