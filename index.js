import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { validateUserEnteredInfo, validateExistingRecord, validatePostEnteredInfo } from "./run_test/validations.js";

dotenv.config({ path: ".env" }); // read environment variables
const app = express(); // initialize Express
app.use(express.json());
export const myClient = new PrismaClient();

// CRUD operations

// Main route
app.get("/", (_req, res) => {
  res.send(`<h1 style = "text-align: center;">Blog API</h1>`);
});

// POST /users(all users)
app.post("/users", validateUserEnteredInfo, async (req, res) => {
  try {
    const { firstName, lastName, emailAddress, userName } = req.body;
    const newUser = await myClient.user.create({
      data: {
        firstName,
        lastName,
        emailAddress,
        userName,
      },
    });
    res.status(201).json({ message: "User Created Successfully", newUser });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Something Went Wrong!😓" });
  }
});

// GET /users(get all users)
app.get("/users", async (_req, res) => {
  try {
    const allUsers = await myClient.user.findMany({
      where: {
        isDeleted: false,
      },
    });
    if (!allUsers) {
      return res.status(404).json({ message: "Empty User's Table!" });
    }
    res
      .status(200)
      .json({
        message: "All Users Retrieved Successfully",
        all_users: allUsers,
      });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something Went Wrong!😓" });
  }
});

// GET /users/:id (get a specific user and all their related posts)
app.get("/users/:id",validateExistingRecord, async (req, res) => {
    try {
        const { id } = req.params;

        const specificUser = await myClient.user.findFirst({
            where: {
                AND: {
                    id,
                    isDeleted: false
                }
            }, include: {
                posts: true
            }
        });
        res.status(200).json({ message: `User With id '${id}' Retrieved Successfully`, user: specificUser })
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: "Something Went Wrong!😓" });
    }
});

// PATCH /users/:id (partially update a user's details)
app.patch("/users/:id",validateExistingRecord, async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName} = req.body

        const updatedUser = await myClient.user.update({
            where: {
                id
            }, data: {
                firstName,
                lastName
            }
        });
        res.status(200).json({ message: `User '${id}' Updated Successfully`, updatedUser})
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: "Something Went Wrong!😓" });
    }
});

// DELETE /users/:id (soft-delete a specific user)
app.delete("/users/:id",validateExistingRecord, async (req, res) => {
    try {
        const { id } = req.params;
        
        const deletedUser = await myClient.user.update({
            where: {
                id
            }, data: {
                isDeleted: true // performs a soft-delete
            }
        });
        res.status(200).json({ message: `User '${id}' Deleted Successfully`, deletedUser });
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: "Something Went Wrong!😓" });
    }
});

// POST /posts (Creating a new post)
app.post("/posts",validatePostEnteredInfo, async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    const newPost = await myClient.post.create({
      data: {
        title,
        content,
        userId
      }
    });
    console.log("create post")
    res.status(201).json({ message: `Post for user '${userId}' Created Successfully`, newPost });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Something Went Wrong!😓" })
  }
});

// GET /posts (To retrieve all posts, including author details)
app.get("/posts", async (req, res) => {
  try {
    const allPosts = await myClient.post.findMany({
      where: {
        isDeleted: false
      }, include: {
        user: {
          select: {
            firstName: true,
            emailAddress: true
          }
        }
      }
    });
    res.status(200).json({ message: "All Posts Retrieved Successfully", all_posts: allPosts })
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Something Went Wrong!😓" })
  }
});

// PORT configuration
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`The App is listening on port ${port}`);
});
