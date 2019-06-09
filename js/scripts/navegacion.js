var vistas = [
  {
    id: 'login',
  },
  {
    id: 'inicio',
    configurar: function() {},
  },
  {
    id: 'registro',
    configurar: function() {},
  },
  {
    id: 'cuenta',
    configurar: function() {},
  },
  {
    id: 'equipos',
    configurar: function() {},
  },
  {
    id: 'competencias',
    configurar: function() {},
  },
];

function Navegacion() {
  var $menu = $('#main-menu ul');
  var $vistas = $('.vista');
  this.vistas = {};

  for (var i = 0; i < vistas.length; i++) {
    var vista = vistas[i];
    vista.$elemento = $('.vista-' + vista.id);
    this.vistas[vista.id] = vista;
  }

  this.ir = function(vistaId) {
    $vistas.hide();
    var vista = this.vistas[vistaId];
    if (vista.configurar) vista.configurar();
    recrearMenu($menu);
    vista.$elemento.show();
    return false;
  };
}

var mainMenu = [
  {
    label: 'Entrar',
    condicion: function(usuario) {
      return !usuario;
    },
    click: function() {
      navegacion.ir('login');
    },
  },
  {
    label: 'Competencias',
    condicion: function(usuario) {
      return usuario;
    },
    click: function() {
      navegacion.ir('competencias');
    },
  },
  {
    label: 'Equipos',
    condicion: function(usuario) {
      return usuario && !usuario.esAdmin;
    },
    click: function() {
      navegacion.ir('equipos');
    },
  },
  {
    label: 'Mi cuenta',
    condicion: function(usuario) {
      return usuario && !usuario.esAdmin;
    },
    click: function() {
      navegacion.ir('cuenta');
    },
  },
  {
    label: 'Salir',
    condicion: function(usuario) {
      return usuario;
    },
    click: function() {
      usuarios.logout();
      navegacion.ir('login');
    },
  },
];

function recrearMenu($menu) {
  console.log(usuarios);
  var usuario = usuarios.usuarioActual;
  $menu.empty();
  for (var i = 0; i < mainMenu.length; i++) {
    var item = mainMenu[i];
    if (item.condicion(usuario)) {
      var link = $('<a>')
        .attr('href', '#' + item.label.toLowerCase())
        .text(item.label)
        .click(item.click);
      $menu.append($('<li>').append(link));
    }
  }
}

navegacion = new Navegacion();
navegacion.ir('login');
