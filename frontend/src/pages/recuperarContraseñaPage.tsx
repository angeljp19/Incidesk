import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImg from "../assets/loginImg.png";
import { InvalidCredentialsModal } from "../components/invalidCredentialsModal";
import RecuperarContraseña from "../api/recuperarContraseña";

export default function RecuperarContraseñaPage() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [cooldown, setCooldown] = useState(0); // segundos
  const [codeSent, setCodeSent] = useState(false);

  const navigate = useNavigate();

  // ------------------ COOLDOWN TIMER ------------------
  useEffect(() => {
    if (cooldown <= 0) return;

    const interval = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [cooldown]);

  // ------------------ GENERAR CÓDIGO ------------------
  const handleGenerateCode = async () => {
    if (!email) {
      setErrorMessage("Debes ingresar un correo electrónico válido.");
      return;
    }

    try {
      setIsLoading(true);
      await RecuperarContraseña.recuperarContraseña(email);
      setCooldown(120);
      setCodeSent(true);
    } catch (err) {
      setErrorMessage("No se pudo enviar el código al correo.");
    } finally {
      setIsLoading(false);
    }
  };

  // ------------------ VALIDAR CÓDIGO ------------------
  const handleSubmitCode = async () => {
    if (!email || !code || !password) {
      setErrorMessage("Debes completar todos los campos.");
      return;
    }

    try {
      setIsLoading(true);
      await RecuperarContraseña.validarCodigo(email, code, password);
      navigate("/login");
    } catch (err) {
      setErrorMessage("El código es inválido o ha expirado.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-blue-800 pt-20 lg:bg-white lg:p-4 flex flex-col lg:flex-row justify-center items-center">
      {/* Imagen */}
      <div
        style={{ backgroundImage: `url(${loginImg})`, backgroundSize: "cover" }}
        className="w-1/2 h-full rounded-l-4xl shadow-[-5px_5px_5px_rgba(0,0,0,0.6)] hidden lg:block"
      />

      {/* Contenedor */}
      <div className="bg-gray-100 p-8 rounded-t-[100px] lg:rounded-t-none lg:rounded-r-4xl h-full w-full lg:w-1/2 flex flex-col items-center">
        <div className="flex w-full justify-center lg:justify-end">
          <h1 className="bg-linear-to-r from-blue-500 to-violet-900 bg-clip-text text-5xl font-extrabold text-transparent">
            Incidesk
          </h1>
        </div>

        {/* CONTENIDO */}
        <div className="flex w-full max-w-md flex-col gap-6 justify-center py-10">
          <h2 className="text-2xl font-bold text-center text-gray-700">
            Recuperar contraseña
          </h2>

          {/* EMAIL */}
          <form
            className="flex flex-col gap-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleGenerateCode();
            }}
          >
            <input
              type="email"
              required
              placeholder="Correo electrónico"
              value={email}
              readOnly={codeSent}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 ${
                codeSent
                  ? "bg-gray-200 cursor-not-allowed"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />

            <button
              type="submit"
              disabled={cooldown > 0 || isLoading || codeSent}
              className={`w-full rounded-xl py-3 font-semibold text-white transition ${
                cooldown > 0 || codeSent
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {cooldown > 0
                ? `Reintentar en ${cooldown}s`
                : "Enviar código al correo"}
            </button>
          </form>

          {/* CÓDIGO Y CONTRASEÑA */}
          <form
            className="flex flex-col gap-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmitCode();
            }}
          >
            <input
              type="password"
              required
              disabled={!codeSent}
              placeholder="Código de verificación"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className={`w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 ${
                !codeSent
                  ? "bg-gray-200 cursor-not-allowed"
                  : "border-gray-300 focus:ring-violet-500"
              }`}
            />

            <input
              type="password"
              required
              disabled={!codeSent}
              placeholder="Nueva contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 ${
                !codeSent
                  ? "bg-gray-200 cursor-not-allowed"
                  : "border-gray-300 focus:ring-violet-500"
              }`}
            />

            <button
              type="submit"
              disabled={!codeSent || isLoading}
              className="w-full rounded-xl bg-violet-700 py-3 font-semibold text-white hover:bg-violet-800 transition disabled:bg-gray-400"
            >
              Verificar código
            </button>
          </form>
        </div>
      </div>

      <InvalidCredentialsModal
        open={!!errorMessage}
        onClose={() => setErrorMessage(null)}
        texto={errorMessage ?? ""}
      />
    </div>
  );
}
