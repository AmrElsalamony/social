export default function NotFound() {
  return (
    <div className="card rounded-none min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-8xl font-extrabold text-blue-600">404</h1>

      <h2 className="mt-6 text-3xl font-bold text-main">
        Oops! Page Not Found
      </h2>

      <p className="mt-5 max-w-md text-sub">
        The page you are looking for doesn't exist or has been moved.
        Let's get you back to somewhere useful.
      </p>

      {/* <img
        src="/404.svg"
        alt="Not Found"
        className="w-72 my-8"
      /> */}

      <button
        onClick={() => window.history.back()}
        className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition mt-8"
      >
        Go Back
      </button>
    </div>
  );
}