export function validateEnteredInfo(req, res, next) {
	if (!first_name) {
		return res.status(404).json({ message: "First Name is Required!" });
	}

	if (!last_name) {
		return res.status(404).json({ message: "Last Name is Required!" });
	}

	if (!emailAddress) {
		return res.status(404).json({ message: "Email Address is Required!" });
	}

	next();
}