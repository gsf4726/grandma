/* jshint node: true */

var path = require('path');
var base = process.cwd();
var resolve = require('resolve');

function requireLocal(moduleName) {
    try {
        var resolvedUri = resolve.sync(moduleName, { basedir: base });
        return require(resolvedUri);
    } catch(e) {
        return require(moduleName);
    }
};

function requireGrandma(from) {
    try {
      var grandma = requireLocal(from);
      require(grandma.cliPath());
    } catch(e) {
      return false;
    }

    return true;
}

if (!requireGrandma('grandma')) {
  if (!requireGrandma('./')) {
    // We did not find grandma installed locally, nor are we
    // executing in the grandma folder itself (which might happen
    // during development), so we will use the global one instead.
    requireGrandma('../index');
  }
}
