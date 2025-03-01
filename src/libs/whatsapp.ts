import { Client, NoAuth } from "whatsapp-web.js";
import qrcode from "qrcode";
import { Server } from "socket.io";

console.log("Iniciando api whatsapp");
const whatsapp = new Client({
  puppeteer: {
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
  authStrategy: new NoAuth(),
});
export const initWhatsapp = (io: Server) => {
  whatsapp.on("qr", async (qr) => {
    console.log("QR generado, enviándolo al frontend..." + qr.toString());
    try {
      const qrUrl = await qrcode.toDataURL(qr);
      io.emit("qr-code", qrUrl);
    } catch (err) {
      console.error("Error al generar el código QR:", err);
    }
  });

  whatsapp.on("remote_session_saved", () => {
    console.log("Session saved");
  });

  whatsapp.on("ready", () => {
    console.log("Client is ready!");
  });

  whatsapp.initialize();
};
