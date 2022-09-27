# JournalBooks
The program that will store some notes, story, and idea

# Depedencies
-    "connect-mongo": "^4.6.0",
-    "dotenv": "^16.0.2",
-    "express": "^4.18.1",
-    "express-handlebars": "^6.0.6",
-    "express-session": "^1.17.3",
-    "method-override": "^3.0.0",
-    "moment": "^2.29.4",
-    "mongodb": "^4.10.0",
-    "mongoose": "^6.6.1",
-    "morgan": "^1.10.0",
-    "passport": "^0.6.0",
-    "passport-google-oauth20": "^2.0.0"

# Depedencies role and explanation
- ## connect-mongo
    - To ensure the connection MongoDB with server even when server reset
- ## dotenv
    - Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.
    - > Basically dotenv package deal with process.env function that will be called for port
- ## express
    - Express Framework for nodeJS
- ## express-handlebars
    - Handling View of express
- ## express-session
    - Handling express session and cookies 
- ## method-override
    - Let you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it
    > It allow to use PUT and DELETE from our template
- ## moment
    - to print time
- ## mongodb
    - Allow you to use mongodb command
- ## morgan
    - Express Logger
    - Used to log HTTP requests and errors, and simplifies the process
- ## mongoose
    - mongodb tools for Object Data Modeling
    - Using promise 
- ## passport
    - For Authencation

