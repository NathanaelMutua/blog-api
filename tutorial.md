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
DATABASE_URL="postgresql://postgres:YOURPASSWORD@localhost:5432/DATABASE_NAME"
```

![NOTE]
> We will revisit this environment variable to update it to the deployed database.

### 5. Prisma Schema

In our `schema.prisma` file we will create our model:

```prisma
model User {
    id           String   @id @default(uuid()) @map("user_id")
    firstName    Int      @map("first_name")
    lastName     String   @map("last_name")
    emailAddress String    @unique @map("email_address")
    username     String   @unique @map("username")
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
