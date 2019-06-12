function esNumero(caracter) {
  return !isNaN(parseInt(caracter));
}

function esLetra(caracter) {
  var code = caracter.charCodeAt(0);
  return (code > 96 && code < 123) || (code > 64 && code < 91);
}
