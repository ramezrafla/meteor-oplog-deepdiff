import {MongoID} from 'meteor/mongo-id';
/*
Meteor.startup(function() {
    Meteor.connection._stores.content.update = function(msg) {
      var self = this;
      var mongoId = msg.id;
      var collection = self._getCollection();
      var doc = collection.findOne(mongoId);

      // Is this a "replace the whole doc" message coming from the quiescence
      // of method writes to an object? (Note that 'undefined' is a valid
      // value meaning "remove it".)
      if (msg.msg === 'replace') {
        var replace = msg.replace;
        if (!replace) {
          if (doc)
            collection.remove(mongoId);
        } else if (!doc) {
          collection.insert(replace);
        } else {
          // XXX check that replace has no $ ops
          collection.update(mongoId, replace);
        }
        return;
      } else if (msg.msg === 'added') {
        if (doc) {
          throw new Error("Expected not to find a document already present for an add");
        }
        collection.insert(_.extend({_id: mongoId}, msg.fields));
      } else if (msg.msg === 'removed') {
        if (!doc)
          throw new Error("Expected to find a document already present for removed");
        collection.remove(mongoId);
      } else if (msg.msg === 'changed') {
        if (!doc)
          throw new Error("Expected to find a document to change");
        if (!_.isEmpty(msg.fields)) {
          var modifier = {};
          // -- beging of oplog-deepdiff changes
          _.each(msg.fields, function (value, key) {
            if (value === null) {
              if (!modifier.$unset)
                modifier.$unset = {};
              modifier.$unset[key] = 1;
              // removing empty array elements
              if (/\.\d+$/.test(key)) {
                key = key.replace(/\.\d+$/,'')
                if (!modifier.$pull) modifier.$pull = {};
                modifier.$pull[key] = null;
              }
            } else {
              if (!modifier.$set)
                modifier.$set = {};
              modifier.$set[key] = value;
            }
          });
          // -- end of oplog-deepdiff changes
          collection.update(mongoId, modifier);
        }
      } else {
        throw new Error("I don't know how to deal with this message");
      }

    }
})
*/
