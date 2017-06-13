// XXX We should revisit how we factor MongoDB support into (1) the
// server-side node.js driver [which you might use independently of
// livedata, after all], (2) minimongo [ditto], and (3) Collection,
// which is the class that glues the two of them to Livedata, but also
// is generally the "public interface for newbies" to Mongo in the
// Meteor universe. We want to allow the components to be used
// independently, but we don't want to overwhelm the user with
// minutiae.

Package.describe({
  name: 'ramez:oplog-deepdiff',
  summary: "Deep diff for DDP",
  version: '0.9.0'
});

Npm.depends({
  "deep-diff": "0.3.8"
});

Package.onUse(function (api) {
  api.use(['diff-sequence','mongo-id','ecmascript']);
  api.use(['mongo'], 'server');
  api.addFiles('server.js', 'server');
  api.addFiles('client.js', 'client');
  api.addFiles('common.js');
});
