function RegisterAgain({ onReset }) {
  return (
    <button
      type="button"
      className="w-full bg-red-500 px-3 py-2 text-white"
      onClick={onReset}
    >
      Register Again
    </button>
  );
}

export default RegisterAgain;
