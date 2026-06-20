import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      setError("Full name and email are required.");
      return;
    }

    if (!EMAIL_REGEX.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    const user = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email.trim(),
    };

    localStorage.setItem("user", JSON.stringify(user));
    navigate("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-lg">
      <div className="w-full max-w-md rounded-2xl border border-border-dark bg-surface-dark p-2xl shadow-card">
        <h1 className="text-h3 font-bold text-textPrimaryDark">Welcome</h1>
        <p className="mt-xs text-body-sm text-textSecondaryDark">
          Sign in to continue booking your tickets.
        </p>

        <form onSubmit={handleSubmit} className="mt-xl space-y-md">
          <div>
            <label className="text-body-sm text-textSecondaryDark">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
              className="mt-xs w-full rounded-lg border border-border-dark bg-surface-muted px-md py-sm text-body-md text-textPrimaryDark placeholder:text-textSecondaryDark focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="text-body-sm text-textSecondaryDark">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@example.com"
              className="mt-xs w-full rounded-lg border border-border-dark bg-surface-muted px-md py-sm text-body-md text-textPrimaryDark placeholder:text-textSecondaryDark focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {error && <p className="text-body-sm text-danger">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-xl bg-primary py-md text-body-md font-semibold text-white shadow-button transition hover:bg-primary-dark active:scale-[0.98]"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;