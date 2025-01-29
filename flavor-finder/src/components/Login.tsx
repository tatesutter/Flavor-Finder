import React, { useState } from "react";

// Login Component
interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  interface LoginFormEvent extends React.FormEvent<HTMLFormElement> {}

  const handleLogin = async (e: LoginFormEvent) => {
    e.preventDefault();
    try {
      // Mock API request for token
      const token: string = "mock-jwt-token"; // Replace with actual API call
      localStorage.setItem("jwtToken", token);
      onLogin();
    } catch (error: any) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <section className="py-10">
      <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
      <div className="max-w-sm mx-auto bg-white shadow-md p-6 rounded-lg">
        <form onSubmit={handleLogin}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary w-full">Login</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
