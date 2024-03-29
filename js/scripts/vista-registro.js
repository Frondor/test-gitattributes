navegacion.registrarVista({
  id: 'registro',
  configurar: function() {
    registroForm.reset();
  },
});

function registrarSocio(form) {
  var nombre = form.obtenerValor('nombre');
  var email = form.obtenerValor('email');
  var pass = form.obtenerValor('pass');
  if (usuarios.crear(nombre, email, pass)) {
    usuarios.login(email, pass);
    navegacion.ir('inicio');
  } else {
    form.notificar(['La dirección de correo electrónico ya está registrada']);
  }
}

/**
 * Se instancia un objeto de tipo Form que representa al formulario de log in
 */
var registroForm = new Form(
  'registro', // id del <form>
  ['nombre', 'email', 'pass'], // valores del atributo "name" en los inputs
  {
    // funciones de validación para cada campo. Reciben su valor como parámetro y retornan mensajes de error
    nombre: function(valor) {
      if (!valor) return 'Debes ingresar tu numbre';
    },
    email: function(valor) {
      if (!valor) return 'Debes ingresar tu correo electrónico';
    },
    pass: function(valor) {
      if (!valor) return 'Debes ingresar tu contraseña';
      var tieneLetra, tieneNumero;
      for (var i = 0; i < valor.length; i++) {
        if (!tieneLetra) tieneLetra = esLetra(valor[i]);
        if (!tieneNumero) tieneNumero = esNumero(valor[i]);
      }
      if (!tieneLetra) return 'La contraseña debe contener al menos 1 letra';
      if (!tieneNumero) return 'La contraseña debe contener al menos 1 número';
    },
  },
  registrarSocio // funcion que se ejecuta cuando se envía el form y todas las validaciones pasaron
);
