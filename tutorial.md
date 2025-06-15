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

#### POST /users

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

#### GET /users

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

#### GET /users/:id

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

#### PATCH /users

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

Sample Input:

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
