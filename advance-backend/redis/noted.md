## **Redis Notes**

Redis (Remote Dictionary Server) is an open-source, in-memory data structure store used as a database, cache, and message broker. It supports various data structures such as strings, hashes, lists, sets, sorted sets, bitmaps, hyperloglogs, and geospatial indexes.

---

### **1. Installation Using Docker**

To install Redis using Docker, follow these steps:

#### Pull the Redis Image

Run the following command to pull the official Redis image from Docker Hub:

```bash
docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
docker ps
docker exec -it docker_id bash
redis-cli ping
```

---

### **2. Redis Data Structures**

Redis supports several data structures, including:

1. **Strings**
2. **Lists**
3. **Sets**
4. **Sorted Sets**
5. **Hashes**
6. **Bitmaps**
7. **HyperLogLogs**
8. **Geospatial Indexes**
9. **Streams**

Below, we will cover all data types in detail with CLI and Node.js examples.

---
## **3. Strings in Redis**

Strings are the most basic Redis data type. They are binary-safe and can contain any data type (text, numbers, even serialized objects).

---

### 🔧 **Basic CLI String Commands**

#### **SET** – Set the value of a key

```bash
SET key "value"
SET count 100
```

#### **GET** – Get the value of a key

```bash
GET key
```

#### **DEL** – Delete a key

```bash
DEL key
```

#### **APPEND** – Append a value to a key

```bash
APPEND key "more text"
```

#### **STRLEN** – Get the length of the string value

```bash
STRLEN key
```

#### **MSET** – Set multiple keys at once

```bash
MSET key1 "val1" key2 "val2"
```

#### **MGET** – Get multiple keys at once

```bash
MGET key1 key2
```

#### **SETNX** – Set key only if it does not already exist

```bash
SETNX key "value"
```

#### **SETEX** – Set key with expiration in seconds

```bash
SETEX tempkey 10 "temporary value"
```

#### **GETSET** – Set new value and return the old value

```bash
GETSET key "new value"
```

#### **INCR** – Increment the integer value of a key

```bash
SET count 10
INCR count    # count becomes 11
```

#### **DECR** – Decrement the integer value of a key

```bash
DECR count    # count becomes 10
```

#### **INCRBY** – Increment by a specific value

```bash
INCRBY count 5
```

#### **DECRBY** – Decrement by a specific value

```bash
DECRBY count 2
```

#### **SETRANGE** – Overwrite part of the string

```bash
SET message "Hello World"
SETRANGE message 6 "Redis"
# Now message = "Hello Redis"
```

#### **GETRANGE** – Get a substring of the string

```bash
GETRANGE message 0 4
# Result: "Hello"
```

---

## 👨‍💻 Node.js Examples with `ioredis`

```javascript
const Redis = require("ioredis");
const redis = new Redis();

async function runStringExamples() {
  try {
    // SET and GET
    await redis.set("greeting", "Hello");
    const greeting = await redis.get("greeting");
    console.log("GET greeting:", greeting);

    // APPEND
    await redis.append("greeting", " World");
    const appended = await redis.get("greeting");
    console.log("After APPEND:", appended);

    // STRLEN
    const length = await redis.strlen("greeting");
    console.log("STRLEN greeting:", length);

    // MSET and MGET
    await redis.mset("key1", "val1", "key2", "val2");
    const values = await redis.mget("key1", "key2");
    console.log("MGET key1 key2:", values);

    // SETNX
    const wasSet = await redis.setnx("lock", "123");
    console.log("SETNX lock:", wasSet); // 1 if set, 0 if already exists

    // SETEX
    await redis.setex("temp", 5, "This will expire in 5 sec");

    // GETSET
    const oldValue = await redis.getset("counter", "10");
    console.log("GETSET counter:", oldValue);

    // INCR / DECR
    await redis.set("count", 1);
    await redis.incr("count");
    await redis.decr("count");
    console.log("Final count:", await redis.get("count"));

    // INCRBY / DECRBY
    await redis.incrby("count", 5);
    await redis.decrby("count", 2);
    console.log("Modified count:", await redis.get("count"));

    // SETRANGE / GETRANGE
    await redis.set("welcome", "Hello World");
    await redis.setrange("welcome", 6, "Redis");
    const substring = await redis.getrange("welcome", 0, 4);
    console.log("GETRANGE welcome:", substring); // "Hello"
  } catch (error) {
    console.error("Error:", error);
  } finally {
    redis.disconnect();
  }
}

runStringExamples();
```
---

## 🔢 **Redis Data Type: Lists**

### ✅ **What is a Redis List?**

* A **Redis List** is an **ordered collection of strings**.
* It is **implemented as a linked list**, meaning elements are stored in insertion order.
* You can add elements to **both the head (left)** and the **tail (right)** of the list.

---

### 🧠 **Key Characteristics**

* Elements are ordered.
* Duplicates are allowed.
* Supports operations like stack (LIFO) and queue (FIFO).

---

## 🔧 **Redis CLI List Commands**

### 🔽 **Add Elements**

| Command            | Description                       | Example             |
| ------------------ | --------------------------------- | ------------------- |
| `LPUSH key value`  | Push to the **left** (head)       | `LPUSH mylist "A"`  |
| `RPUSH key value`  | Push to the **right** (tail)      | `RPUSH mylist "B"`  |
| `LPUSHX key value` | Push to left only if list exists  | `LPUSHX mylist "X"` |
| `RPUSHX key value` | Push to right only if list exists | `RPUSHX mylist "Y"` |

---

### 🔼 **Remove Elements**

| Command    | Description            | Example       |
| ---------- | ---------------------- | ------------- |
| `LPOP key` | Pop from the **left**  | `LPOP mylist` |
| `RPOP key` | Pop from the **right** | `RPOP mylist` |

---

### 🔁 **Insert, Update, Delete**

| Command                | Description                 | Example                    |                                 |
| ---------------------- | --------------------------- | -------------------------- | ------------------------------- |
| `LINDEX key index`     | Get element at index        | `LINDEX mylist 0`          |                                 |
| `LSET key index value` | Set element at index        | `LSET mylist 1 "Z"`        |                                 |
| \`LINSERT key BEFORE   | AFTER pivot value\`         | Insert relative to a pivot | `LINSERT mylist BEFORE "B" "X"` |
| `LREM key count value` | Remove occurrences of value | `LREM mylist 2 "A"`        |                                 |

---

### 📏 **Length & Range**

| Command                 | Description             | Example                             |
| ----------------------- | ----------------------- | ----------------------------------- |
| `LLEN key`              | Get length of list      | `LLEN mylist`                       |
| `LRANGE key start stop` | Get a range of elements | `LRANGE mylist 0 -1` (all elements) |

---

### ⏳ **Blocking Commands (Queues / Streams)**

| Command                                 | Description                                                        | Example                    |
| --------------------------------------- | ------------------------------------------------------------------ | -------------------------- |
| `BLPOP key timeout`                     | Block and pop from left                                            | `BLPOP mylist 10`          |
| `BRPOP key timeout`                     | Block and pop from right                                           | `BRPOP mylist 10`          |
| `BRPOPLPUSH source destination timeout` | Pop from right of source and push left to destination (atomically) | `BRPOPLPUSH list1 list2 5` |

---

## 👨‍💻 Node.js Example using `ioredis`

```javascript
const Redis = require("ioredis");
const redis = new Redis();

async function listExample() {
  await redis.del("mylist");

  // Add elements
  await redis.rpush("mylist", "A", "B", "C");
  await redis.lpush("mylist", "X");

  // View all
  const all = await redis.lrange("mylist", 0, -1);
  console.log("List after push:", all); // ["X", "A", "B", "C"]

  // Get element by index
  console.log("Element at index 2:", await redis.lindex("mylist", 2));

  // Set index
  await redis.lset("mylist", 1, "Z");

  // Insert relative to another value
  await redis.linsert("mylist", "BEFORE", "B", "Y");

  // Remove a value
  await redis.lrem("mylist", 1, "A");

  // Get length
  const len = await redis.llen("mylist");
  console.log("Length:", len);

  // Pop
  const popped = await redis.lpop("mylist");
  console.log("Popped:", popped);

  // Final list
  const updated = await redis.lrange("mylist", 0, -1);
  console.log("Final list:", updated);
}

listExample();
```

---

## ✅ Summary Table

| Command                        | Purpose                             |
| ------------------------------ | ----------------------------------- |
| `LPUSH`, `RPUSH`               | Add elements to list (head or tail) |
| `LPOP`, `RPOP`                 | Remove elements                     |
| `LLEN`, `LRANGE`               | View list size and elements         |
| `LINDEX`, `LSET`               | Access or update elements by index  |
| `LINSERT`, `LREM`              | Insert near pivot / remove by value |
| `BLPOP`, `BRPOP`, `BRPOPLPUSH` | Blocking queue commands             |

---

## 💡 Use Cases of Lists in Redis

| Use Case                 | Description                                       |
| ------------------------ | ------------------------------------------------- |
| Task Queues              | Use `LPUSH` and `BRPOP` for worker queues         |
| Recent Activities        | Track user actions, chat messages                 |
| Logs                     | Append-only log storage with `RPUSH`              |
| Real-Time Data Pipelines | Combine with blocking commands for streaming jobs |

---

### **5. Sets**

Sets are unordered collections of unique strings.

#### **Basic Commands for Sets**

##### **CLI Examples**

- **SADD**: Add one or more members to a set.
  ```bash
  SADD fruits "apple"
  SADD fruits "banana" "cherry"
  ```
- **SMEMBERS**: Retrieve all members of a set.
  ```bash
  SMEMBERS fruits
  ```
- **SREM**: Remove a member from a set.
  ```bash
  SREM fruits "banana"
  ```
- **SISMEMBER**: Check if a member exists in a set.
  ```bash
  SISMEMBER fruits "apple"
  ```
- **SINTER**: Find the intersection of multiple sets.
  ```bash
  SADD set1 "a" "b" "c"
  SADD set2 "b" "c" "d"
  SINTER set1 set2
  ```
- **SUNION**: Find the union of multiple sets.
  ```bash
  SUNION set1 set2
  ```
- **SDIFF**: Find the difference between sets.
  ```bash
  SDIFF set1 set2
  ```

##### **Node.js Example**

```javascript
const Redis = require("ioredis");
const redis = new Redis();

async function runSetExamples() {
  try {
    // SADD: Add elements to a set
    await redis.sadd("fruits", "apple");
    await redis.sadd("fruits", "banana", "cherry");
    console.log('SADD fruits: ["apple", "banana", "cherry"]');

    // SMEMBERS: Retrieve all members of a set
    const fruits = await redis.smembers("fruits");
    console.log(`SMEMBERS fruits: ${fruits}`);

    // SREM: Remove a member from a set
    await redis.srem("fruits", "banana");
    console.log('SREM fruits: Removed "banana"');

    // SISMEMBER: Check if a member exists in a set
    const hasApple = await redis.sismember("fruits", "apple");
    console.log(`SISMEMBER fruits apple: ${hasApple ? "Yes" : "No"}`);

    // SINTER: Find the intersection of multiple sets
    await redis.sadd("set1", "a", "b", "c");
    await redis.sadd("set2", "b", "c", "d");
    const intersection = await redis.sinter("set1", "set2");
    console.log(`SINTER set1 set2: ${intersection}`);

    // SUNION: Find the union of multiple sets
    const union = await redis.sunion("set1", "set2");
    console.log(`SUNION set1 set2: ${union}`);

    // SDIFF: Find the difference between sets
    const difference = await redis.sdiff("set1", "set2");
    console.log(`SDIFF set1 set2: ${difference}`);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    redis.disconnect();
  }
}

runSetExamples();
```

---

### **6. Sorted Sets**

Sorted Sets are similar to sets but with scores associated with each member.

#### **Basic Commands for Sorted Sets**

##### **CLI Examples**

- **ZADD**: Add members with scores to a sorted set.
  ```bash
  ZADD leaderboard 100 "Alice"
  ZADD leaderboard 200 "Bob" 150 "Charlie"
  ```
- **ZRANGE**: Retrieve members in a range by index.
  ```bash
  ZRANGE leaderboard 0 -1 WITHSCORES
  ```
- **ZREM**: Remove a member from a sorted set.
  ```bash
  ZREM leaderboard "Alice"
  ```
- **ZSCORE**: Get the score of a member.
  ```bash
  ZSCORE leaderboard "Bob"
  ```
- **ZRANK**: Get the rank of a member.
  ```bash
  ZRANK leaderboard "Charlie"
  ```

##### **Node.js Example**

```javascript
const Redis = require("ioredis");
const redis = new Redis();

async function runSortedSetExamples() {
  try {
    // ZADD: Add members with scores to a sorted set
    await redis.zadd("leaderboard", 100, "Alice");
    await redis.zadd("leaderboard", 200, "Bob", 150, "Charlie");
    console.log("ZADD leaderboard: Alice=100, Bob=200, Charlie=150");

    // ZRANGE: Retrieve members in a range by index
    const leaderboard = await redis.zrange("leaderboard", 0, -1, "WITHSCORES");
    console.log(`ZRANGE leaderboard: ${leaderboard}`);

    // ZREM: Remove a member from a sorted set
    await redis.zrem("leaderboard", "Alice");
    console.log('ZREM leaderboard: Removed "Alice"');

    // ZSCORE: Get the score of a member
    const bobScore = await redis.zscore("leaderboard", "Bob");
    console.log(`ZSCORE leaderboard Bob: ${bobScore}`);

    // ZRANK: Get the rank of a member
    const charlieRank = await redis.zrank("leaderboard", "Charlie");
    console.log(`ZRANK leaderboard Charlie: ${charlieRank}`);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    redis.disconnect();
  }
}

runSortedSetExamples();
```

---

### **7. Hashes**

Hashes are maps between string fields and string values.

#### **Basic Commands for Hashes**

##### **CLI Examples**

- **HSET**: Set field-value pairs in a hash.
  ```bash
  HSET user:1 name "Alice" age 30
  ```
- **HGET**: Get the value of a field.
  ```bash
  HGET user:1 name
  ```
- **HGETALL**: Get all field-value pairs.
  ```bash
  HGETALL user:1
  ```
- **HDEL**: Delete a field.
  ```bash
  HDEL user:1 age
  ```

##### **Node.js Example**

```javascript
const Redis = require("ioredis");
const redis = new Redis();

async function runHashExamples() {
  try {
    // HSET: Set field-value pairs in a hash
    await redis.hset("user:1", "name", "Alice", "age", 30);
    console.log('HSET user:1: name="Alice", age=30');

    // HGET: Get the value of a field
    const name = await redis.hget("user:1", "name");
    console.log(`HGET user:1 name: ${name}`);

    // HGETALL: Get all field-value pairs
    const user = await redis.hgetall("user:1");
    console.log(`HGETALL user:1: ${JSON.stringify(user)}`);

    // HDEL: Delete a field
    await redis.hdel("user:1", "age");
    console.log('HDEL user:1: Removed "age"');
  } catch (error) {
    console.error("Error:", error);
  } finally {
    redis.disconnect();
  }
}

runHashExamples();
```

---

### **8. Bitmaps**

Bitmaps allow bit-level operations on strings.

#### **Basic Commands for Bitmaps**

##### **CLI Examples**

- **SETBIT**: Set a bit at a specific offset.
  ```bash
  SETBIT bitmap 0 1
  ```
- **GETBIT**: Get the value of a bit at a specific offset.
  ```bash
  GETBIT bitmap 0
  ```
- **BITCOUNT**: Count the number of set bits.
  ```bash
  BITCOUNT bitmap
  ```

##### **Node.js Example**

```javascript
const Redis = require("ioredis");
const redis = new Redis();

async function runBitmapExamples() {
  try {
    // SETBIT: Set a bit at a specific offset
    await redis.setbit("bitmap", 0, 1);
    console.log("SETBIT bitmap: Set bit at offset 0");

    // GETBIT: Get the value of a bit at a specific offset
    const bit = await redis.getbit("bitmap", 0);
    console.log(`GETBIT bitmap 0: ${bit}`);

    // BITCOUNT: Count the number of set bits
    const count = await redis.bitcount("bitmap");
    console.log(`BITCOUNT bitmap: ${count}`);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    redis.disconnect();
  }
}

runBitmapExamples();
```

---

### **9. HyperLogLogs**

HyperLogLogs estimate the cardinality of a set.

#### **Basic Commands for HyperLogLogs**

##### **CLI Examples**

- **PFADD**: Add elements to a HyperLogLog.
  ```bash
  PFADD hll "item1" "item2"
  ```
- **PFCOUNT**: Estimate the cardinality.
  ```bash
  PFCOUNT hll
  ```
- **PFMERGE**: Merge multiple HyperLogLogs.
  ```bash
  PFMERGE merged hll1 hll2
  ```

##### **Node.js Example**

```javascript
const Redis = require("ioredis");
const redis = new Redis();

async function runHyperLogLogExamples() {
  try {
    // PFADD: Add elements to a HyperLogLog
    await redis.pfadd("hll", "item1", "item2");
    console.log("PFADD hll: Added items");

    // PFCOUNT: Estimate the cardinality
    const count = await redis.pfcount("hll");
    console.log(`PFCOUNT hll: ${count}`);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    redis.disconnect();
  }
}

runHyperLogLogExamples();
```

---

### **10. Geospatial Indexes**

Geospatial Indexes store and query location-based data.

#### **Basic Commands for Geospatial Indexes**

##### **CLI Examples**

- **GEOADD**: Add locations.
  ```bash
  GEOADD cities -122.4235 37.7763 "San Francisco"
  ```
- **GEODIST**: Calculate the distance between two locations.
  ```bash
  GEODIST cities "San Francisco" "New York" km
  ```
- **GEORADIUS**: Find locations within a radius.
  ```bash
  GEORADIUS cities -122.4235 37.7763 100 km
  ```

##### **Node.js Example**

```javascript
const Redis = require("ioredis");
const redis = new Redis();

async function runGeoExamples() {
  try {
    // GEOADD: Add locations
    await redis.geoadd("cities", -122.4235, 37.7763, "San Francisco");
    console.log("GEOADD cities: Added San Francisco");

    // GEODIST: Calculate the distance between two locations
    const distance = await redis.geodist(
      "cities",
      "San Francisco",
      "New York",
      "km"
    );
    console.log(`GEODIST cities: ${distance} km`);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    redis.disconnect();
  }
}

runGeoExamples();
```

---

### **11. Streams**

Streams are append-only logs for messaging and event sourcing.

#### **Basic Commands for Streams**

##### **CLI Examples**

- **XADD**: Add an entry to a stream.
  ```bash
  XADD mystream * sensor-id 1234 temperature 25
  ```
- **XRANGE**: Retrieve entries in a range.
  ```bash
  XRANGE mystream - +
  ```
- **XREAD**: Read from multiple streams.
  ```bash
  XREAD COUNT 2 STREAMS mystream 0
  ```

##### **Node.js Example**

```javascript
const Redis = require("ioredis");
const redis = new Redis();

async function runStreamExamples() {
  try {
    // XADD: Add an entry to a stream
    await redis.xadd("mystream", "*", "sensor-id", 1234, "temperature", 25);
    console.log("XADD mystream: Added entry");

    // XRANGE: Retrieve entries in a range
    const entries = await redis.xrange("mystream", "-", "+");
    console.log(`XRANGE mystream: ${entries}`);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    redis.disconnect();
  }
}

runStreamExamples();
```

---

### **Conclusion**

This guide now includes examples for all Redis data types, covering both CLI and Node.js (`ioredis`) usage. You can use these examples to experiment with Redis and build applications leveraging its rich set of features.

How we can scale websockets servers using pub-sub model (

)


to use redis in nodejs we use npm i ioredis
what is pub/sub ??
how we can scale websocket servers using pub-sub and also draw its architecture of using pub/sub to handle 1 million subscriber 