import { extractTextFromImage } from "./ocrService";
import { sendWhatsappMessage } from "./whatsappService";

export const processUploadedFiles = async (
  files: Express.Multer.File[]
): Promise<string[]> => {
  const messages: string[] = [];

  for (const file of files) {
    // Extrae el texto de la imagen usando el servicio de OCR
    const text = await extractTextFromImage(file.path);
    console.log(`Texto extraído de ${file.originalname}:`, text);

    // Busca el contenido entre corchetes
    const bracketRegex = /\[(.+?)\]/;
    const bracketMatch = text.match(bracketRegex);
    console.log("Match de corchetes:", bracketMatch);

    if (bracketMatch) {
      // Extrae el contenido dentro de los corchetes
      const data = bracketMatch[1].trim();
      // Se asume que los datos están separados por espacios, ejemplo: "Anderson Parra 983755870"
      const dataParts = data.split(/\s+/);
      console.log("Partes extraídas:", dataParts);

      // Validamos que se hayan extraído al menos 3 partes: nombre, apellido y teléfono
      if (dataParts.length >= 3) {
        const name = dataParts[0];
        const surname = dataParts[1];
        const phone = dataParts[2];
        const personalizedMessage = `Hola ${name} ${surname}, este es un mensaje personalizado.`;

        console.log(`Mensaje personalizado final: ${personalizedMessage}`);

        // Envía el mensaje vía WhatsApp
        try {
          await sendWhatsappMessage(phone, personalizedMessage);
          messages.push(`Mensaje enviado a ${phone}`);
        } catch (error: any) {
          console.error(`Error enviando mensaje a ${phone}:`, error);
          messages.push(`Error enviando mensaje a ${phone}: ${error.message}`);
        }
      } else {
        messages.push(
          `No se pudo extraer la información completa de ${file.originalname}`
        );
      }
    } else {
      messages.push(`No se pudo extraer información de ${file.originalname}`);
    }
  }

  return messages;
};
