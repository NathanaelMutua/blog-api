# Blog API

## Description

This is a basic API project that implements Prisma, Express, PostgreSQL, JavaScript and Node.js.

- Express.js for my server and routes handling.
- Prisma ORM for database interaction
- PostgreSQL for my database

The API is for a blog API with user and posts models.

If you want a step by step tutorial you can skip right to [this section](./tutorial.md)

You can refer to a similar project here: [Expense Tracker API](https://github.com/NathanaelMutua/expense-tracker-api?tab=readme-ov-file#api-implementation)

Visit the Postman collection to implement the endpoints: [Blog API Endpoints](https://nathanael-7604382.postman.co/workspace/Nathanael's-Workspace~5b4242d0-11c7-4277-809b-10ca424c98a5/collection/45838328-10407f29-bfd8-4c1c-87e3-849d051ddd71?action=share&creator=45838328)

## API implementation

> The user and posts are related via a one to many relationship

### CRUD endpoints

#### GET /users

This endpoint will retrieve all users.

You can access it via this http link or just follow this Postman link to implement it: [GET /users](https://nathanael-7604382.postman.co/workspace/Nathanael's-Workspace~5b4242d0-11c7-4277-809b-10ca424c98a5/request/45838328-c7f915bc-4a80-4bd7-85b3-62696cb06eed?action=share&creator=45838328&ctx=documentation)

```md
http://127.0.0.1:8000/users
```

Sample Output:

```json
{
    "message": "All Users Retrieved Successfully",
    "all_users": [
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
        },
        {
            "id": "41e51b1a-61fa-4c35-b3ae-c2d02e209e7a",
            "firstName": "Michael",
            "lastName": "Jones",
            "emailAddress": "michaeljones@gmail.com",
            "userName": "Mike2653ty",
            "createdAt": "2025-06-15T15:57:42.081Z",
            "updatedAt": "2025-06-15T15:57:42.081Z",
            "isDeleted": false
        }
    ]
}
```

#### GET /users/:id

This endpoint will retrieve a specific user, based on the user ID. It will also include all blog posts authored by that user.

You can access it via this http link or just follow this Postman link to implement it: [GET /users/:id](https://nathanael-7604382.postman.co/workspace/Nathanael's-Workspace~5b4242d0-11c7-4277-809b-10ca424c98a5/request/45838328-64d65e89-5ecb-49ab-ac4c-e6aa5f202361?action=share&creator=45838328&ctx=documentation)

```md
http://127.0.0.1:8000/users/aa97dd1d-8733-4a43-ab0d-e0a5cba5db7c
```

Sample Output:

```json
{
    "message": "User With id 'aa97dd1d-8733-4a43-ab0d-e0a5cba5db7c' Retrieved Successfully",
    "user": {
        "id": "aa97dd1d-8733-4a43-ab0d-e0a5cba5db7c",
        "firstName": "Brian",
        "lastName": "Mwangi",
        "emailAddress": "brianonmwangi@gmail.com",
        "userName": "rianon45t",
        "createdAt": "2025-06-15T15:57:42.081Z",
        "updatedAt": "2025-06-15T15:57:42.081Z",
        "isDeleted": false,
        "posts": [
            {
                "id": "6e9b66de-36b1-4a38-97b6-aee88ffa3949",
                "title": "Visiting The Zoo",
                "content": "Wonderful time at the zoo 😊!",
                "userId": "aa97dd1d-8733-4a43-ab0d-e0a5cba5db7c",
                "createdAt": "2025-06-16T07:25:34.637Z",
                "latUpdated": "2025-06-16T07:25:34.637Z",
                "isDeleted": false
            },
            {
                "id": "03d9c6b5-25b8-47d4-a959-44ffb1e3aad3",
                "title": "Visiting The Mall",
                "content": "Wonderful time at the mall 😊!",
                "userId": "aa97dd1d-8733-4a43-ab0d-e0a5cba5db7c",
                "createdAt": "2025-06-16T07:25:34.637Z",
                "latUpdated": "2025-06-16T07:25:34.637Z",
                "isDeleted": false
            }
        ]
    }
}
```

##### Error Handling

If you are entering an incorrect id:

```json
{
    "message": "User 'cd-c02b-4af6-85c7-4609df7c5841' Is Not Found! Check Again!"
}
```

#### POST /users

This endpoint will create a new user.

The request body content (in JSON format) is something like this:

```json
{
    "firstName": "Titus", 
    "lastName": "Maguna", 
    "emailAddress": "titusmaguna78@gmail.com", 
    "userName": "titusmaguna78"
}
```

You can access it via this site or just follow this Postman link to implement it: [POST /users](https://nathanael-7604382.postman.co/workspace/Nathanael's-Workspace~5b4242d0-11c7-4277-809b-10ca424c98a5/example/45838328-bb5aa33b-3963-4b07-af51-1d7277f12fbc?action=share&creator=45838328&ctx=documentation)

```md
127.0.0.1:8000/users
```

Sample Output:

```json
{
    "message": "User Created Successfully",
    "newUser": {
        "id": "f3fe3850-3c82-4c42-9b31-80b0dc33dd8b",
        "firstName": "Titus",
        "lastName": "Maguna",
        "emailAddress": "titusmaguna78@gmail.com",
        "userName": "titusmaguna78",
        "createdAt": "2025-06-16T16:16:25.127Z",
        "updatedAt": "2025-06-16T16:16:25.127Z",
        "isDeleted": false
    }
}
```

##### Error handling (POST users)

You will get a specific message if either first name, last name, email or username are missing.

#### GET /posts

This endpoint will retrieve all posts. It will also include the author's details for each post.

You can access it via this site or just follow this Postman link to implement it: [GET /posts](https://nathanael-7604382.postman.co/workspace/Nathanael's-Workspace~5b4242d0-11c7-4277-809b-10ca424c98a5/request/45838328-c7f915bc-4a80-4bd7-85b3-62696cb06eed?action=share&creator=45838328&ctx=documentation)

```md
127.0.0.1:8000/posts
```

Sample Output:

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

#### GET /posts/:id

This endpoint will retrieve a specific posts. It will also include the author's details for the post.

You can access it via this site or just follow this Postman link to implement it: [GET /posts/:id](https://nathanael-7604382.postman.co/workspace/Nathanael's-Workspace~5b4242d0-11c7-4277-809b-10ca424c98a5/request/45838328-d8d8aee0-ed63-4717-858a-acb15873d0bc?action=share&creator=45838328&ctx=documentation)

```md
http://127.0.0.1:8000/posts/6e9b66de-36b1-4a38-97b6-aee88ffa3949
```

Sample Output:

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

##### Error Handling (GET specific post)

If you are entering an incorrect id:

```json
{
    "message": "Post '1e1ba3cd-c02b-4af6-85c7-4609df7c5841' Is Not Found! Check Again!"
}
```

#### POST /posts

This endpoint will create a new post.

You can access it via this site or just follow this Postman link to implement it: [POST /posts](https://nathanael-7604382.postman.co/workspace/Nathanael's-Workspace~5b4242d0-11c7-4277-809b-10ca424c98a5/request/45838328-27e1f1f2-f285-4be1-beb9-15bccc471f2e?action=share&creator=45838328&ctx=documentation)

```md
127.0.0.1:8000/posts
```

Sample input:

```json
{
    "title": "Driving to Nakuru",
    "content": "#YOLO",
    "userId": "aa97dd1d-8733-4a43-ab0d-e0a5cba5db7c"
}
```

Expected output:

```json
{
    "message": "Post for user 'aa97dd1d-8733-4a43-ab0d-e0a5cba5db7c' Created Successfully",
    "newPost": {
        "id": "aed4444c-1e3e-4c4d-ad0b-7d576b08e464",
        "title": "Driving to Nakuru",
        "content": "#YOLO",
        "userId": "aa97dd1d-8733-4a43-ab0d-e0a5cba5db7c",
        "createdAt": "2025-06-16T16:11:55.855Z",
        "latUpdated": "2025-06-16T16:11:55.855Z",
        "isDeleted": false
    }
}
```

##### Error Handling (POST posts)

You will get a specific message for each if title, content or userId are missing.

#### PUT /posts/:id

This endpoint will update a specific post's details.

You can access it via this site or just follow this Postman link to implement it: [GET /posts](https://nathanael-7604382.postman.co/workspace/Nathanael's-Workspace~5b4242d0-11c7-4277-809b-10ca424c98a5/request/45838328-cb4506d2-7798-4bdf-a1af-4d71a8dc4cd4?action=share&creator=45838328&ctx=documentation)

```md
http://127.0.0.1:8000/posts/9b25f8fd-3c94-46e0-a00b-1dc184290734
```

Sample Input:

```json
{
    "title": "Bought a new dress😍",
    "content": "I can't believe my eyes 😊? #YOLO",
    "userId": "1e1ba3cd-c02b-4af6-85c7-4609df7c5841"
}
```

Sample Output: 

```json
{
    "message": "Post Updated Successfully",
    "updated_post": {
        "id": "9b25f8fd-3c94-46e0-a00b-1dc184290734",
        "title": "Bought a new dress😍",
        "content": "I can't believe my eyes 😊? #YOLO",
        "userId": "1e1ba3cd-c02b-4af6-85c7-4609df7c5841",
        "createdAt": "2025-06-16T11:13:06.651Z",
        "latUpdated": "2025-06-16T16:24:09.076Z",
        "isDeleted": true
    }
}
```

##### Error Handling (PUT posts)

If you are entering an incorrect id:

```json
{
    "message": "Post '1e1ba3cd-c02b-4af6-85c7-4609df7c5841' Is Not Found! Check Again!"
}
```

If title , content or userId are empty you will get a specific message for each.

#### DELETE /posts/:id

This endpoint will [soft-delete](https://www.geeksforgeeks.org/dbms/difference-between-soft-delete-and-hard-delete/) a specific post.

You can access it via this site or just follow this Postman link to implement it: [GET /posts](https://nathanael-7604382.postman.co/workspace/Nathanael's-Workspace~5b4242d0-11c7-4277-809b-10ca424c98a5/request/45838328-35ecee82-9423-4dc6-990b-96ecad1324dc?action=share&creator=45838328&ctx=documentation)

```md
http://127.0.0.1:8000/posts
```

Sample Output:

```json
{
    "message": "Post '6e9b66de-36b1-4a38-97b6-aee88ffa3949' Deleted Successfully!",
    "deleted_post": {
        "id": "6e9b66de-36b1-4a38-97b6-aee88ffa3949",
        "title": "Visiting The Zoo",
        "content": "Wonderful time at the zoo 😊!",
        "userId": "aa97dd1d-8733-4a43-ab0d-e0a5cba5db7c",
        "createdAt": "2025-06-16T07:25:34.637Z",
        "latUpdated": "2025-06-16T16:28:04.260Z",
        "isDeleted": true
    }
}
```

##### Error Handling (DELETE post)

If post has already been deleted(checked using middle-ware):

```json
{
    "message": "Post '6e9b66de-36b1-4a38-97b6-aee88ffa3949' Already Deleted!"
}
```

If you are entering an incorrect id:

```json
{
    "message": "Post '1e1ba3cd-c02b-4af6-85c7-4609df7c5841' Is Not Found! Check Again!"
}
```
