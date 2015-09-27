var fs = require('fs');
var path = require('path');

module.exports = function(dir, name, cb) {
  var fp = findRealPathSync(dir, name);

  if (fp === null) {
    for (var fp = null; fp === null; fp = findRealPathSync(dir, name)) {
      if (dir === '/')
        break;
      else
        dir = path.join(dir, '..');
    }
  }

  if (fp)
    return cb(null, fp)
  else 
    return cb(new Error('Cannot not find file '+name));
}

function findRealPathSync(dir, name) {
  var filepath = path.join(dir, name);
  console.log(filepath);
  try {
    fs.accessSync(filepath); // will throw here if not found.
    return filepath;
  } catch (e) {
    return null
  }
}

