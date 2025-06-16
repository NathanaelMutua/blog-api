import { myClient } from "../index.js";

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

export const validateExistingUserRecord = function (req, res, next) {
  const { id } = req.params;
  const existingUser = myClient.user.findUnique({
    where: {
      id,
    },
  });

  if (!existingUser) {
    return res
      .status(404)
      .json({ message: `User '${id}' Not Found! Check Again!` });
  }

  next();
};

export const validateIfUserDeleted = async function (req, res, next) {
  const { id } = req.params;

  const userToBeDeleted = await myClient.user.findFirst({
    where: {
      id,
      isDeleted: true,
    },
  });

  if (userToBeDeleted) {
    return res.status(400).json({ message: `User '${id}' Already Deleted!` });
  }

  next();
};

export const validatePostEnteredInfo = function (req, res, next) {
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

  next();
};

export const validateExistingPostRecord = async function (req, res, next) {
  const { id } = req.params;

  const postToBeChecked = await myClient.post.findFirst({
    where: {
      id,
    },
  });

  if (!postToBeChecked) {
    return res
      .status(400)
      .json({ message: `Post '${id}' Is Not Found! Check Again!` });
  }

  next();
};

export const validateIfPostDeleted = async function (req, res, next) {
  const { id } = req.params;

  const postToBeDeleted = await myClient.post.findFirst({
    where: {
      id,
      isDeleted: true,
    },
  });

  if (postToBeDeleted) {
    return res.status(400).json({ message: `Post '${id}' Already Deleted!` });
  }

  next();
};
