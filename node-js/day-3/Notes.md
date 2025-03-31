
# 📂 Path Module in Node.js

> *"When we have many files to manage, the path module helps us handle them efficiently"*

```javascript
const path = require("path")
```

## 🔍 Basic Path Variables
```javascript
console.log("FILENAME📂", __filename)  // Shows current file's full path
console.log("DIRNAME📂", __dirname)   // Shows current folder's path
```
*Note: These work in CommonJS (Node's default). In ES Modules, you'd use `import.meta.url` instead.*

---

## 🏫 School Management System Example
*Managing student data files:*
```text
//* folders/students/data.txt
```

### 1. path.join() - Building Paths
```javascript
const filepath = path.join("folder", "students", "data.txt")
// Output: folders/students/data.txt 
// (Uses \ on Windows, / on Mac/Linux automatically)
```

### 2. path.parse() - Understanding Paths
```javascript
const parsedDataPath = path.parse(filepath)
// Why this format? It breaks down the path into an object!
```
*Compare with JSON:*
- `JSON.stringify()` → Object to String
- `JSON.parse()` → String to Object

---

## 🛠️ Complete Path Toolkit
```javascript
const resolvedPath = path.resolve(filepath) // Gets absolute path
const extname = path.extname(filepath)     // Gets '.txt'
const basename = path.basename(filepath)   // Gets 'data.txt'
const dirname = path.dirname(filepath)     // Gets parent folder

console.log({
    parsedDataPath,  // The broken-down path object
    resolvedPath,    // Absolute system path
    extname,        // File extension
    basename,       // Filename with extension
    dirname         // Containing folder
})
```

## ✏️ Handwritten Notes Preserved:
```
1. path.join() combines folders nicely
2. parse() gives us an object because:
   - Easier to work with than strings
   - Like JSON.parse() makes strings usable
3. Remember:
   - __filename = where THIS file lives
   - __dirname = its parent folder
4. Backslashes (\) vs Forward slashes (/)
   - Node handles this automatically!
```

## 💡 Pro Tip
Always use `path.join()` instead of manual strings:
```javascript
// 👍 Better
path.join("data", "students.json") 

// 👎 Avoid
"data/" + "students.json"
```
*This prevents cross-platform issues!*


# 📢 Events in Node.js

> *"Events are like announcements - someone emits them, others listen for them"*

## 🏗️ Setting Up Events
```javascript
const EventEmitter = require("events");  // Import Event constructor
const emitter = new EventEmitter();     // Create our event emitter
```

## 🔑 Two Key Methods

### 1. `emitter.on()` - The Listener
*Creates an event listener ("when X happens, do Y")*
```javascript
emitter.on("GREET", (args) => {
  console.log(`Hello World ${args.username} (ID: ${args.id})`);
});
```

### 2. `emitter.emit()` - The Trigger
*Fires/executes the event*
```javascript
emitter.emit("GREET", {
  username: "Suraj",
  id: "10asldhasildh9021873nlkasc"
});
```

## ✏️ Handwritten Notes Preserved:
```
What are events?
- Like announcements in a system
- Need to initialize first:
  1. Require the events module
  2. Create emitter instance

Key Methods:
- on() → Creates the listener
- emit() → Triggers the event

Best Practice:
- Pass data as objects (not separate args)
- Example: 
  emitter.emit("GREET", {user: "Suraj", id: "123"})
  
Avoid:
  emitter.emit("GREET", "Suraj", "123")
```

## 💡 Why Objects Are Better
```javascript
// 👍 Recommended (single object)
emitter.emit("GREET", {
  username: "Suraj",
  id: "10asldhasildh9021873nlkasc"
});

// 👎 Less maintainable (multiple args)
emitter.emit("GREET", "Suraj", "10asldhasildh9021873nlkasc");
```
*Benefits:*
1. Clear parameter names
2. Easier to add/remove fields
3. More readable code

## 🎯 Real-World Example
```javascript
// Server event example
emitter.on("USER_LOGIN", (user) => {
  console.log(`${user.name} logged in at ${new Date()}`);
  saveToDatabase(user);
});

// When login happens
emitter.emit("USER_LOGIN", {
  name: "Suraj",
  email: "suraj@example.com",
  ip: "192.168.1.1"
});
```

> Pro Tip: Events are great for decoupling code - the emitter doesn't need to know who's listening!



