import { Request, Response } from "express";
import Departamento from "../models/Departamento";

class DepartamentoController {
  // Obtener todos los departamentos
  static async getAll(req: Request, res: Response) {
    try {
      const departamentos = await Departamento.findAll({
        where: { activo: true },
        order: [["id", "ASC"]],
      });
      return res.json(departamentos);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error al obtener los departamentos" });
    }
  }

  // Obtener un departamento por ID
  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const departamento = await Departamento.findByPk(id);

      if (!departamento) {
        return res.status(404).json({ message: "Departamento no encontrado" });
      }

      return res.json(departamento);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error al obtener el departamento" });
    }
  }

  // Crear un nuevo departamento
  static async create(req: Request, res: Response) {
    try {
      const { nombre } = req.body;

      if (!nombre) {
        return res.status(400).json({ message: "El nombre es obligatorio" });
      }

      const existe = await Departamento.findOne({
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

      const departamento = await Departamento.create({ nombre });
      return res.status(201).json(departamento);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error al crear el departamento" });
    }
  }

  // Actualizar un departamento
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nombre, activo } = req.body;

      const departamento = await Departamento.findByPk(id);
      if (!departamento) {
        return res.status(404).json({ message: "Departamento no encontrado" });
      }

      departamento.nombre = nombre ?? departamento.nombre;
      departamento.activo = activo ?? departamento.activo;
      await departamento.save();

      return res.json(departamento);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error al actualizar el departamento" });
    }
  }

  // Eliminar un departamento
  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const departamento = await Departamento.findByPk(id);
      if (!departamento) {
        return res.status(404).json({ message: "Departamento no encontrado" });
      }

      await departamento.destroy();
      return res.json({ message: "Departamento eliminado correctamente" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error al eliminar el departamento" });
    }
  }
}

export default DepartamentoController;
