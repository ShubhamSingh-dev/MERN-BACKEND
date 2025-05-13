import express from "express";
import User from "../models/user.model.js"; // Import the User model

const router = express.Router();

//Creating CRUD routes

//1. Create a user ? databse main store krne main time lagega isliye async use kro
router.post("/users", async (req, res) => {
  try {
    //get the data from the request body
    const { name, age, weight } = req.body;

    // Create a new user instance , using constructor function
    const newUser = new User({
      name,
      age,
      weight,
    });
    await newUser.save(); // Save the user to the database

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser
    });

  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//2. Read a user
router.get("/users", async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//3. Update a user
router.put("/update-user/:id", async(req, res) => {
    const { id } = req.params;
    const { name, age, weight } = req.body;
  
    try {
        const updatedUser = await User.findByIdAndUpdate(id , {name, age, weight}, { new: true , runValidators: true });
        if (!updatedUser) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updatedUser
        });
  } catch (error) {
    
  }
});

//4. Delete a user
router.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    User.findByIdAndDelete(id)
        .then((deletedUser) => {
            if (!deletedUser) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }
            res.status(200).json({
                success: true,
                message: "User deleted successfully",
                data: deletedUser
            });
        })
        .catch((error) => {
            console.error("Error deleting user:", error);
            res.status(500).json({
                success: false,
                message: error.message,
            });
        });
});

export default router;
