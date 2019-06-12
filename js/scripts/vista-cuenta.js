navegacion.registrarVista({
  id: 'cuenta',
  label: 'Cuenta',
  configurar: function() {
    cambiarPassForm.reset();
  },
  condicion: function(usuario) {
    return usuario && !usuario.esAdmin;
  },
});

function cambiarPass(form) {
  var pass = form.obtenerValor('nueva_pass');
  var usuario = usuarios.usuarioActual;

  // mutamos la referencia del objeto Usuario en el registro directamente
  usuario.pass = pass;

  form.notificar(['Contraseña actualizada exitosamente'], true);
}

/**
 * Se instancia un objeto de tipo Form que representa al formulario de log in
 */
var cambiarPassForm = new Form(
  'cambiar-pass', // id del <form>
  ['nueva_pass', 'confirm_nueva_pass'], // valores del atributo "name" en los inputs
  {
    nueva_pass: function(valor) {
      // reusamos la lógica del formulario de registro
      // lo ideal sería tenerla en un módulo a parte y traerla de ahí
      var error = registroForm.validaciones.pass(valor);
      if (error) return error;
      if (valor === usuarios.usuarioActual.pass)
        return 'Debes introducir una contraseña diferente a la actual';
    },
    confirm_nueva_pass: function(valor) {
      if (valor !== cambiarPassForm.obtenerValor('nueva_pass')) {
        return 'Las contraseñas no coinciden';
      }
    },
  },
  cambiarPass // funcion que se ejecuta cuando se envía el form y todas las validaciones pasaron
);
