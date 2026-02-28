import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { Label, TextInput, Button, Spinner } from "flowbite-react";
import UsuarioAPI from "../../api/usuarios";
import { PageHeader } from "../../components/pageHeader";

export function PerfilPreferenciasPage() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [loading, setLoading] = useState(false);

  const user = sessionStorage.getItem("user");
  const userObj = user ? JSON.parse(user) : null;

  // Cargar datos del usuario
  useEffect(() => {
    if (userObj) {
      setNombre(userObj.nombre ?? "");
      setApellido(userObj.apellido ?? "");
      setEmail(userObj.email ?? "");
      setDepartamento(userObj.Departamento.nombre ?? "");
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      form.append("email", email);
      if (password) form.append("password", password);

      const updated = await UsuarioAPI.put(
        userObj.id,
        undefined,
        undefined,
        email,
        password,
      );

      // Actualizar datos en sessionStorage
      sessionStorage.setItem("user", JSON.stringify(updated.user));

      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center lg:px-4 lg:py-10 ">
      <div className="w-full flex flex-col gap-2 max-w-5xl ">
        {/* HEADER */}

        <PageHeader
          title="Perfil y Preferencias"
          subtitle="Administra tus datos personales y ajustes de tu cuenta"
        />
        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="px-8 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6
    bg-white rounded-2xl shadow-xl overflow-hidden
    max-h-[75svh] overflow-y-auto
    lg:max-h-none lg:overflow-visible"
        >
          {/* Nombre */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="nombre">Nombre</Label>
            <TextInput
              id="nombre"
              placeholder="Tu nombre"
              readOnly
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          {/* Apellido */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="apellido">Apellido</Label>
            <TextInput
              id="apellido"
              placeholder="Tu apellido"
              readOnly
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
            />
          </div>

          {/* Departamento */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="departamento">Departamento</Label>
            <TextInput
              id="departamento"
              placeholder="Tu departamento"
              readOnly
              value={departamento}
              onChange={(e) => setDepartamento(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="email">Cambiar correo electrónico</Label>
            <TextInput
              id="email"
              type="email"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Contraseña */}
          <div className="flex flex-col gap-1">
            <Label htmlFor="password">Cambiar contraseña</Label>
            <TextInput
              id="password"
              type="password"
              placeholder="Nueva contraseña (opcional)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* BOTÓN */}
          <div className="lg:col-span-2 flex justify-center lg:justify-end pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="px-8 bg-blue-600 hover:bg-blue-700"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Spinner size="sm" />
                  Guardando...
                </div>
              ) : (
                "Guardar cambios"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
