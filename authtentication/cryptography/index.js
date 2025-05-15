import express from "express";
import crypto from "crypto";

const app = express();
const PORT = 3000;
app.use(express.json());

//generate an RSA key pair
const generateKeys = () => {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
  });

  return { publicKey, privateKey };
};

// *for encryption always public key is used
const encrypt = (publicKey, message) => {
  const encrypted = crypto.publicEncrypt(publicKey, Buffer.from(message));
  return encrypted.toString("base64"); //base64 is used to convert binary data to string
};

// *for decryption always private key is used
const decrypt = (privateKey, encryptedMessage) => {
  const decrypted = crypto.privateDecrypt(
    privateKey,
    Buffer.from(encryptedMessage, "base64")
  );
  return decrypted.toString("utf-8");
};

const keys = generateKeys();
const publicKey = keys.publicKey;
const privateKey = keys.privateKey;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/encrypt", (req, res) => {
  const { message } = req.body;
  //operation for encryption
  const encryptedData = encrypt(publicKey, message);
  //response in json
  res.json({ encryptedData });
});

app.post("/decrypt", (req, res) => {
  const { encryptedMessage } = req.body;
  //operation for decryption
  const decryptedData = decrypt(privateKey, encryptedMessage);
  //response in json
  res.json({ decryptedData });
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  // console.log(`Public Key:\n ${publicKey}`);
  // console.log(`Private Key:\n ${privateKey}`); never log private key in production
});
