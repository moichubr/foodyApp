const validate = (input) => {
  let errors = {};

  if (!input.nombre) {
    errors.nombre = "Name/Title required.";
  } else if (input.nombre.length < 3) {
    errors.nombre = "Should have 3 letters, at least.";
  } else if (input.nombre.length > 50) {
    errors.nombre = "Name/Title too long.";
  }
 

  if (!input.resumen) {
    errors.resumen = "Required.";
  } else if (input.resumen.length < 20) {
    errors.resumen = "Write a little more.";
  } 
 

  if (!input.instrucciones) {
    errors.instrucciones = "Required.";
  } else if (input.instrucciones.length < 30) {
    errors.instrucciones = "Write a little more.";
  } 
 

  if (!input.imagen) {
    errors.imagen = "Choose an image.";
  }
 
  
  return errors
};

export default validate;
