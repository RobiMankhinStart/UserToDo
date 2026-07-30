import { FaKey } from "react-icons/fa";

function VerifyOtpForm({ otp, onChange, onSubmit, loading }) {
  return (
    <form onSubmit={onSubmit} className="space-y-2">
      <div className="flex items-center gap-2 border border-gray-300 px-3 py-2">
        <FaKey />
        <input
          value={otp}
          onChange={onChange}
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
  );
}

export default VerifyOtpForm;
