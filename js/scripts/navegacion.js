function Navegacion() {
  var $menu = $('#main-menu ul');
  var $vistas = $('.vista');
  this.vistas = {};

  this.ir = function(vistaId) {
    $vistas.hide();
    var vista = this.vistas[vistaId];
    if (vista.configurar) vista.configurar();
    recrearMenu(this, $menu);
    vista.$elemento.show();
    this.vistaActual = vistaId;
    return false;
  };

  this.registrarVista = function(vista) {
    this.vistas[vista.id] = {
      id: vista.id,
      $elemento: $('.vista-' + vista.id),
      label: vista.label, // label para usar para el link del menú principal
      configurar: vista.configurar, // función que se ejecuta cuando se navega a esta vista
      condicion: vista.condicion, // función que recibe el usuario actual y decide si puede navegar a ella o no
    };
  };

  this.iniciar = function(iniciarNav) {
    iniciarNav();
    recrearMenu(this, $menu);
  };
}

var extraMenuItems = [
  // {
  //   label: 'Entrar',
  //   condicion: function(usuario) {
  //     return !usuario;
  //   },
  //   click: function() {
  //     navegacion.ir('login');
  //   },
  // },
  // {
  //   label: 'Competencias',
  //   condicion: function(usuario) {
  //     return usuario;
  //   },
  //   click: function() {
  //     navegacion.ir('competencias');
  //   },
  // },
  // {
  //   label: 'Equipos',
  //   condicion: function(usuario) {
  //     return usuario && !usuario.esAdmin;
  //   },
  //   click: function() {
  //     navegacion.ir('equipos');
  //   },
  // },
  // {
  //   label: 'Mi cuenta',
  //   condicion: function(usuario) {
  //     return usuario && !usuario.esAdmin;
  //   },
  //   click: function() {
  //     navegacion.ir('cuenta');
  //   },
  // },
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

function crearMenuLink(label, onClick) {
  var link = $('<a>')
    .attr('href', '#' + label.toLowerCase())
    .text(label);
  if (onClick) link.click(onClick);
  return $('<li>').append(link);
}

function recrearMenu(navegacion, $menu) {
  var usuario = usuarios.usuarioActual;
  $menu.empty();

  for (var id in navegacion.vistas) {
    const vista = navegacion.vistas[id]; // uso const para evitar un problema de hoisting
    if (vista.condicion && vista.condicion(usuario)) {
      $menu.append(
        crearMenuLink(vista.label || vista.id, function() {
          navegacion.ir(vista.id);
        })
      );
    }
  }

  for (var i = 0; i < extraMenuItems.length; i++) {
    const item = extraMenuItems[i];
    if (item.condicion && item.condicion(usuario)) {
      $menu.append(crearMenuLink(item.label, item.click));
    }
  }
}

navegacion = new Navegacion();
