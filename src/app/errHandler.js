module.exports = (err, ctx) => {
	let status = 200;
	switch (err.returnCode) {
		case 10001:
			status = 400;
			break;
		case 10002:
			status = 409;
			break;
		case 10003:
			status = 400;
			break;
		default:
			status = 200;
	}
	ctx.status = status;
	ctx.body = err;
}