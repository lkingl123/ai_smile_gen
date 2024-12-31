export async function convertImageUrlToBase64(imageUrl: string): Promise<string> {
    try {
      console.log("Fetching image from URL:", imageUrl);
      const response = await fetch(imageUrl);
  
      if (!response.ok) {
        console.error(`Failed to fetch image. HTTP Status: ${response.status}`);
        throw new Error(`Failed to fetch image from URL. Status: ${response.status}`);
      }
  
      const buffer = await response.arrayBuffer();
      console.log("Image fetched successfully. Buffer size (bytes):", buffer.byteLength);
  
      const base64Image = Buffer.from(buffer).toString("base64");
  
      console.log("Base64 Image Generated. Length:", base64Image.length);
      return base64Image;
    } catch (error) {
      console.error("Error in convertImageUrlToBase64:", error);
      throw new Error("Failed to fetch and convert image to Base64.");
    }
  }
  