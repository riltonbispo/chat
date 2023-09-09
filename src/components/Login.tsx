"use client";

import React, { useState } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth } from "@/services/firebaseconfig";
import { useUser } from "@/context/userContext";
import {
  addUserAction,
  currentUserAction,
} from "@/services/actions/userActions";

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasAccount, setHasAccount] = useState(false);

  const uContext = useUser();

  const [
    createUserWithEmailAndPassword,
    createUser,
    createLoading,
    createError,
  ] = useCreateUserWithEmailAndPassword(auth);

  const [signInWithEmailAndPassword, signInUser, signInLoading, signInError] =
    useSignInWithEmailAndPassword(auth);

  const handleAsAccount = () => {
    setHasAccount(!hasAccount);
  };

  const handleCreateAccount = async () => {
    try {
      await createUserWithEmailAndPassword(email, password);
      addUserAction(email, username);
      await handleLogin();
    } catch (error) {
      console.error("Erro ao criar conta:", error);
    }
  };

  const handleLogin = async () => {
    signInWithEmailAndPassword(email, password);
    try {
      const user = await currentUserAction(email);
      if (user) {
        uContext?.setUser(user);
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  if (createError || signInError) {
    return (
      <div>
        <p>Error: {createError?.message || signInError?.message}</p>
      </div>
    );
  }

  if (createLoading || signInLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-semibold mb-4">
          {!hasAccount ? "Login" : "Cadastrar"}
        </h2>
        <div className="space-y-4 flex flex-col items-center">
          {hasAccount && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded"
            />
          )}
          <input
            type="text"
            placeholder="exemple@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
          {hasAccount ? (
            <>
              <button
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                onClick={handleCreateAccount}
              >
                Criar Conta
              </button>
              <button
                className="w-full border border-blue-500 p-2 rounded hover:bg-blue-50"
                onClick={handleAsAccount}
              >
                Já tenho conta
              </button>
            </>
          ) : (
            <>
              <button
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                onClick={handleLogin}
              >
                Login
              </button>
              <button
                className="w-full border border-blue-500 p-2 rounded hover:bg-blue-50"
                onClick={handleAsAccount}
              >
                Não possuo conta
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
