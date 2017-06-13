import { MongoID } from "meteor/mongo-id";

DDP.Connection.prototype._process_changed = function (msg, updates) {
  var self = this;
  var serverDoc = self._getServerDoc(
    msg.collection, MongoID.idParse(msg.id));
  if (serverDoc) {
    if (serverDoc.document === undefined)
      throw new Error("Server sent changed for nonexisting id: " + msg.id);
    // ramez: replaced DiffSequence.applyChanges with a flattening replace.
    // Has same effect as prior in addition to supporting fields in dot notation
    _.each(msg.fields, function (value, key) {
      var doc = serverDoc.document;
      var keys = key.split(".");
      var lastKey = keys.pop();
      // we traverse the object
      _.each(keys, function(key) {
        // array indices
        if (!isNaN(Number(key))) {
          key = parseInt(key);
          // might as well fix missing field
          if (doc[key] === undefined) doc[key] = []
        }
        else if (doc[key] == undefined) doc[key] = {};
        doc = doc[key];
      })
      if (value === undefined)
        delete doc[lastKey];
      else
        doc[lastKey] = value;
    // end of replaced section
    });
  } else {
    self._pushUpdate(updates, msg.collection, msg);
  }
}
