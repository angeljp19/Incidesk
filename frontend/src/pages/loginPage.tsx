import { useState } from "react";
import { loginAuth } from "../api/loginAuth";
import { useNavigate } from "react-router-dom";
import loginImg from "../assets/loginImg.png";
import logo3n from "../assets/3nlogo.png"
import { InvalidCredentialsModal } from "../components/invalidCredentialsModal";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(false);
    setIsLoading(true);

    try {
      const userData = await loginAuth(email, password);
      navigate(userData);
    } catch (err) {
      console.error("Error de autenticación:", err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-blue-800 pt-20 lg:bg-white lg:p-4  flex flex-col lg:flex-row justify-center items-center">
      <div
        style={{ backgroundImage: `url(${loginImg})`, backgroundSize: "cover" }}
        className="w-1/2 h-full rounded-l-4xl shadow-[-5px_5px_5px_rgba(0,0,0,0.6)] hidden lg:block"
      ></div>
      <div className="bg-gray-100 p-8 rounded-t-[100px] lg:rounded-t-none lg:rounded-r-4xl h-full w-full lg:w-1/2 flex flex-col items-center">
        <div className="flex w-full justify-center lg:justify-end">
          <img src={logo3n} alt="Logo 3n" className="w-20 h-20 mr-4 mb-4"/>
      
        </div>

        <div className="flex w-full h-full flex-col items-center justify-around py-10">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-2 text-blue-600">
              ¡Hola de nuevo!
            </h2>
            <p className="text-xl font-extralight">Bienvenido al sistema</p>
          </div>
          <div className="flex flex-col w-full h-full items-center justify-center space-y-10">
            <h3 className="text-blue-600 font-semibold text-2xl">
              Iniciar Sesion
            </h3>
            <form
              onSubmit={handleSubmit}
              className="w-full lg:w-1/2 flex flex-col justify-center"
            >
              <div className="mb-4 ">
                <input
                  placeholder="Email"
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 outline-none"
                  required
                />
              </div>

              <div className="mb-6 flex flex-col items-end">
                <input
                  placeholder="Contraseña"
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 outline-none"
                  required
                />
                <span onClick={() => navigate('/recuperarContraseña')} className="text-blue-600 hover:text-blue-700 cursor-pointer">
                  Olvidaste tu Contraseña?
                </span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 rounded-full transition duration-150 cursor-pointer ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {isLoading ? "Cargando..." : "Iniciar Sesión"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <InvalidCredentialsModal open={error} onClose={() => setError(false)} />
    </div>
  );
}
