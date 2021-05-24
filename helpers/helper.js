const crypto = require("crypto");

const random = () => {
    return crypto.randomBytes(20).toString("hex");
};

const response = (success, data, message = "") => {
	return {
		success,
		data,
		message
	};
};

module.exports = {
    random,
    response,
}