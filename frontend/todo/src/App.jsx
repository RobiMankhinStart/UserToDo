import { useState } from "react";
import {
  FaCheckCircle,
  FaEnvelope,
  FaExclamationTriangle,
  FaKey,
  FaLock,
  FaPhone,
  FaUser,
} from "react-icons/fa";

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("signup");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:8000/auth/signUp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      setMessage(data.message || "Account created. Check your email for OTP.");
      setStep("verify");
    } catch (error) {
      setMessage(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:8000/auth/verifyotp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp, email: form.email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Verification failed");

      setMessage(data.message || "Email verified successfully");
      setStep("done");
    } catch (error) {
      setMessage(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 text-gray-800">
      <div className="mx-auto max-w-md">
        <h1 className="mb-1 text-xl font-bold">Signup</h1>
        <p className="mb-4 text-sm">
          Create an account and verify it with OTP.
        </p>

        {message ? (
          <div
            className={`mb-3 flex items-start gap-2 px-3 py-2 text-sm ${message.includes("success") || message.includes("Check") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
          >
            {message.includes("success") || message.includes("Check") ? (
              <FaCheckCircle className="mt-0.5" />
            ) : (
              <FaExclamationTriangle className="mt-0.5" />
            )}
            <span>{message}</span>
          </div>
        ) : null}

        {step === "signup" && (
          <form onSubmit={handleSignup} className="space-y-2">
            <div className="flex items-center gap-2 border border-gray-300 px-3 py-2">
              <FaUser />
              <input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full outline-none"
              />
            </div>
            <div className="flex items-center gap-2 border border-gray-300 px-3 py-2">
              <FaEnvelope />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full outline-none"
              />
            </div>
            <div className="flex items-center gap-2 border border-gray-300 px-3 py-2">
              <FaLock />
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full outline-none"
              />
            </div>
            <div className="flex items-center gap-2 border border-gray-300 px-3 py-2">
              <FaPhone />
              <input
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 px-3 py-2 text-white disabled:opacity-70"
            >
              {loading ? "Please wait..." : "Sign Up"}
            </button>
          </form>
        )}

        {step === "verify" && (
          <form onSubmit={handleVerify} className="space-y-2">
            <div className="flex items-center gap-2 border border-gray-300 px-3 py-2">
              <FaKey />
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                required
                className="w-full outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 px-3 py-2 text-white disabled:opacity-70"
            >
              {loading ? "Checking..." : "Verify OTP"}
            </button>
          </form>
        )}

        {step === "done" && (
          <div className="space-y-2">
            <div className="bg-green-50 px-3 py-2 text-sm text-green-700">
              Your account is verified.
            </div>
            <button
              type="button"
              className="w-full bg-red-500 px-3 py-2 text-white"
              onClick={() => {
                setStep("signup");
                setOtp("");
                setForm({ name: "", email: "", password: "", phone: "" });
                setMessage("");
              }}
            >
              Register Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
