import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
} from "flowbite-react";

import { useState } from "react";
const users = [
  {
    nombre: "Juan",
    apellido: "Perez",
    departamento: "Soporte",
    email: "juan@mail.com",
    rol: "Tecnico",
    activo: true,
    id: 1,
  },
  {
    nombre: "Maria",
    apellido: "Perez",
    departamento: "Administracion",
    email: "Maria@mail.com",
    rol: "Usuario",
    activo: true,
    id: 2,
  },
  {
    nombre: "Camilo",
    apellido: "Pilar",
    departamento: "Almacen",
    email: "camilo@mail.com",
    rol: "Usuario",
    activo: true,
    id: 3,
  },
  {
    nombre: "Angel",
    apellido: "Cordova",
    departamento: "Soporte",
    email: "angel@mail.com",
    rol: "Tecnico",
    activo: true,
    id: 4,
  },
];

interface User {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  departamento: string;
  rol: string;
}

interface tableProps {
  rowSelected: (user: User) => void;
}

export function GestionPersonalTiTable(tableProps: tableProps) {
  const [search, setSearch] = useState("");
  const { rowSelected } = tableProps;
  const [bgRowSelected, setBgRowSelected] = useState(-1);
  const filteredUsers = users.filter((user) =>
    `${user.nombre} ${user.apellido} ${user.email} ${user.departamento} ${user.rol}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col space-y-5">
      <div className="sticky flex w-full top-0 bg-white z-10 md:w-1/3">
        <TextInput
          type="text"
          placeholder="Buscar tecnico..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className=""
        />
      </div>
      <div className="overflow-auto max-h-[50vh]">
        <Table hoverable>
          <TableHead className="sticky top-0 bg-white z-10">
            <TableRow>
              <TableHeadCell>Nombre</TableHeadCell>
              <TableHeadCell>Apellido</TableHeadCell>
              <TableHeadCell>Departamento</TableHeadCell>
              <TableHeadCell>Email</TableHeadCell>
              <TableHeadCell>Rol</TableHeadCell>
              <TableHeadCell>Activo</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y">
            {filteredUsers.map((user, index) => (
              <TableRow
                onClick={() => {
                  rowSelected(user);
                  setBgRowSelected(index);
                }}
                className={index == bgRowSelected ? `bg-blue-700 hover:bg-blue-700 text-white` : `bg-white `}
              >
                <TableCell className="whitespace-nowrap">
                  {user.nombre}
                </TableCell>
                <TableCell>{user.apellido}</TableCell>
                <TableCell>{user.departamento}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.rol}</TableCell>
                <TableCell>{user.activo ? "Si" : "No"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
