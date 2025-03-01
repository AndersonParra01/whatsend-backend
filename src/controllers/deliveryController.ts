import { Router, Request, Response } from "express";
import { DeliveryService } from "../service/deliveryService";

const router = Router();
const deliveryService = new DeliveryService();

router.get("/", async (req: Request, res: Response) => {

	const deliveries = await deliveryService.getAllDeliveries();
	res.json(deliveries);

});

router.get("/:id", async (req: Request, res: any) => {
	const id = parseInt(req.params.id);

	const delivery = await deliveryService.getDeliveryById(id);
	if (!delivery) {
		return res.status(404).json({ error: "Entrega no encontrada" });
	}
	res.json(delivery);

});

router.post("/", async (req: Request, res: Response) => {

	const newDelivery = await deliveryService.createDelivery(req.body);
	res.status(201).json(newDelivery);

});

router.put("/:id", async (req: Request, res: any) => {
	const id = parseInt(req.params.id);

	const updatedDelivery = await deliveryService.updateDelivery(id, req.body);
	if (!updatedDelivery) {
		return res.status(404).json({ error: "Entrega no encontrada" });
	}
	res.json(updatedDelivery);

});

router.delete("/:id", async (req: Request, res: any) => {
	const id = parseInt(req.params.id);
	const deleted = await deliveryService.deleteDelivery(id);
	if (!deleted) {
		return res.status(404).json({ error: "Entrega no encontrada" });
	}
	res.json({ message: "Entrega eliminada" });
});

export default router;
