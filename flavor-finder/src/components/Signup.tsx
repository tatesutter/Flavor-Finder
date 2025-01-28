import { useState, ChangeEvent, FormEvent } from "react";
import { login } from "./authAPI";
import Auth from "./auth";

interface UserLogin {
  username: string;
  password: string;
  email: string;
}

const Signup = () => {
  const [loginData, setLoginData] = useState<UserLogin>({
    username: "",
    password: "",
    email: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(loginData);
      Auth.login(data.token);
    } catch (err) {
      console.error("Failed to login", err);
    }
  };

  return (
    <section className="py-10">
      <h2 className="text-3xl font-bold text-center mb-6">Signup</h2>
      <div className="max-w-sm mx-auto bg-white shadow-md p-6 rounded-lg">
        <form onSubmit={handleSubmit}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={loginData.username}
              onChange={handleChange}
              placeholder="Your username"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={loginData.email}
              onChange={handleChange}
              placeholder="email@example.com"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="Password"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary w-full">Signup</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signup;
