export async function enhanceSmile(imageBase64: string): Promise<string> {
    try {
      console.log("Fetching and converting image to base64...");
      console.log("Base64 Image Length:", imageBase64.length);
      console.log("Base64 Preview:", imageBase64.substring(0, 100));
  
      console.log("Calling Hugging Face API...");
      const response = await fetch(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-3.5-large",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: imageBase64, // Only the image goes here
            parameters: {
              prompt: "a person with a perfect smile and straightened teeth", // Prompt should go here
            },
            options: { wait_for_model: true },
          }),
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Hugging Face API Error:", errorData);
        throw new Error(`Hugging Face API failed. ${errorData.error || ""}`);
      }
  
      const result = await response.json();
      console.log("Hugging Face API Response:", result);
  
      if (result && Array.isArray(result) && result[0]?.url) {
        return result[0].url; // Ensure this matches the API's response format
      } else {
        throw new Error("Unexpected response format from Hugging Face API.");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred.";
      console.error("Error in enhanceSmile:", errorMessage);
      throw new Error("Failed to call Hugging Face API.");
    }
  }
  