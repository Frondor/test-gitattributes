// navegacion.ir('login');

navegacion.iniciar(function() {
  usuarios.crear('test', 'test@test.com', 'test123');
  usuarios.login('test@test.com', 'test123');
  navegacion.ir('cuenta');
});
