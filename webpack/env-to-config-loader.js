module.exports = function(source) {
  for(let envVar in process.env) {
    const regExp = new RegExp('\\${' + envVar + '}', 'g');
    source = source.replace(regExp, process.env[envVar]);
  }
  return source;
}