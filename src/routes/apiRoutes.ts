import { Router } from "express";
import multer from "multer";
import { processUploads } from "./../controllers/uploadController";
import customerController from '../controllers/customerController'
import deliveryController from '../controllers/deliveryController'
import messageController from '../controllers/messageController'
// Configuración de multer
const upload = multer({ dest: "uploads/" });

const router = Router();

router.post("/upload", upload.array("files"), processUploads);
router.use("/upload-files", processUploads)
router.use("/customers", customerController)
router.use("/deliveries", deliveryController)
router.use("/messages", messageController)


export default router;
