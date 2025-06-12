import supabase from "../../db/database.js";
import jwt from "jsonwebtoken"
// sign-in logic
const signIn = async (req, res) => {
  const { userId, password } = req.body;

  try {
    // Fetch the user by user_id, including role
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('user_id, password, role') // Ensure 'role' is included
      .eq('user_id', userId)
      .single();

    if (userError) {
      console.error("Error fetching user:", userError);
      return res.status(500).json({ message: "Error fetching user", error: userError.message });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Directly compare password (not using hashing here as per your request)
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token with userId and role
    const token = jwt.sign(
      {
        userId: user.user_id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h' // Token valid for 1 hour
      }
    );

    // Send token and role in the response
    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
      userId: user.user_id
    });

  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in", error: error.message || error });
  }
};

export { signIn };
