export function validateEnteredInfo(req, res, next) {
	if (!firstName) {
		return res.status(404).json({ message: "First Name is Required!" });
	}

	if (!lastName) {
		return res.status(404).json({ message: "Last Name is Required!" });
	}

	if (!emailAddress) {
		return res.status(404).json({ message: "Email Address is Required!" });
	}

	next();
}