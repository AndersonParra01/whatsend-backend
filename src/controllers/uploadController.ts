import { Request, Response } from "express";
import { processUploadedFiles } from "./../service/uploadService";

export const processUploads = async (
  req: Request,
  res: Response
): Promise<void> => {
  const files = req.files as Express.Multer.File[];
  console.log("Files", files);
  // Se delega la lógica de negocio al servicio
  const messages = await processUploadedFiles(files);
  res.json({ messages });
};
