# Tutorial

A step guide of how I created the API.

## Project Setup

1. Created a local directory: `blog-api` to hold our project files.
2. Created repository: [expense-tracker-api](https://github.com/NathanaelMutua/blog-api.git)
3. You can find my Postman collection here: [Nathanael's Workspace](https://nathanael-7604382.postman.co/workspace/Nathanael's-Workspace~5b4242d0-11c7-4277-809b-10ca424c98a5/collection/45838328-10407f29-bfd8-4c1c-87e3-849d051ddd71?action=share&creator=45838328)

### 1. Version Control

Initialized and setup my GitHub repository.

```bash
git init
git remote add origin https://github.com/NathanaelMutua/blog-api.git
git remote -v
```

### 2. Node.js Setup

Here we will initialize Node.js to have my package.json file in the directory.

```bash
npm init -y
```

### 3. Dependencies Installation

Here we will install al the packages we will need and initialize Prisma ORM.

```bash
npm install express
npm install prisma --save
npx prisma init --datasource-provider postgresql
npm install @prisma/client
```

### 4. Database Configuration

In the `.env` file we will update the details as follows:

```sql
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/DATABASE_NAME"
```

![NOTE]

> We will revisit this environment variable to update it to the deployed database.

### 5. Prisma Schema

In our `schema.prisma` file we will create our model:

```prisma
model User {
    id           String   @id @default(uuid()) @map("user_id")
    firstName    String   @map("first_name")
    lastName     String   @map("last_name")
    emailAddress String   @unique @map("email_address")
    userName     String   @unique @map("username")
    createdAt    DateTime @default(now()) @map("user_created")
    updatedAt    DateTime @updatedAt @map("user_updated")
    isDeleted    Boolean  @default(false) @map("is_deleted")
    posts        Post[]

    @@map("users")
}

model Post {
    id         String   @id @default(uuid()) @map("post_id")
    title      String   @map("post_title")
    content    String   @map("post_content")
    userId     String
    createdAt  DateTime @default(now()) @map("post_created")
    latUpdated DateTime @updatedAt @map("post_updated")
    isDeleted  Boolean  @default(false) @map("deleted")
    user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)

    @@map("posts")
}
```

### 6. Migration

We will now migrate our model to create the table in our database.

```bash
npx prisma migrate dev --name "add user and post models"
```

### 7. Package.json Configuration

We will add a few scripts to streamline our development

```json
{
  "type": "module",
  "scripts": {
    "format": "prettier --write .",
    "dev": "node --watch index.js",
    "prod": "node index.js"
  }
}
```

### 8. Generate Prisma Client

We will generate our client to allow us to communicate with our database.

```bash
npx prisma generate
```

---

## API implementation

Create a JavaScript file, and let's dive in.

### 1. Server Setup

In `index.js` :

```js
import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client/extension";

dotenv.config({ path: ".env" });

const app = express();

const myClient = new PrismaClient();
```

### 2. Creating the main route

This is what anyone will see when they first click the link. For now let's go with something simple.

Note that we've placed an underscore before the 'res' to avoid unused variables.

```js
// Main route
app.get("/", (_req, res) => {
  res.send(`<h1 style = "text-align: center;">Blog API</h1>`);
});
```

### 3. Port Configuration

The setup below allows us to configure the port for deployment and local hosting.

The first option ids going to come into play when we have deployed our database. However, at this stage we haven't, so it will switch to port 6000.

```js
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`The App is listening on port ${port}`);
});
```

### 4. CRUD endpoints

#### POST /users (Creates a user record)

We will create a separate JavaScript file for validations.

To ensure that the data being entered is not null or empty.
`./test/validations.js`:

```js
export validateEnteredInfo = function(req, res, next) => {
if (!firstName) {
  return res.status(404).json({ message: "First Name is Required!" });
}

if (!lastName) {
  return res.status(404).json({ message: "Last Name is Required!" });
}

if (!userName) {
  return res.status(404).json({ message: "User Name is Required!" });
}

next();
}
```

The block to create a user, `index.js`:

```js
app.post("/users", validateEnteredInfo, async (req, res) => {
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
  } catch (e) {
    res.status(400).json({ message: "Something Went Wrong!😓" });
  }
});
```

#### GET /users (Retrieve all users)

This will be a request for all the users presently in the database.

```js
app.get("/users", (_req, res) => {
  try {
    const allUsers = myClient.user.findMany({
      where: {
        isDeleted: false,
      },
    });
    res
      .status(200)
      .json({ message: "All Users Retrieved Successfully", allUsers });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something Went Wrong!😓" });
  }
});
```

Sample Output:

```json
{
  "message": "All Users Retrieved Successfully",
  "all_users": [
    {
      "id": "949b0cf0-cf4d-4041-b0ec-726a4ca72b8c",
      "firstName": "Brandon",
      "lastName": "Mwangi",
      "emailAddress": "brandonmwangi@gmail.com",
      "userName": "brandon45t",
      "createdAt": "2025-06-15T15:47:14.945Z",
      "updatedAt": "2025-06-15T15:47:14.945Z",
      "isDeleted": false
    },
    {
      "id": "aa97dd1d-8733-4a43-ab0d-e0a5cba5db7c",
      "firstName": "Brian",
      "lastName": "Mwangi",
      "emailAddress": "brianonmwangi@gmail.com",
      "userName": "rianon45t",
      "createdAt": "2025-06-15T15:57:42.081Z",
      "updatedAt": "2025-06-15T15:57:42.081Z",
      "isDeleted": false
    },
    {
      "id": "cea834f7-1fd9-4375-a9f4-fda94a790f16",
      "firstName": "Mitchells",
      "lastName": "Chepkirui",
      "emailAddress": "mitchellechepkirui@gmail.com",
      "userName": "mitchychepch362",
      "createdAt": "2025-06-15T15:57:42.081Z",
      "updatedAt": "2025-06-15T15:57:42.081Z",
      "isDeleted": false
    } // ...
  ]
}
```

#### GET /users/:id (Retrieve a specific user)

This endpoint request should retrieve a user together with their related posts

```js
app.get("/user/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const specificUser = await myClient.user.findFirst({
            where: {
                isDeleted: false,
                id
            }, include: { posts: true }
        });
        res.status(200).json({ message: "User Retrieved Successfully", user: specificUser })
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: "Something Went Wrong!😓" });
    }
});
```

Sample Output:

```json
{
    "message": "User With id '1bfbfcf3-d85a-4835-a9e7-40d94a6e6e3e' Retrieved Successfully",
    "user": {
        "id": "1bfbfcf3-d85a-4835-a9e7-40d94a6e6e3e",
        "firstName": "Bruce",
        "lastName": "Wayne",
        "emailAddress": "brucewayne@gmail.com",
        "userName": "brucewayne3256",
        "createdAt": "2025-06-15T17:02:19.565Z",
        "updatedAt": "2025-06-15T17:02:19.565Z",
        "isDeleted": false,
        "posts": []
    }
}
```

#### PATCH /users (update user details)

This will partially update a users details

```js
app.patch("/users/:id", async (req, res) => {
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
```

Sample Input(body request):

```json
{
    "firstName": "Mary", 
    "lastName": "Ann", 
    "emailAddress": "maryanna562@gmail.com"
}
```

Sample Output:

```json
{
    "message": "User '1e1ba3cd-c02b-4af6-85c7-4609df7c5841' Updated Successfully",
    "updatedUser": {
        "id": "1e1ba3cd-c02b-4af6-85c7-4609df7c5841",
        "firstName": "Mary",
        "lastName": "Ann",
        "emailAddress": "maryanna@gmail.com",
        "userName": "mrsmaryanna34",
        "createdAt": "2025-06-15T16:02:32.179Z",
        "updatedAt": "2025-06-15T19:30:13.111Z",
        "isDeleted": false
    }
}
```

#### DELETE /users/:id (deleting a specific user record)

We will add record validation, to check if the record exists. Reason being, I have been running into my catch block without understanding why, so this is a solution.

In the `validations.js`:

```js
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
```

> **Note:** We will also export our client from `index.js` and import is as a named export in `validations.js`.

In `index.js` :

Add the keyword `export`

```js
export const myClient = new PrismaClient();
```

In `validations.js`:

```js
import {myClient} from '../index.js'
```

Take note of the directory, particularly for me, I hadn't saved it in the same directory.

#### POST /posts (Creating a post)

We will add a middleware to validate that none of the data entered for the posts is empty.

In `validations.js`:

```js
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
```

Then now we can have our post block to create a post in the `index.js` file:

```js
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
```

Sample input(body request):

```json
{
    "title": "Bought a new car",
    "content": "Guess the model 😊?",
    "userId": "cea834f7-1fd9-4375-a9f4-fda94a790f16"
}
```

Sample Output:

```json
{
    "message": "Post for user 'cea834f7-1fd9-4375-a9f4-fda94a790f16' Created Successfully",
    "newPost": {
        "id": "2ceaa0d7-e60d-401b-9c6a-16c7fa9aaeef",
        "title": "Bought a new car",
        "content": "Guess the model 😊?",
        "userId": "cea834f7-1fd9-4375-a9f4-fda94a790f16",
        "createdAt": "2025-06-16T07:40:49.323Z",
        "latUpdated": "2025-06-16T07:40:49.323Z",
        "isDeleted": false
    }
}
```

#### GET /posts (Retrieving all posts)

This block will get all posts with user details, specifically the user first name and their email.

```js
app.get("/posts", async (req, res) => {
  try {
    const allPosts = await myClient.post.findMany({
      where: {
        isDeleted: false
      }, include: {
        user: {
          select: {
            firstName: true,
            emailAddress: true // this will prevent too much data, displaying only the name and email
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
```

```json
{
  "message": "All Posts Retrieved Successfully",
  "all_posts": [
      {
          "id": "6e9b66de-36b1-4a38-97b6-aee88ffa3949",
          "title": "Visiting The Zoo",
          "content": "Wonderful time at the zoo 😊!",
          "userId": "aa97dd1d-8733-4a43-ab0d-e0a5cba5db7c",
          "createdAt": "2025-06-16T07:25:34.637Z",
          "latUpdated": "2025-06-16T07:25:34.637Z",
          "isDeleted": false,
          "user": {
              "firstName": "Brian",
              "emailAddress": "brianonmwangi@gmail.com"
          }
      },
      {
          "id": "03d9c6b5-25b8-47d4-a959-44ffb1e3aad3",
          "title": "Visiting The Mall",
          "content": "Wonderful time at the mall 😊!",
          "userId": "aa97dd1d-8733-4a43-ab0d-e0a5cba5db7c",
          "createdAt": "2025-06-16T07:25:34.637Z",
          "latUpdated": "2025-06-16T07:25:34.637Z",
          "isDeleted": false,
          "user": {
              "firstName": "Brian",
              "emailAddress": "brianonmwangi@gmail.com"
          }
      } // ...
  ]
}
```

#### GET /posts/:id (Retireving a specific user)

This block will make a request for a specific post calling its Id by retrieving it from the URL parameters.

```js
app.get("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const specificPost = await myClient.post.findFirst({
      where: {
        id,
        isDeleted: false
      }, include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            emailAddress: true
          }
        }
      }
    });
    res.status(200).json({ message: `Retrieved Post '${id}' Successfully!`, retrieved_post: specificPost });
  } catch (e) {
    console.log(e);
    res.status.apply(400).json({ message: "Something Went Wrong!😓" });
  }
});
```

Sample output:

```json
{
    "message": "Retrieved Post '6e9b66de-36b1-4a38-97b6-aee88ffa3949' Successfully!",
    "retrieved_post": {
        "id": "6e9b66de-36b1-4a38-97b6-aee88ffa3949",
        "title": "Visiting The Zoo",
        "content": "Wonderful time at the zoo 😊!",
        "userId": "aa97dd1d-8733-4a43-ab0d-e0a5cba5db7c",
        "createdAt": "2025-06-16T07:25:34.637Z",
        "latUpdated": "2025-06-16T07:25:34.637Z",
        "isDeleted": false,
        "user": {
            "firstName": "Brian",
            "lastName": "Mwangi",
            "emailAddress": "brianonmwangi@gmail.com"
        }
    }
}
```

#### PUT /post/:id (update a post)

The code in `index.js`:

```js
app.put("/posts/:id",validatePostEnteredInfo, async (req, res) => {
  try {
    const { id } = req.params;

    const { title, content, userId } = req.body;

    const updatedPost = await myClient.post.update({
      where: {
        id
      }, data: {
        title,
        content,
        userId
      }
    });
    res.status(200).json({ message: "Post Updated Successfully", updated_post: updatedPost });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something Went Wrong!😓" });
  }
});
```

Sample Input:

```json
{
    "title": "Bought a new dress😍",
    "content": "I can't believe my eyes 😊? #YOLO",
    "userId": "1e1ba3cd-c02b-4af6-85c7-4609df7c5841"
}
```

Sample output:

```json
{
    "message": "Post Updated Successfully",
    "updated_post": {
        "id": "9b25f8fd-3c94-46e0-a00b-1dc184290734",
        "title": "Bought a new dress😍",
        "content": "I can't believe my eyes 😊? #YOLO",
        "userId": "1e1ba3cd-c02b-4af6-85c7-4609df7c5841",
        "createdAt": "2025-06-16T11:13:06.651Z",
        "latUpdated": "2025-06-16T14:24:55.680Z",
        "isDeleted": false
    }
}
```
