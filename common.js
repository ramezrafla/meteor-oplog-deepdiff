DiffSequence.applyChanges = function(doc,fields) {
  _.each(fields, function (value, key) {
    var element = doc;
    var keys = key.split(".");
    var lastKey = keys.pop();
    // we traverse the object
    _.each(keys, function(key) {
      // array indices
      if (!isNaN(Number(key))) {
        key = parseInt(key);
        // might as well fix missing field
        if (element[key] === undefined) element[key] = []
      }
      else if (element[key] == undefined) element[key] = {};
      element = element[key];
    })
    if (!isNaN(Number(lastKey))) lastKey = parseInt(lastKey);
    if (value === null)
      delete element[lastKey];
    else
      element[lastKey] = value;
  });
}
