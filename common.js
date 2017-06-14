DiffSequence.applyChanges = function(doc,fields) {
  _.each(fields, function (value, key) {
    var element = doc;
    var keys = key.split(".");
    // we traverse the object
    while (keys.length > 1) {
      var key = keys.shift();
      if (!isNaN(Number(key))) key = parseInt(key);
      // if we have no object we need to guess the next object type, can only be array or object
      if (element[key] === undefined) {
        element[key] = !isNaN(Number(keys[0])) ? [] : {};
      }
      element = element[key];
    }
    var lastKey = keys.pop();
    if (!isNaN(Number(lastKey))) lastKey = parseInt(lastKey);
    if (_.isArray(value))
      element[lastKey] = _.without(value,undefined);
    else if (value === undefined)
      delete element[lastKey];
    else
      element[lastKey] = value;
  });
}
