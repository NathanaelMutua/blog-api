import { myClient } from '../index.js'

export const validateUserEnteredInfo = function (req, res, next) {
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


export const validatePostEnteredInfo = function(req, res, next) {
  const { title, content, userId } = req.body;

  if (!title) {
    return res.status(404).json({ message: "Title is Required!" });
  }

  if (!content) {
    return res.status(404).json({ message: "Content is Required!" });
  }

  if (!userId) {
    return res.status(404).json({ message: "User ID is Required!" });
  }
}