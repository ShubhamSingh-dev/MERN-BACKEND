What is ODM and ORM ?

### 🔸 What is **ORM**?

**ORM = Object Relational Mapping**

* It's a **tool** or **library** that connects your code (objects) with a **SQL database** (like MySQL or PostgreSQL).
* It lets you use **objects in your code** to interact with **rows and tables** in the database—without writing SQL.

👉 Instead of writing:

```sql
SELECT * FROM users WHERE id = 1;
```

You can write in JavaScript:

```js
const user = await User.findByPk(1);
```

📌 Popular ORMs: **Sequelize** (for Node.js), **TypeORM**, **Prisma**, **Hibernate** (Java)

---

### 🔸 What is **ODM**?

**ODM = Object Document Mapping**

* It’s similar to ORM, but used for **NoSQL databases** like **MongoDB**.
* In NoSQL, data is stored as **documents** (not rows/tables).
* ODM maps your code’s objects to those **JSON-like documents** in the database.

👉 Instead of writing:

```js
db.users.insertOne({ name: 'Shubham', age: 20 });
```

You can write:

```js
const user = new User({ name: 'Shubham', age: 20 });
await user.save();
```

📌 Popular ODM: **Mongoose** (for MongoDB in Node.js)

🔹 What is Mongoose?
Mongoose is an ODM (Object Document Mapper) for MongoDB in Node.js.

It helps you:

Define a schema (structure) for your MongoDB data.

Validate data before saving to the database.

Use JavaScript objects to interact with MongoDB documents.

 it checks (validates) your data before saving.

For example, if your schema says age must be a number, and you try to save a string, Mongoose will stop it.

Where do we connect our moongose to MOngoDb 
its by Making dir Config -- db.js -- and writing the code 
and use it index.js by ConnectDB();

and models made in 
models -- 

Schema is a constructor method hota hai , object except krta hai 
and usning the schema you make MOdel 

then make routes to use all 
making CRUD operation 