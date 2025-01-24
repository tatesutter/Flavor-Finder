import react from 'react;'

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    interface SignupFormEvent extends React.FormEvent<HTMLFormElement> {}
  
    const handleSignup = async (e: SignupFormEvent): Promise<void> => {
      e.preventDefault();
      try {
        // Make an API call for signing up (this is just a placeholder)
        console.log('Sign Up Details:', { username, email, password });
  
        // Here, save the user info or token after successful signup
        // localStorage.setItem('jwtToken', token); // If your backend returns a JWT token
  
        // After successful signup, redirect user or update state
        window.location.href = '/login'; // Redirect to login page after successful signup
      } catch (error: any) {
        console.error('Signup failed:', error.message);
      }
    };
  
    return (
      <section className="py-10">
        <h2 className="text-3xl font-bold text-center mb-6">Signup</h2>
        <div className="max-w-sm mx-auto bg-white shadow-md p-6 rounded-lg">
          <form onSubmit={handleSignup}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your username"
                className="input input-bordered w-full"
              />
            </div>
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
              <button className="btn btn-primary w-full">Signup</button>
            </div>
          </form>
        </div>
      </section>
    );
  };

  export default Signup;
