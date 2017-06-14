var deepDiff = require('deep-diff').diff;

MongoInternals.OplogObserveDriver.prototype._changePublished = function (id, oldDoc, newDoc) {
  var self = this;
  Meteor._noYieldsAllowed(function () {
    self._published.set(id, self._sharedProjectionFn(newDoc));
    var projectedNew = self._projectionFn(newDoc);
    var projectedOld = self._projectionFn(oldDoc);
    var diff = deepDiff(projectedOld,projectedNew);
    if (diff) {
      var changed  = {}
      _.each(diff,function(part) {
        var field = part.path.join(".");
        if (part.kind == 'D') changed[field] = undefined;
        else if (part.kind == 'A') {
          if (part.item.kind == 'D') changed[field + '.' + part.index] = undefined;
          else changed[field + '.' + part.index] = part.item.rhs;
        }
        else changed[field] = part.rhs;
      });
      if (!_.isEmpty(changed)) {
        console.log(changed);
        self._multiplexer.changed(id, changed);
      }
    }
  });
}
