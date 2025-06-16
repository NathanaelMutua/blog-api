import { myClient } from '../index.js'

export const validateEnteredInfo = function (req, res, next) {
  const { firstName, lastName, emailAddress, userName } = req.body;

  if (!firstName) {
    return res.status(404).json({ message: "First Name is Required!" });
  }

  if (!lastName) {
    return res.status(404).json({ message: "Last Name is Required!" });
  }

  if (!emailAddress) {
    return res.status(404).json({ message: "Email Address is Required!" });
  }

  if (!userName) {
    return res.status(404).json({ message: "User Name is Required!" });
  }

  next();
};

export const validateExistingRecord = function(req, res, next) {
	const {id} = req.params;
	const existingUser = myClient.user.findUnique({
		where: {
			id
		}
	});

	if (!existingUser) {
		return res.status(404).json({ message: "Record Not Found!" });
	}

	next();
};
