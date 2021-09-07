/**
 * 拓展对象
 * 
*/
exports.extends = function extend (target) {
  var sources = [].slice.call(arguments, 1);
  for(let i = 0; i < sources.length; i++) {
    let source = sources[i];
    for(let key in source) {
      if(source.hasOwnProperty(key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};