"use client";
import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const router = useRouter();
  const { setUser } = useAuth();

  const handleLogin = async () => {
    try {
      const { data } = await api.post("/login", { username });
      setUser({ username, sessionId: data.sessionId }); // Set the user in context
      router.push("/comments"); // Redirect to comments page
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className=" w-[350px] ">
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
