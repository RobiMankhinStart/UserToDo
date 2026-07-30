import { FaEnvelope, FaLock, FaPhone, FaUser } from "react-icons/fa";

function SignUpForm({ form, onChange, onSubmit, loading }) {
  return (
    <form onSubmit={onSubmit} className="space-y-2">
      <div className="flex items-center gap-2 border border-gray-300 px-3 py-2">
        <FaUser />
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
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
  );
}

export default SignUpForm;
