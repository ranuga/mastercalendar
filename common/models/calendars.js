module.exports = function(Calendars) {

	Calendars.afterRemote('**', function(ctx, calendars, next) {
		ctx.res.body=calendars;
		next();
	});
};

