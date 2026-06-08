import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Hospital } from "lucide-react";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("priya@starhospital.com");
  const [password, setPassword] = useState("doctor123");
  const [error, setError] = useState("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Failed to connect to server");
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-12 flex items-center justify-center medical-gradient">
      <div className="w-full max-w-md bg-white p-10 rounded-3xl card-shadow glass-card border border-outline-variant">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Hospital className="text-primary w-8 h-8" />
          </div>
          <h2 className="font-headline-lg text-headline-lg text-text-main font-serif">Welcome Back</h2>
          <p className="text-text-muted font-body-md mt-2">Sign in to your patient or doctor portal</p>
        </div>
        
        {error && <div className="bg-error-container text-on-error-container p-4 rounded-lg mb-6 text-sm">{error}</div>}
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block font-label-md text-text-main mb-2">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-outline rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-surface-container-lowest" 
              placeholder="Enter your email" 
              required 
            />
          </div>
          <div>
            <label className="block font-label-md text-text-main mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-outline rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-surface-container-lowest" 
              placeholder="••••••••" 
              required 
            />
          </div>
          
          <div className="text-sm font-label-md text-primary text-right cursor-pointer hover:underline">
            Forgot Password?
          </div>
          
          <button type="submit" className="w-full bg-primary text-on-primary py-3 rounded-xl font-label-md text-label-md hover:bg-primary-container transition-all shadow-md">
            Sign In
          </button>
        </form>
        
        <div className="mt-8 text-center bg-surface-container p-4 rounded-lg">
          <p className="text-sm font-label-md text-text-muted mb-2">Demo Accounts:</p>
          <div className="text-xs text-secondary flex flex-col gap-1">
            <span>Doctor: priya@starhospital.com / doctor123</span>
            <span>Admin: admin@starhospital.com / admin123</span>
            <span>To demo patient view, register a new account.</span>
          </div>
        </div>
      </div>
    </main>
  );
}
