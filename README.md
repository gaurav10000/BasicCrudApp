
# Basic Crud User Management API's

This is a basic crud backend for User Management, you can register your self by creating an account by providing some details and can login to it. This is just an assignment.




## Run Locally

Follow these steps to locally run this: 

Clone the project 

```bash
  git clone https://github.com/gaurav10000/BasicCrudApp.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`MONGO_URI`


## Tech Stack


**Server:**  Node, Express
**DataBase:** MongoDB




## API Reference

#### Register yourself

```http
  Post /register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Your Name |
| `email` | `string` | **Required**. Your email |
| `password` | `string` | **Required**. Your password |


#### Login to your account

```http
  Post /login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email` | `string` | **Required**. Your email |
| `password` | `string` | **Required**. Your password |


## 🚀 About Me
Hi, my name is Gaurav and I am a noob full stack developer

