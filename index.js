var deepDiff = require('deep-diff').diff;

MongoInternals.OplogObserveDriver.prototype._changePublished = function (id, oldDoc, newDoc) {
  var self = this;
  Meteor._noYieldsAllowed(function () {
    self._published.set(id, self._sharedProjectionFn(newDoc));
    var diff = deepDiff(oldDoc,newDoc);
    if (diff) {
      var changed  = {}
      _.each(diff,function(part) {
        var field = part.path.join(".");
        if (part.kind == 'D') changed[field] = null;
        // note: if there is no part.item.rhs it means item was deleted
        else if (part.kind == 'A') changed[field + '.' + part.index] = part.item.rhs;
        else changed[field] = part.rhs;
      });
      // console.log(changed);
      if (!_.isEmpty(changed)) {
        self._multiplexer.changed(id, changed);
      }
    }
  });
}
