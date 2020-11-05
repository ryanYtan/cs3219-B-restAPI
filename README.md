# CS3219 Task B

## Pre-requisites
* MongoDB: DBMS
* Postman: To manually serve API requests
* Node: Back-end framework

## Set-up
1. In a shell, run `mongod` and leave it running
2. In another shell, clone the repo and `cd` into the directory
3. Run `npm install` to install node dependencies
4. Run `nodemon` or `node index.js` to start the server
5. You can access the server at `localhost:8080`

## Task B1 - RESTful API
After running the server, you can use Postman to test REST calls. The supported
REST calls are:

* `GET     /api/persons`
* `GET     /api/persons/{username}`
* `POST    /api/persons`
* `PUT     /api/persons/{username}`
* `DELETE  /api/persons/{username}`

The body of a `POST` or `PUT` request should have the followed key-value pairs,
with the `content-type` being `x-www-form-urlencoded`.

```json
{
    userName:   {user_name} // alphanumeric, no spaces
    firstName:  John
    lastName:   Doe
    email:      johndoe@example.com
    phone:      12345678
}
```

An example Postman session for `POST` request is shown below

![](./images/img1.png)

## Task B2 - API Test Cases and Travis CI/CD

## Task B3 - Automatic deployment to Serverless

## Task B4
-
