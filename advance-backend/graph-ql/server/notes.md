# **📌 GraphQL Full Guide**

## **🔹 1. What is GraphQL?**

GraphQL is a **query language for APIs** and a **runtime** that allows clients to request only the data they need. It was developed by **Facebook** in 2012 and open-sourced in 2015.

✅ **Key Benefits of GraphQL over REST:**
| Feature | GraphQL | REST |
|------------|--------|------|
| **Endpoint** | Single (`/graphql`) | Multiple (`/posts`, `/users`, etc.) |
| **Fetching** | Request only needed fields | Returns entire objects |
| **Over-fetching** | ❌ No | ✅ Yes |
| **Under-fetching** | ❌ No | ✅ Yes |
| **Real-time Updates** | ✅ Yes (Subscriptions) | ❌ No (Needs WebSockets) |

---

## **🔹 2. GraphQL Architecture**

GraphQL consists of:

- **Client** – Sends queries and mutations(mutation means change).
- **Server** – Resolves client requests.
- **Schema** – Defines the types and operations.

📌 A GraphQL server **typically** has:

1. **Schema Definition (`typeDefs`)**
2. **Resolvers (Functions handling queries/mutations)**
3. **A GraphQL API Endpoint (`/graphql`)**

---

## **🔹 3. Setting Up GraphQL with Express & Apollo Server**

📌 **Install Dependencies:**

```sh
npm install express @apollo/server body-parser cors axios
```

📌 **Basic Express + GraphQL Setup:**

```javascript
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";

async function startServer() {
  const app = express();

  const typeDefs = `
        type Query {
            hello: String
        }
    `;

  const resolvers = {
    Query: {
      hello: () => "Hello, GraphQL!",
    },
  };

  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();
  app.use(bodyParser.json());
  app.use(cors());
  app.use("/graphql", expressMiddleware(server));

  app.listen(8000, () => {
    console.log("Server running at http://localhost:8000/graphql");
  });
}

startServer();
```

💡 **Run the server:**

```sh
node server.js
```

Then open **GraphQL Playground:**  
👉 [http://localhost:8000/graphql](http://localhost:8000/graphql)

---

## **🔹 4. GraphQL Schema (`typeDefs`)**

GraphQL uses a schema to define:

- **Types** (Objects like `User`, `Post`)
- **Queries** (Fetching Data)
- **Mutations** (Modifying Data)
- **Subscriptions** (Real-time Updates)

### 📌 **Example Schema**

```graphql
type User {
  id: ID!
  name: String!
  email: String!
}

type Query {
  getUsers: [User]
  getUser(id: ID!): User
}

type Mutation {
  createUser(name: String!, email: String!): User
}
```

---

## **🔹 5. GraphQL Operations**

### **1️⃣ Queries (Fetching Data)**

GraphQL queries let you fetch **specific fields**.

**Example Query:** Fetching all users

```graphql
query {
  getUsers {
    id
    name
  }
}
```

**Example Query:** Fetching a single user

```graphql
query {
  getUser(id: 1) {
    name
    email
  }
}
```

---

### **2️⃣ Mutations (Creating, Updating, Deleting)**

📌 Mutations **modify data** (like `POST`, `PUT`, `DELETE` in REST).

#### ✅ **Creating a New User**

**GraphQL Mutation:**

```graphql
mutation {
  createUser(name: "John Doe", email: "john@example.com") {
    id
    name
  }
}
```

#### ✅ **Updating a User**

```graphql
mutation {
  updateUser(id: 1, name: "John Updated") {
    id
    name
  }
}
```

#### ✅ **Deleting a User**

```graphql
mutation {
  deleteUser(id: 1) {
    message
  }
}
```

---

### **3️⃣ Subscriptions (Real-Time Updates)**

GraphQL **Subscriptions** allow real-time data updates.

📌 **Example Subscription:**

```graphql
subscription {
  userAdded {
    id
    name
  }
}
```

🔥 **How It Works?**

- Whenever a new user is created, **all clients listening** to `userAdded` **receive an update automatically**.

🚀 **Requires WebSockets** (like Apollo Server with `subscriptions-transport-ws`).

---

## **🔹 6. GraphQL Resolvers**

Resolvers define **how GraphQL queries/mutations work**.

📌 **Example Resolvers (JavaScript)**

```javascript
const resolvers = {
  Query: {
    getUsers: async () =>
      (await axios.get("https://jsonplaceholder.typicode.com/users")).data,
    getUser: async (_, { id }) =>
      (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`))
        .data,
  },
  Mutation: {
    createUser: async (_, { name, email }) => {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        { name, email }
      );
      return response.data;
    },
  },
};
```

---

## **🔹 7. GraphQL vs REST API**

| Feature                       | GraphQL                   | REST                              |
| ----------------------------- | ------------------------- | --------------------------------- |
| **Multiple Endpoints?**       | ❌ No (Single `/graphql`) | ✅ Yes (e.g., `/posts`, `/users`) |
| **Fetch Only Needed Fields?** | ✅ Yes                    | ❌ No                             |
| **Nested Queries?**           | ✅ Yes                    | ❌ No (Requires multiple calls)   |
| **Real-time Updates?**        | ✅ Yes (Subscriptions)    | ❌ No (Needs WebSockets)          |

---

## **🔹 8. GraphQL Best Practices**

✅ **Use Pagination** (for large datasets)  
✅ **Use Batching** (to minimize network calls)  
✅ **Secure API with Authentication**  
✅ **Implement Rate Limiting** (to prevent abuse)

---

## **🔹 9. Advanced GraphQL Features**

🔥 **GraphQL Directives** – Modify queries dynamically (`@include(if: true)`)  
🔥 **GraphQL Federation** – Combine multiple GraphQL APIs  
🔥 **GraphQL Caching** – Use **Dataloader** for performance

---

## **🔹 10. When NOT to Use GraphQL?**

❌ If your API is **simple** (REST is easier for basic use cases).  
❌ If you have **highly cached** data (GraphQL queries can be expensive).  
❌ If you **don’t need nested queries**.

---

## **🚀 Final Summary**

- **GraphQL is a powerful alternative to REST.**
- It allows fetching **only the required data**.
- Supports **real-time updates** with **subscriptions**.
- Uses **Resolvers** to handle queries & mutations.
- **Single endpoint (`/graphql`)** for all requests.

---

### 🎯 **Want More?**
