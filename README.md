# meteor-oplog-deepdiff

## Description

This package reduces the bandwidth consumed by Mongo cursor updates following https://github.com/meteor/meteor-feature-requests/issues/67#issuecomment-307708759

Mongo Oplog uses the Meteor built-in DiffSequence which only diffs top-level fields (i.e. if second-level fields change, the whole top-level is sent).

## Usage

For not, clone this package into your packages/ folder, we'll add it to Atmosphere shortly

Then `meteor add ramez:oplog-deepdiff`

## How does it work

Take a look at the code, it's super simple. It overrides the `_changePublished` method for `OplogObserveDriver` to use the excellent deep diff library https://github.com/flitbit/diff, then builds mongo-style queries to send down. 
As these queries are pure mongo, there is no need for client-side changes

## Issues

I did tests for the common operations (add, change, delete) and all worked as expected. I am sure as I dig deeper issues might arise. We use reactive publications in our app, so that alone is a good stress test. If you face any issues, please raise them here in github. As I am not an expert in the internals of Oplog and DDP, I could have easily missed something. I'll do my best to resolve it and will count on key members of the community to enlighten me if I missed anything.

**Please don't clone this repo and advertise your clone as it gets the community confused.** I'll do my best to help, if not, I'll create a separate branch for you.

## Acknowledgements

Thanks @mitar (https://github.com/meteor/meteor-feature-requests/issues/67#issuecomment-307708759) for your support and great ideas

## License

Same as Meteor, MIT: https://github.com/meteor/meteor/blob/devel/LICENSE
