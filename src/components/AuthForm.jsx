import { authService } from "fbase";
import React, { useState } from "react";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);

  const [error, setError] = useState("");
  const onChange = (e) => {
    // console.log(e.target.name)
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let data;
    try {
      if (newAccount) {
        // create account
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        // login
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);
  return (
    <div>
      <form onSubmit={onSubmit} className="container">
        <input
          onChange={onChange}
          value={email}
          name="email"
          type="email"
          placeholder="Email"
          required
          className="authInput"
        />
        <input
          onChange={onChange}
          value={password}
          name="password"
          type="password"
          placeholder="Password"
          required
          className="authInput"
        />
        <input
          type="submit"
          value={newAccount ? "Sign up" : "Log In"}
          className="authInput authSubmit"
        />
        {error && <span className="authError">{error}</span>}
      </form>
      <span onClick={toggleAccount} className="authSwitch">
        {newAccount ? "Log In" : "Sign Up"}
      </span>
    </div>
  );
}
