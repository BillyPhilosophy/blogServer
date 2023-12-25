module.exports = (err, ctx) => {
	let status = 200;
	switch (err.returnCode) {
		case 400:
			status = 400;
			break;
		case 401:
			status = 401;
			break;
		case 403:
			status = 403;
			break;
		case 404:
			status = 404;
			break;
		default:
			status = 200;
	}
	ctx.status = status;
	ctx.body = err;
}