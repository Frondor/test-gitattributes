function esNumero(caracter) {
  return typeof parseInt(caracter) === 'number';
}

function esLetra(caracter) {
  var code = caracter.charCodeAt(0);
  return (code > 96 && code < 123) || (code > 64 && code < 91);
}
