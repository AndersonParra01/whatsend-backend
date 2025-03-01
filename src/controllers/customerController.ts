import { Router, Response, Request } from "express";
import { CustomerService } from "../service/customerService";

const router = Router();
const customerService = new CustomerService();

router.get("/all", async (req: Request, res: Response) => {
  const customers = await customerService.getAllCustomers();
  res.json(customers);
});

router.get("/findId/:id", async (req: Request, res: any) => {
  const id = parseInt(req.params.id);
  const customer = await customerService.getCustomerById(id);
  if (!customer) {
    return res.status(404).json({ error: "Cliente no encontrado" });
  }
  return res.json(customer);
});


router.post("/create", async (req: Request, res: Response) => {
  const newCustomer = await customerService.createCustomer(req.body);
  res.status(201).json(newCustomer);
});

router.put("/update/:id", async (req: Request, res: any) => {
  const id = parseInt(req.params.id);

  const updatedCustomer = await customerService.updateCustomer(id, req.body);
  if (!updatedCustomer) {
    return res.status(404).json({ error: "Cliente no encontrado" });
  }
  res.json(updatedCustomer);
});

router.delete("/delete/:id", async (req: Request, res: any) => {
  const id = parseInt(req.params.id);
  const deleted = await customerService.deleteCustomer(id);
  if (!deleted) {
    return res.status(404).json({ error: "Cliente no encontrado" });
  }
  res.json({ message: "Cliente eliminado" });
});

export default router;
