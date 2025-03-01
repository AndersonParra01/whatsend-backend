import { Router, Request, Response } from "express";
import { MessageService } from "../service/messageService";

const router = Router();
const messageService = new MessageService();

router.get("/all", async (req: Request, res: Response) => {
  const messages = await messageService.getMessages();  // Ejemplo de obtención de datos
  res.json(messages);
});

router.get("/findBy/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const message = await messageService.getMessageById(id);
  if (!message) {
    res.status(404).json({ error: "Mensaje no encontrado" });
  }
  res.json(message);
});

router.post("/create", async (req: Request, res: Response) => {
  console.log('BODY', req.body);
  const newMessage = await messageService.createMessage(req.body);
  res.status(201).json(newMessage);
});

router.put("/update/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const updatedMessage = await messageService.updateMessage(id, req.body);
  if (!updatedMessage) {
    res.status(404).json({ error: "Mensaje no encontrado" });
  }
  res.json(updatedMessage);
});

router.delete("/delete/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  await messageService.deleteMessage(id);
  res.json({ message: "Mensaje eliminado" });
});

export default router;
