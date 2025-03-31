Here's the corrected and properly formatted `notes.md` file:

```markdown
# Node.js Basics

## Initializing a Node.js Project

To initialize a Node.js project, use one of the following commands:

- `npm init` (interactive mode - prompts for project details)
- `npm init -y` (uses default settings, skips all prompts)

This creates a `package.json` file in your project directory.

### Adding a Start Script

To avoid repeatedly typing `node index.js` to run your application:

1. Open `package.json`
2. Add a start script under the `"scripts"` section:

```json
"scripts": {
    "start": "node index.js"
}
```

Then you can run your application with:
```bash
npm start
```

## Modules in Node.js

To use code from one file in another file, you need to:

1. Export from the source file
2. Require in the destination file

### Basic Export and Require

**Exporting a single function:**
```javascript
// file.js
const add = (a, b) => a + b;
module.exports = add;
```

**Requiring and using it:**
```javascript
// anotherFile.js
const addFunction = require('./file.js');
console.log(addFunction(2, 3)); // 5
```

### Exporting Multiple Functions

**Exporting:**
```javascript
// file.js
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;

module.exports = {
    add,
    subtract
};
```

**Using the exported functions:**
```javascript
// anotherFile.js
const mathOps = require('./file.js');
console.log(mathOps.add(5, 3));      // 8
console.log(mathOps.subtract(5, 3)); // 2
```

### Named Exports

You can export functions with different names:

**Exporting:**
```javascript
// file.js
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;

module.exports = {
    addFunc: add,
    subFunc: subtract
};
```

**Using the named exports:**
```javascript
// anotherFile.js
const math = require('./file.js');
console.log(math.addFunc(10, 5)); // 15
console.log(math.subFunc(10, 5)); // 5
```

### Destructuring Imports

Instead of using the full module object, you can destructure the required functions directly:

```javascript
// Instead of:
const math = require('./file.js');
math.addFunc(10, 5);
math.subFunc(10, 5);

// You can use destructuring:
const { addFunc, subFunc } = require('./file.js');
addFunc(10, 5);  // 15
subFunc(10, 5);  // 5
```

# File System Operations in Node.js

The `fs` module provides both synchronous (blocking) and asynchronous (non-blocking) methods for file operations.

## Basic File Operations

### 1. Writing Files

**Synchronous (Blocking):**
```javascript
fs.writeFileSync("./test.txt", "Hello World this is a test file");
```

**Asynchronous (Non-blocking):**
```javascript
fs.writeFile("./test.txt", "Hello World this is a test file", (err) => {
  if (err) throw err;
  console.log("The file has been saved!");
});
```

### 2. Reading Files

**Synchronous:**
```javascript
const res = fs.readFileSync("./test.txt", "utf-8");
console.log(res);
```

**Asynchronous:**
```javascript
fs.readFile("./test.txt", "utf-8", (err, response) => {
  if (err) throw err;
  console.log(response);
});
```

### 3. Updating/Appending Files

**Synchronous:**
```javascript
fs.appendFileSync("./test.txt", new Date().toString());
```

**Asynchronous:**
```javascript
fs.appendFile("./test.txt", new Date().toString(), (err) => {
  if (err) throw err;
  console.log("The file has been updated!");
});
```

### 4. Deleting Files

**Synchronous:**
```javascript
fs.unlinkSync("./test.txt");
```

**Asynchronous:**
```javascript
fs.unlink("./test.txt", (err) => {
  if (err) throw err;
  console.log("The file has been deleted!");
});
```

## Additional Common Methods

### 1. Copying Files
```javascript
fs.cpSync("source.txt", "destination.txt");
```

### 2. Renaming Files
```javascript
fs.renameSync("oldname.txt", "newname.txt");
```

### 3. Creating Directories
```javascript
fs.mkdirSync("new-directory");
```

### 4. Checking File Status
```javascript
const stats = fs.statSync("file.txt");
console.log(stats.isFile()); // true
console.log(stats.size); // file size in bytes
```

## Key Differences

| Synchronous | Asynchronous |
|-------------|--------------|
| Blocking execution | Non-blocking execution |
| Uses `*Sync` suffix | Uses callback/promise |
| Simpler error handling (try/catch) | Error-first callbacks |
| Not recommended for production | Preferred for production |

**Best Practice:** Use asynchronous methods for production applications to maintain performance.

# Nodejs architecture : 

![alt text](image.png)
Here's a simplified explanation of the Node.js architecture based on your image:

## 🔄 How Node.js Handles Requests

1. **Incoming Request**  
   - When a request arrives, Node.js puts it in the **Event Queue**

2. **Event Loop Checks**  
   - The main thread (Event Loop) picks up the request  
   - If it's a:  
     - **Simple operation** → Processes immediately  
     - **Blocking operation** (file I/O, database call) → Handles differently  

3. **Handling Blocking Operations**  
   ```plaintext
   "I need a thread/worker" → Assigns from Thread Pool
   ```
   - Worker thread handles the heavy task  
   - Main thread continues processing other requests (non-blocking)  

4. **Completion**  
   - When worker finishes:  
     1. Puts result in callback queue  
     2. Event Loop sends response back to client  

## 🏗️ Key Components

| Component       | Role                                                                 |
|-----------------|----------------------------------------------------------------------|
| **Event Queue** | Holds incoming requests in order                                    |
| **Event Loop**  | Main coordinator (single thread that never blocks)                  |
| **Thread Pool** | 4 worker threads (by default) for heavy tasks                       |
| **Worker**      | Does actual work for blocking operations while main thread stays free|

## ⚡ Why This Rocks

- **Single Thread** = Less memory usage  
- **Non-Blocking** = Handles 1000s of concurrent requests  
- **Workers** = Heavy tasks don't slow everything down  

## 🍔 Burger Shop Analogy

1. **You (Event Loop)**: Takes orders (requests)  
2. **Kitchen (Thread Pool)**: 4 cooks (workers) make burgers (blocking tasks)  
3. **Result**: You keep taking orders while burgers cook → No customer waits!
```
You can check using 
const os = require("os")
console.log(os.cpus().length);
