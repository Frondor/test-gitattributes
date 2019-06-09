function Usuario(name, email, password) {
  this.esAdmin = false;
  this.name = name;
  this.email = email;
  this.pass = password;
}

function Usuarios() {
  this.usuarioActual = null;
  this.lista = [];
  this.crear = function(name, email, pass, esAdmin) {
    var usuario = new Usuario(name, email, pass);
    usuario.id = this.lista.length + 1;
    usuario.esAdmin = esAdmin;
    this.lista.push(usuario);
    return true;
  };
  this.login = function(email, pass) {
    this.usuarioActual = this.lista.find(function(usuario) {
      return usuario.email === email && usuario.pass === pass;
    });
    return this.usuarioActual;
  };
  this.logout = function() {
    this.usuarioActual = null;
  };
}

var usuarios = new Usuarios();

// Administradores pre-cargados
usuarios.crear('Admin 1', 'admin@gmail.com', 'abc123', true);
