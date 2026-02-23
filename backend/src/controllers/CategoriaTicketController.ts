import { Request, Response } from "express";
import CategoriaTicket from "../models/CategoriaTicket";

class CategoriaTicketController {
  // Obtener todas las categorías
  static async getAll(req: Request, res: Response) {
    try {
      const categorias = await CategoriaTicket.findAll({where: {"activo": true}, order:[["id", "ASC"]]});

      return res.json(categorias);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error al obtener las categorías" });
    }
  }

  // Obtener categoría por ID
  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const categoria = await CategoriaTicket.findByPk(id);

      if (!categoria) {
        return res.status(404).json({ message: "Categoría no encontrada" });
      }

      return res.json(categoria);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error al obtener la categoría" });
    }
  }

  // Crear categoría
  static async create(req: Request, res: Response) {
    try {
      const { nombre } = req.body;

      if (!nombre) {
        return res.status(400).json({ message: "El nombre es obligatorio" });
      }
      const existe = await CategoriaTicket.findOne({
        where: { nombre },
      });

      if (existe) {
        if (existe.activo === false) {
          existe.activo = true;
          await existe.save();
          return res.status(200).json(existe);
        }

        throw new Error("El departamento ya existe");
      }

      const categoria = await CategoriaTicket.create({ nombre });

      return res.status(201).json({
        message: "Categoría creada correctamente",
        id: categoria.id,
      });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({
        message: "Error al crear categoría",
        error: error.message,
      });
    }
  }

  // Actualizar categoría
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nombre, activo } = req.body;

      const categoria = await CategoriaTicket.findByPk(id);

      if (!categoria) {
        return res.status(404).json({ message: "Categoría no encontrada" });
      }

      categoria.nombre = nombre ?? categoria.nombre;
      categoria.activo = activo ?? categoria.activo;

      await categoria.save();

      return res.json({ message: "Categoría actualizada correctamente" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error al actualizar la categoría",
      });
    }
  }

  // Eliminar categoría
  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const categoria = await CategoriaTicket.findByPk(id);

      if (!categoria) {
        return res.status(404).json({ message: "Categoría no encontrada" });
      }

      await categoria.destroy();

      return res.json({ message: "Categoría eliminada correctamente" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error al eliminar la categoría",
      });
    }
  }
}

export default CategoriaTicketController;
