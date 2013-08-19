var externals = {},
    internals = {};


externals.EmailAddress = new RegExp(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i);
externals.ObjectID = new RegExp('^[0-9a-fA-F]{24}$');


externals._internals = internals;
module.exports = externals;
