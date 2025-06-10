import { useState } from "react";
import { useNavigate } from "react-router-dom"; // To navigate after login
import axios from "axios"; // Import axios
import bgImg from "./Images/bgLower.jpg";
import medicapsImg from "./Images/medicaps.png";
import { useAuth } from "../../context/AuthContext"; // Import AuthContext

function LoginPage() {
  const [username, setUsername] = useState(""); // State to hold username
  const [password, setPassword] = useState(""); // State to hold password
  const [error, setError] = useState(""); // State to hold any error message
  const { login } = useAuth(); // Login method from AuthContext
  const navigate = useNavigate(); // To navigate after successful login

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the login request to the server
      const response = await axios.post("http://localhost:3000/api/auth/signin", {
        userId: username,
        password: password,
      });

      if (response.status === 200) {
        // If login is successful, login the user using AuthContext
        const { token, userId, role } = response.data;
        login({ token, userId, role }); // Store auth data in context and localStorage

        // Redirect to the appropriate dashboard based on the role
        if (role === "admin") {
          navigate("/admin");
        } else if (role === "mentorCoordinator") {
          navigate("/mentorcoordinator/dashboard");
        } else if (role === "mentor") {
          navigate("/mentor");
        } else if (role === "mentee") {
          navigate("/mentee");
        }
      }
    } catch (err) {
      setError("Invalid username or password"); // Set error message
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full">
      <img
        src={bgImg}
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: { bgImg },
          backgroundSize: "100% 100%",
        }}
      />
      <div className="relative min-h-screen flex items-center justify-center p-4 z-10">
        <div className="w-full max-w-7xl bg-black/20 backdrop-blur-sm rounded-3xl p-8 md:p-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left side - Logo and Title */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <div className="relative mx-auto lg:ml-0 w-48 md:w-64">
                <img
                  src={medicapsImg}
                  alt="medicaps logo"
                  className="w-full h-auto"
                />
              </div>
              <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mt-6">
                Mentor-Mentee <br />
                Portal
              </h1>
            </div>

            {/* Right side - Login Form */}
            <div className="w-full lg:w-1/2 max-w-md">
              <form className="bg-white rounded-2xl p-6 md:p-8 lg:p-10" onSubmit={handleSubmit}>
                <h2 className="text-2xl md:text-3xl font-bold text-center text-[#A01212] mb-2">
                  Login
                </h2>
                <p className="text-gray-600 text-center mb-6">
                  Welcome to Mentor-Mentee Portal
                </p>

                {/* Error Message */}
                {error && (
                  <p className="text-center text-red-500 mb-4">{error}</p>
                )}

                <div className="space-y-4">
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} // Update username state
                    placeholder="Username"
                    required
                    className="w-full p-3 text-lg border-2 border-[#9b182a] rounded-lg focus:outline-none focus:border-[#A01212] transition-colors"
                  />
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Update password state
                    placeholder="Password"
                    required
                    className="w-full p-3 text-lg border-2 border-[#9b182a] rounded-lg focus:outline-none focus:border-[#A01212] transition-colors"
                  />
                </div>

                <div className="text-right mt-2">
                  <a
                    href="#"
                    className="text-[#A01212] font-bold hover:text-[#900] transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 p-3 bg-[#9b182a] text-white text-lg font-bold rounded-2xl 
                    hover:bg-[#900] transition-colors cursor-pointer"
                >
                  LOGIN
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
