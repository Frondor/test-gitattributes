/**
 * Esta función nos permite abstraer la lógica que repetiríamos en cada lugar de la app
 * donde necesitemos manejar un formulario.
 * Es un constructor que se encarga de buscar los elementos del DOM y trabajar con ellos
 * a medida que se interactúa con los diferentes controles
 */
function Form(id, campos, validaciones, submit) {
  this.$form = $('#' + id);
  this.$mensajes = this.$form.find('.form-mensajes');
  this.$inputs = {};
  this.validaciones = validaciones;

  // cacheamos los inputs en un objeto indexado por el nombre del campo
  for (var i = 0; i < campos.length; i++) {
    var campo = campos[i];
    this.$inputs[campo] = this.$form.find('input[name=' + campo + ']');
  }

  this.obtenerValor = function(campo) {
    var input = this.$inputs[campo];
    if (input) return input.val();
  };

  /**
   * Este método ejecuta todas las funciones de validación registradas por cada campo
   * y devuelve un array con los mensajes de error resultantes
   */
  this.validar = function() {
    var errores = [];
    if (!this.validaciones) return errores;

    for (var i = 0; i < campos.length; i++) {
      var campo = campos[i];
      var validacion = this.validaciones[campo];
      if (validacion) {
        var valor = this.obtenerValor(campo);
        var error = validacion(valor);
        if (error) errores.push(error);
      }
    }

    return errores;
  };

  this.cerrarMensajes = function() {
    this.$mensajes.hide().empty();
  };

  /**
   * Este método obtiene un array de mensajes, y los muestra dentro del formulario
   * Por defecto como mensajes de error a menos que "exito" sea true
   */
  this.notificar = function(mensajes, exito) {
    this.cerrarMensajes();
    if (!mensajes.length) return;
    if (exito) this.$mensajes.addClass('exito');
    else this.$mensajes.removeClass('exito');

    var $lista = $('<ul>');
    for (var i = 0; i < mensajes.length; i++) {
      var error = $('<li>').text(mensajes[i]);
      $lista.append(error);
    }
    this.$mensajes.html($lista).show();
  };

  this.limpiarCampos = function() {
    for (var i = 0; i < campos.length; i++) {
      var input = this.$inputs[campos[i]];
      if (input) input.val('');
    }
  };

  this.reset = function() {
    this.cerrarMensajes();
    this.limpiarCampos();
  };

  // adjuntamos al evento "submit" del form una función con lógica de validación
  this.$form.submit(
    function(event) {
      event.preventDefault(); // prevenimos que se recargue la página al clickear el botón de submit
      var errores = this.validar(); // ejecutamos las validaciones de todos los campos
      this.notificar(errores); // si vinieron errores los vamos a mostrar en .form-mensajes
      if (!errores.length) submit(this); // de lo contrario, procesamos el formulario
    }.bind(this) // necesario para mantener el contexto de la función cuando el evento "submit" la ejecute
  );
}
