import { Router, Request, Response } from "express";
import { BrancheService } from "../service/brancheService";

const router = Router();
const branchService = new BrancheService();

router.get("/all", async (req: Request, res: Response) => {
    const branchOffices = await branchService.getAllBranchOffices();
    res.json(branchOffices);
});

router.get("/findBy/:id", async (req: Request, res: any) => {
    const id = parseInt(req.params.id);
    const branchOffice = await branchService.getBranchOfficeById(id);
    if (!branchOffice) {
        return res.status(404).json({ error: "Sucursal no encontrada" });
    }
    return res.json(branchOffice);
});

router.post("/create", async (req: Request, res: Response) => {
    const newBranchOffice = await branchService.createBranchOffice(req.body);
    res.status(201).json(newBranchOffice);
});

router.put("/update/:id", async (req: Request, res: any) => {
    const id = parseInt(req.params.id);
    const updatedBranchOffice = await branchService.updateBranchOffice(id, req.body);
    if (!updatedBranchOffice) {
        return res.status(404).json({ error: "Sucursal no encontrada" });
    }
    return res.json(updatedBranchOffice);
});

router.delete("/delete/:id", async (req: Request, res: any) => {
    const id = parseInt(req.params.id);
    const deleted = await branchService.deleteBranchOffice(id);
    if (!deleted) {
        return res.status(404).json({ error: "Sucursal no encontrada" });
    }
    return res.json({ message: "Sucursal eliminada" });
});


export default router;