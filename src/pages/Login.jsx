// Login.jsx
const Login = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white rounded-xl shadow-md w-[350px]">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <input type="email" placeholder="Email" className="input" />
        <input type="password" placeholder="Password" className="input mt-2" />
        <button className="btn-primary w-full mt-4">Login</button>
      </div>
    </div>
  );
};

export default Login;
