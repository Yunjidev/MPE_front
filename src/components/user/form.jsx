import { useState } from "react";
import PropTypes from "prop-types";

export default function UserForm({ onSubmit, mode }) {
  const [identifier, setIdentifier] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === "Identification") {
      await onSubmit({ identifier, password });
    } else {
      await onSubmit({ username, email, password });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {mode === "Identification" ? (
        <>
          <label htmlFor="identifier">Username ou Email</label>
          <input
            type="text"
            id="identifier"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          ></input>
        </>
      ) : (
        <>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </>
      )}
      <label htmlFor="password">password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button type="submit">{mode}</button>
    </form>
  );
}

UserForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(["Identification", "Enregistrement"]).isRequired,
};
