import { Label, TextInput, Select } from "flowbite-react";

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  password?: string;
  activo: boolean;
  rol_id: number;
  departamento_id: number;
  rol: string;
  departamento: string;
}

interface Props {
  form: Usuario;
  setForm: React.Dispatch<React.SetStateAction<Usuario>>;
  roles: any[];
  departamentos: any[];
  drawerMode: "add" | "edit" | null;
}

export function UsuarioForm({
  form,
  setForm,
  roles,
  departamentos,
  drawerMode,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label className="text-white">Nombre</Label>
        <TextInput
          value={form.nombre}
          required
          onChange={(e) =>
            setForm(prev => ({ ...prev, nombre: e.target.value }))
          }
        />
      </div>

      <div>
        <Label className="text-white">Apellido</Label>
        <TextInput
         required
          value={form.apellido}
          onChange={(e) =>
            setForm(prev => ({ ...prev, apellido: e.target.value }))
          }
        />
      </div>

      <div>
        <Label className="text-white">Email</Label>
        <TextInput
         required
          value={form.email}
          onChange={(e) =>
            setForm(prev => ({ ...prev, email: e.target.value }))
          }
        />
      </div>

      {drawerMode === "add" && (
        <div className="md:col-span-2">
          <Label className="text-white">Contraseña</Label>
          <TextInput
           required
            type="password"
            value={form.password}
            onChange={(e) =>
              setForm(prev => ({ ...prev, password: e.target.value }))
            }
          />
        </div>
      )}

      <div>
        <Label className="text-white">Departamento</Label>
        <Select
          value={form.departamento_id}
          required
          onChange={(e) =>
            setForm(prev => ({
              ...prev,
              departamento_id: Number(e.target.value),
            }))
          }
        >
          <option value="0">Seleccione</option>
          {departamentos.map((d) => (
            <option key={d.id} value={d.id}>
              {d.nombre}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <Label className="text-white">Rol</Label>
        <Select
         required
          value={form.rol_id}
          onChange={(e) =>
            setForm(prev => ({
              ...prev,
              rol_id: Number(e.target.value),
            }))
          }
        >
          <option value="0">Seleccione</option>
          {roles.map((r) => (
            <option key={r.id} value={r.id}>
              {r.nombre}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
}
