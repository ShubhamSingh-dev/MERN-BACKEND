# **Node.js Crypto Module Notes**

## **Introduction to the Crypto Module**
The `crypto` module in Node.js provides cryptographic functionality, including:
- Generating random data (for tokens, salts, keys).
- Hashing (one-way encryption).
- Encryption & decryption (two-way, with keys).
- Digital signatures & verification.

---

## **1. `randomBytes` - Generating Random Data**
### **Code Example**
```javascript
const randomValues = crypto.randomBytes(100); // Generates 100 random bytes
console.log(randomValues.toString("hex")); // Converts to hexadecimal string
```
### **Explanation**
- **`crypto.randomBytes(size)`** → Generates cryptographically secure random bytes.
  - `size`: Number of bytes to generate (e.g., `100`).
- **Output**: A **Buffer** (raw binary data).  
  - Convert to readable format using `.toString("hex")` (hexadecimal) or `"base64"`.
- **Use Cases**:
  - Generating secure tokens (e.g., session IDs, CSRF tokens).
  - Creating salts for password hashing.

---

## **2. `createHash` - Hashing Data (One-Way Encryption)**
### **Code Example**
```javascript
const hashValue = crypto.createHash("sha256").update("Suraj").digest("hex");
```
### **Explanation**
- **`crypto.createHash(algorithm)`** → Creates a hash object.
  - Common algorithms: `"sha256"`, `"md5"`, `"sha512"`.
- **`.update(data)`** → Feeds data into the hash.
- **`.digest(encoding)`** → Finalizes hash computation.
  - Encoding: `"hex"`, `"base64"`, `"binary"`.
- **Hashing is One-Way**:
  - You **cannot** reverse a hash back to the original input.
  - Used for:
    - Password storage (never store plaintext passwords!).
    - Data integrity checks (e.g., file checksums).

### **Example: Password Matching**
```javascript
const inputValue = "Surajs";
const matchValue = crypto.createHash("sha256").update(inputValue).digest("hex");

if (hashValue === matchValue) {
  console.log("You can login.");
} else {
  console.log("Something went wrong.");
}
```
- **Why Compare Hashes?**  
  - If two inputs produce the same hash, they are considered identical.
  - Protects against password leaks (only hashes are stored, not plaintext).

---

## **3. Encryption vs. Decryption**
### **Encryption**
- **Definition**: Process of converting plaintext into ciphertext (scrambled data) using a key.
- **Purpose**: Securely transmit/store data so only authorized parties can read it.
- **Types**:
  - **Symmetric Encryption** (AES, DES): Same key encrypts & decrypts.
  - **Asymmetric Encryption** (RSA): Public key encrypts, private key decrypts.

### **Decryption**
- **Definition**: Converting ciphertext back to plaintext using a key.
- **Requires**:
  - Correct key (symmetric) or private key (asymmetric).
  - Same algorithm used for encryption.

### **Example (AES Encryption in Node.js)**
```javascript
const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
let encrypted = cipher.update("Hello World", "utf8", "hex");
encrypted += cipher.final("hex");

const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
let decrypted = decipher.update(encrypted, "hex", "utf8");
decrypted += decipher.final("utf8");

console.log(decrypted); // "Hello World"
```

---

## **Key Takeaways**
1. **`randomBytes`** → Use for secure randomness (tokens, salts).
2. **`createHash`** → Use for irreversible data hashing (passwords, checksums).
3. **Encryption** → Two-way (needs a key), **Hashing** → One-way (no key).
4. **Never store plaintext passwords** → Always hash + salt them.
5. **Use modern algorithms**:
   - Hashing: `sha256` or `sha512`.
   - Encryption: `aes-256` or `rsa`.

---

## **Further Learning**
- [Node.js Crypto Docs](https://nodejs.org/api/crypto.html)
- Try implementing:
  - Password hashing with salt (`crypto.scrypt`).
  - Symmetric encryption (`AES`).
  - Asymmetric encryption (`RSA`).

---

This covers the basics of the `crypto` module. Let me know if you'd like deeper dives into specific topics! 🔐