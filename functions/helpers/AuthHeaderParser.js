function parseAuthHeader (authHeader) {
  const bearerString = 'bearer ';
  var ght = '';
  if (authHeader.startsWith(bearerString) && authHeader.length > bearerString.length) {
    const authHeaderArray = authHeader.split('bearer ');
    ght = authHeaderArray[1];
  }

  return ght;
}

module.exports = parseAuthHeader;
