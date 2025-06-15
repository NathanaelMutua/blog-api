# Blog API

## Description

This is a basic API project that implements Prisma, Express, PostgreSQL, JavaScript and Node.js.

- Express.js for my server and routes handling.
- Prisma ORM for database interaction
- PostgreSQL for my database

The API is for a blog API with user and posts models.

If you want a step by step tutorial you can skip right to [this section](./tutorial.md)

You can refer to a similar project here: [Expense Tracker API](https://github.com/NathanaelMutua/expense-tracker-api?tab=readme-ov-file#api-implementation)

## API implementation

> The user and posts are related via a one to many relationship

### CRUD endpoints

#### GET /users

This endpoint will retrieve all users.

You can access it via this http link or just follow this Postman link to implement it: [GET /users](url)

```md
url/users
```

#### GET /users/:id

This endpoint will retrieve a specific user, based on the user ID. It will also include all blog posts authored by that user.

You can access it via this http link or just follow this Postman link to implement it: [GET /users/:id](url)

```md
url/users
```

#### POST /users

This endpoint will create a new user.

The request body content (in JSON format) is something like this:

```json
    {
        "firstName": "John",
        "lastName": "Doe",
        "email": "johndoe@gemail.com"
    }
```

You can access it via this site or just follow this Postman link to implement it: [POST /users](url)

```md
url/users
```

#### GET /posts

This endpoint will retrieve all posts. It will also include the author's details for each post.

You can access it via this site or just follow this Postman link to implement it: [GET /posts](url)

```md
url/users
```

#### GET /posts/:id

This endpoint will retrieve a specific posts. It will also include the author's details for the post.

You can access it via this site or just follow this Postman link to implement it: [GET /posts/:id](url)

```md
url/users
```

#### POST /posts

This endpoint will create a new post.

You can access it via this site or just follow this Postman link to implement it: [POST /posts](url)

```md
url/users
```

#### PUT /posts/:id

This endpoint will update a specific post's details.

You can access it via this site or just follow this Postman link to implement it: [GET /posts](url)

```md
url/users
```

#### DELETE /posts/:id

This endpoint will [soft-delete]([Difference Between Soft Delete and Hard Delete - GeeksforGeeks](https://www.geeksforgeeks.org/dbms/difference-between-soft-delete-and-hard-delete/)) a specific post.

You can access it via this site or just follow this Postman link to implement it: [GET /posts](url)

```md
url/users
```
