import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario";
import Departamento from "../models/Departamento";
import "dotenv/config";
import RecuperarContrasena from "../models/RecuperarContraseña";
import { sendEmail } from "../services/mailService/mailService";
import { Op } from "sequelize";

function getRedirectForRole(rol_id: number): string {
  switch (rol_id) {
    case 1:
      return "/techUser";
    case 2:
      return "/user";
    case 3:
      return "/tech";
    default:
      return "/login";
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as { email: string; password: string };

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email y password son requeridos" });
    }

    const usuario = await Usuario.findOne({
      where: { email, activo: true },
      include: [
        {
          model: Departamento,
          as: "Departamento",
          attributes: ["id", "nombre"],
        },
      ],
    });

    if (!usuario) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const passOk = await bcrypt.compare(password, usuario.password);
    if (!passOk) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Actualiza última sesión
    usuario.ultima_sesion = new Date();
    await usuario.save();

    const payload = usuario.toJSON();

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    const redirectUrl = getRedirectForRole(usuario.rol_id);

    return res.status(200).json({
      message: "Login exitoso",
      token,
      redirectUrl,
      user: payload,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error interno" });
  }
};

export const recuperarContraseña = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const usuario = await Usuario.findOne({
      where: {
        email: email,
      },
    });

    if (!usuario) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const codigo =
      Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000;
    const hashCodigo = await bcrypt.hash(String(codigo), 3);
    await RecuperarContrasena.update(
      { usado: true },
      {
        where: {
          usuario_id: usuario.id,
        },
      },
    );
    await RecuperarContrasena.create({
      usuario_id: usuario.id,
      token_hash: hashCodigo,
    });

    sendEmail({
      to: usuario.email,
      subject: "Olvido de contraseña",
      text: `Tu codigo de recuperación de contraseña es: "${codigo}". Este codigo tiene un tiempo de vencimiento de 10 minutos y un uso unico.`,
    });

    return res.status(200).json({ message: "ok" });
  } catch (error) {
    return res.status(401).json(error);
  }
};

export const validarCodigo = async (req: Request, res: Response) => {
  try {
    const { email, codigo, password } = req.body;

    const usuario = await Usuario.findOne({
      where: {
        email: email,
      },
    });

    if (!usuario) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const code = await RecuperarContrasena.findOne({
      where: {
        usuario_id: usuario.id,
        usado: false,
        fecha_expiracion: {
          [Op.gt]: new Date(),
        },
      },
    });

    if (!code) {
      return res
        .status(401)
        .json({ message: "Codigo expirado" });
    }

    const passOk = await bcrypt.compare(codigo, code.token_hash);
    if (!passOk) {
      return res
        .status(401)
        .json({ message: "Codigo de autentificacion incorrecto" });
    }

    await RecuperarContrasena.update({usado: true}, {where:{
      id: code.id
    }})

    const hashedPassword = await bcrypt.hash(password, 10);

    await Usuario.update(
      { password: hashedPassword },
      {
        where: {
          id: usuario.id,
        },
      },
    );

    return res.status(200).json({ message: "ok" });
  } catch (error) {
    return res.status(401).json(error);
  }
};
