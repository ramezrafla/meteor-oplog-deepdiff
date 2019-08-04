# meteor-oplog-deepdiff

## Warning

**This effort has been halted as it would require some major changes to the core // this is left as documentation of this effort in case it's useful -- and frankly, with server-side compression in NGinx / Apache and if the docs being transmitted are not too deep, the overhead is very tolerable and maybe even desirable to improve consistency**

This package needs a few hacks to some core methods as functions are not properly exposed to be overriden. Please look at the folder `hacked-core` (search for `oplog-deepdiff changes` to see what we changed). Once we finish testing we'll reach out to the Meteor team on how to handle all this.

## Description

This package reduces the bandwidth consumed by Mongo cursor updates following https://github.com/meteor/meteor-feature-requests/issues/67#issuecomment-307708759

Mongo Oplog uses the Meteor built-in DiffSequence which only diffs top-level fields (i.e. if second-level fields change, the whole top-level is sent).

## Example

In our app, we changed the language which is a second-level field in the user doc

|Scenario|WS frame size|
|--------|-------|
|Normal oplog|1.7kB|
|With this package|120B|

In other words, each time the user profile changes, we are sending down almost 2kB vs 100B


## Usage

For now, clone this package into your packages/ folder, we'll add it to Atmosphere if / when possible

Then `meteor add ramez:oplog-deepdiff`

Then you need to copy over three folders from Meteor core into your packages folder and copy over the files in `hacked-core`

## How it works

This package only works on `changed` callbacks, `added` and `removed` remain as-is.

Instead of sending down the whole top-level element, we send down the fields themseves in dot notation like this:
`{"content.meta.active": true}`. This required changes to core as we the merging methods would simply merge top-level fields. I am sure we missed a few spots where we have to do proper merging, but this work for our app. If you find another place we missed, please raise an issue.

## Issues

I did tests for the common operations (add, change, delete) and all worked as expected. I am sure as I dig deeper issues might arise. We use reactive publications in our app, so that alone is a good stress test. If you face any issues, please raise them here in github. As I am not an expert in the internals of Oplog and DDP, I could have easily missed something. I'll do my best to resolve it and will count on key members of the community to enlighten me if I missed anything.

**Please don't clone this repo and advertise your clone as it gets the community confused.** I'll do my best to help, if not, I'll create a separate branch for you.

## Acknowledgements

Thanks @mitar (https://github.com/meteor/meteor-feature-requests/issues/67#issuecomment-307708759) for your support and great ideas

## License

Same as Meteor, MIT: https://github.com/meteor/meteor/blob/devel/LICENSE
