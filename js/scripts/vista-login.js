function iniciarSesion(form) {
  var email = form.$inputs.email.val();
  var pass = form.$inputs.pass.val();
  if (usuarios.login(email, pass)) {
    navegacion.ir('inicio');
  } else {
    form.notificar([
      'Los datos ingresados no coinciden con ningún usuario registrado',
    ]);
  }
}

/**
 * Se instancia un objeto de tipo Form que representa al formulario de log in
 */
var loginForm = new Form(
  'login', // id del <form>
  ['email', 'pass'], // valores del atributo "name" en los inputs
  {
    // funciones de validación para cada campo. Reciben su valor como parámetro y retornan mensajes de error
    email: function(valor) {
      if (!valor) return 'Debes ingresar tu correo electrónico';
    },
    pass: function(valor) {
      if (!valor) return 'Debes ingresar tu contraseña';
    },
  },
  iniciarSesion // funcion que se ejecuta cuando se envía el form y todas las validaciones pasaron
);
