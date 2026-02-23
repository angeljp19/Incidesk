import { env } from "../env";
import { registerSocketUser } from "../sockets/socket";

export const loginAuth = async (email: string, password: string) => {
  try {
    const res = await fetch(`${env.BACK_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      throw new Error("Error en la autenticación");
    }
    const data = await res.json();
    sessionStorage.setItem("token", data.token);
    const user = JSON.stringify(data.user);
    sessionStorage.setItem("user", user);
    registerSocketUser(data.user);
    return data.redirectUrl;
  } catch (error) {
    throw error;
  }
};
