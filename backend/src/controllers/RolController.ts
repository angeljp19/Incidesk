import { Request, Response } from "express";
import Rol from "../models/Rol";

class RolController {

  // Obtener todos los roles
  static async getAll(req: Request, res: Response) {
    try {
      const roles = await Rol.findAll();
      return res.json(roles);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al obtener los roles" });
    }
  }

  // Obtener un rol por ID
  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const rol = await Rol.findByPk(id);

      if (!rol) {
        return res.status(404).json({ message: "Rol no encontrado" });
      }

      return res.json(rol);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al obtener el rol" });
    }
  }

  // Crear un nuevo rol
  static async create(req: Request, res: Response) {
    try {
      const { nombre } = req.body;

      if (!nombre) {
        return res.status(400).json({ message: "El nombre es obligatorio" });
      }

      const rol = await Rol.create({ nombre });
      return res.status(201).json(rol);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al crear el rol" });
    }
  }

  // Actualizar un rol
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nombre } = req.body;

      const rol = await Rol.findByPk(id);
      if (!rol) {
        return res.status(404).json({ message: "Rol no encontrado" });
      }

      rol.nombre = nombre ?? rol.nombre;
      await rol.save();

      return res.json(rol);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al actualizar el rol" });
    }
  }

  // Eliminar un rol
  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const rol = await Rol.findByPk(id);
      if (!rol) {
        return res.status(404).json({ message: "Rol no encontrado" });
      }

      await rol.destroy();
      return res.json({ message: "Rol eliminado correctamente" });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al eliminar el Rol" });
    }
  }
}

export default RolController;
