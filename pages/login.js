import { useState } from "react";
import { useRouter } from "next/router";
import api from "../lib/api";
import Link from "next/link";
import { useAuth } from "../lib/AuthContext";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/auth/login", form);

      // data = { _id, name, email, token }
      login(data.token, {
        _id: data._id,
        name: data.name,
        email: data.email
      });

      router.push("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="main-container">
      <div className="card">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
        {error && (
          <p className="mb-3 text-red-400 text-sm text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            className="input"
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={onChange}
          />
          <input
            className="input"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={onChange}
          />
          <button className="button" type="submit">
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          New here?{" "}
          <Link href="/register" className="link">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
