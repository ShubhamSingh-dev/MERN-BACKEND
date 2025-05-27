import Product from "../model/product.model.js";

export const getCartProducts = async (req, res) => {
  try {
    const productIds = req.user.cartItems.map((item) => item.id);
    const products = await Product.find({ _id: { $in: productIds } }).lean();

    const cartItems = products.map((product) => {
      const cartItem = req.user.cartItems.find(
        (item) => item.id.toString() === product._id.toString()
      );
      return {
        ...product,
        quantity: cartItem?.quantity || 1,
      };
    });

    res.json({ cartItems });
  } catch (error) {
    console.error("Error fetching cart products:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const existingItem = user.cartItems.find(
      (item) => item.id.toString() === productId.toString()
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cartItems.push({ id: productId, quantity: 1 });
    }

    await user.save();

    res.json({
      message: "Product added to cart successfully",
      cartItems: user.cartItems,
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const removeAllFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    if (!productId) {
      user.cartItems = [];
    } else {
      user.cartItems = user.cartItems.filter(
        (item) => item.id.toString() !== productId.toString()
      );
    }

    await user.save();

    const message = productId
      ? "Product removed from cart successfully"
      : "All items removed from cart successfully";

    res.json({
      message,
      cartItems: user.cartItems,
    });
  } catch (error) {
    console.error("Error removing item(s) from cart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { quantity } = req.body;
    const user = req.user;

    if (!Number.isInteger(quantity) || quantity < 0) {
      return res
        .status(400)
        .json({ message: "Quantity must be a non-negative integer" });
    }

    const existingItem = user.cartItems.find(
      (item) => item.id.toString() === productId.toString()
    );

    if (!existingItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    if (quantity === 0) {
      user.cartItems = user.cartItems.filter(
        (item) => item.id.toString() !== productId.toString()
      );
    } else {
      existingItem.quantity = quantity;
    }

    await user.save();
    return res.json(user.cartItems);
  } catch (error) {
    console.error("Error updating quantity:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
