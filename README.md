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

You can access it via this site or just follow this Postman link to implement it: [POST /users](https://nathanael-7604382.postman.co/workspace/Nathanael's-Workspace~5b4242d0-11c7-4277-809b-10ca424c98a5/example/45838328-bb5aa33b-3963-4b07-af51-1d7277f12fbc?action=share&creator=45838328&ctx=documentation)

```md
127.0.0.1:8000/users
```

#### GET /posts

This endpoint will retrieve all posts. It will also include the author's details for each post.

You can access it via this site or just follow this Postman link to implement it: [GET /posts](https://nathanael-7604382.postman.co/workspace/Nathanael's-Workspace~5b4242d0-11c7-4277-809b-10ca424c98a5/request/45838328-c7f915bc-4a80-4bd7-85b3-62696cb06eed?action=share&creator=45838328&ctx=documentation)

```md
127.0.0.1:8000/users
```

#### GET /posts/:id

This endpoint will retrieve a specific posts. It will also include the author's details for the post.

You can access it via this site or just follow this Postman link to implement it: [GET /posts/:id](url)

```md
url/users
```

#### POST /posts

This endpoint will create a new post.

You can access it via this site or just follow this Postman link to implement it: [POST /posts](https://nathanael-7604382.postman.co/workspace/Nathanael's-Workspace~5b4242d0-11c7-4277-809b-10ca424c98a5/request/45838328-27e1f1f2-f285-4be1-beb9-15bccc471f2e?action=share&creator=45838328&ctx=documentation)

```md
127.0.0.1:8000/users
```

Sample input:

```json
{
  "firstName": "Maryann",
  "lastName": "Wanjiru",
  "emailAddress": "maryanna@gmail.com",
  "userName": "mrsmaryanna34"
}
```

Expected output:

```json
{
  "message": "User Created Successfully",
  "newUser": {
    "id": "1e1ba3cd-c02b-4af6-85c7-4609df7c5841",
    "firstName": "Maryann",
    "lastName": "Wanjiru",
    "emailAddress": "maryanna@gmail.com",
    "userName": "mrsmaryanna34",
    "createdAt": "2025-06-15T16:02:32.179Z",
    "updatedAt": "2025-06-15T16:02:32.179Z",
    "isDeleted": false
  }
}
```

#### PUT /posts/:id

This endpoint will update a specific post's details.

You can access it via this site or just follow this Postman link to implement it: [GET /posts](url)

```md
url/users
```

#### DELETE /posts/:id

This endpoint will [soft-delete](https://www.geeksforgeeks.org/dbms/difference-between-soft-delete-and-hard-delete/) a specific post.

You can access it via this site or just follow this Postman link to implement it: [GET /posts](url)

```md
url/users
```
