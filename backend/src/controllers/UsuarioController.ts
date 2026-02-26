import { Request, Response } from "express";
import Usuario from "../models/Usuario";
import Departamento from "../models/Departamento";
import Rol from "../models/Rol";
import bcrypt from "bcrypt";

class UsuarioController {
  static async getAll(req: Request, res: Response) {
    try {
      const { rol_id } = req.query;

      const where: any = {
        activo: true,
      };

      if (rol_id) {
        where.rol_id = Number(rol_id);
      }

      const usuarios = await Usuario.findAll({
        where,
        attributes: { exclude: ["password"] },
        include: [
          {
            model: Departamento,
            attributes: ["nombre"],
            as: "Departamento"
          },
          {
            model: Rol,
            attributes: ["nombre"],
          },
        ],
      });

      const plainUsers = usuarios.map((u) => {
        const plain = u.toJSON();
        const { Rol, Departamento, ...rest } = plain;

        return {
          ...rest,
          rol: Rol?.nombre ?? null,
          departamento: Departamento?.nombre ?? null,
        };
      });

      return res.json(plainUsers);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al obtener los usuarios" });
    }
  }
  // Obtener usuario por ID
  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id, {
        attributes: { exclude: ["password"] },
      });

      if (!usuario) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      return res.json(usuario);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al obtener el usuario" });
    }
  }

  // Crear usuario con hash de contraseña
  static async create(req: Request, res: Response) {
    try {
      const { nombre, apellido, departamento_id, email, password, rol_id } =
        req.body;

      if (
        !nombre ||
        !apellido ||
        !departamento_id ||
        !email ||
        !password ||
        !rol_id
      ) {
        return res
          .status(400)
          .json({ message: "Todos los campos son obligatorios" });
      }

      const existedUser = await Usuario.findOne({ where: { email } });
      if (existedUser) {
        return res
          .status(409)
          .json({ message: "Ya existe un usuario con ese email" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const usuario = await Usuario.create({
        nombre,
        apellido,
        departamento_id,
        email,
        password: hashedPassword,
        rol_id,
      });

      return res
        .status(201)
        .json({ message: "Usuario creado correctamente", id: usuario.id });
    } catch (error: any) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error al crear usuario", error: error.message });
    }
  }

  // Actualizar usuario
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const {
        nombre,
        apellido,
        departamento_id,
        email,
        password,
        rol_id,
        activo,
      } = req.body;

      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      const existedUser = await Usuario.findOne({ where: { email } });
      if (existedUser) {
        return res
          .status(409)
          .json({ message: "Ya existe un usuario con ese email" });
      }

      usuario.nombre = nombre ?? usuario.nombre;
      usuario.apellido = apellido ?? usuario.apellido;
      usuario.departamento_id = departamento_id ?? usuario.departamento_id;
      usuario.email = email ?? usuario.email;
      usuario.rol_id = rol_id ?? usuario.rol_id;
      usuario.activo = activo ?? usuario.activo;

      if (password) {
        usuario.password = await bcrypt.hash(password, 10);
      }

      await usuario.save();

      const usuarioActualizado = await Usuario.findOne({
        where: { id },
        include: [
          {
            model: Departamento,
            as: "Departamento",
            attributes: ["id", "nombre"],
          },
        ],
      });

      return res.json({ user: usuarioActualizado?.toJSON() });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al actualizar usuario" });
    }
  }

  // Eliminar usuario
  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      await usuario.destroy();

      return res.json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al eliminar usuario" });
    }
  }
}

export default UsuarioController;
