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
    this.usuarioActual = this.obtener({ email, pass });
    return this.usuarioActual;
  };
  this.logout = function() {
    this.usuarioActual = null;
  };

  /**
   * Encuentra un usuario registrado dados múltiples valores que deben coincidir con las
   * propiedades del usuario.
   * El parámetro "valores" es un objeto cuyas propiedades deben coincidir con las del usuario
   */
  this.obtener = function(valores) {
    return this.lista.find(function(usuario) {
      var analizadas = 0;
      var coincidencias = 0;
      for (var propiedad in valores) {
        if (
          usuario[propiedad] &&
          usuario[propiedad] == valores[propiedad]
        ) {
          coincidencias++;
        }
        analizadas++;
      }

      return coincidencias === analizadas;
    });
  };
}

var usuarios = new Usuarios();

// Administradores pre-cargados
usuarios.crear('Admin 1', 'admin@gmail.com', 'abc123', true);
