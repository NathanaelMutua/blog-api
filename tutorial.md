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

## API implementation

Create a JavaScript file, and let's dive in.

### 1. Server Setup

In ```index.js``` :

```js
import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client/extension';

dotenv.config({path: '.env'})

const app = express();

const myClient = new PrismaClient();
```

### 2. Creating the main route

This is what anyone will see when they first click the link. For now let's go with something simple.

Note that we've placed an underscore before the 'res' to avoid unused variables.

```js
// Main route
app.get("/", (_req, res) => {
    res.send(
        `<h1 style = "text-align: center;">Blog API</h1>`
    );
})
```

### 3. Port Configuration

The setup below allows us to configure the port for deployment and local hosting.

The first option ids going to come into play when we have deployed our database. However, at this stage we haven't, so it will switch to port 6000.

```js
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`The App is listening on port ${port}`);
})
```

### 4. CRUD endpoints

#### POST /users

We will create a separate JavaScript file for validations.

To ensure that the data being entered is not null or empty.
```./test/validations.js```:

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

The block to create a user, ```index.js```:

```js
app.post("/users", validateEnteredInfo, async (req, res) => {
    try{
        const {firstName, lastName, emailAddress, userName} = req.body
        const newUser = await myClient.user.create({
            data: {
                firstName,
                lastName,
                emailAddress,
                userName
            }
        })
    } catch (e) {
        res.status(400).json({ message: "Something Went Wrong!😓" })
    }
});
```
