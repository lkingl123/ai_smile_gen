export async function enhanceSmile(imageUrl: string): Promise<string> {
    try {
        console.log("Processing image from URL:", imageUrl);

        console.log("Calling Hugging Face API...");
        const response = await fetch(
            "https://api-inference.huggingface.co/models/stable-diffusion-v1-5/stable-diffusion-v1-5",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    inputs: {
                        image: imageUrl, // Direct URL to the image
                        text: "a person with a perfect smile and straightened teeth",
                    },
                    parameters: {
                        strength: 0.8, // Control similarity to original image
                        num_inference_steps: 50, // Number of denoising steps
                        guidance_scale: 7.5, // Control alignment with the prompt
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

        if (result && result.images && result.images[0]?.url) {
            return result.images[0].url;
        } else {
            throw new Error("Unexpected response format from Hugging Face API.");
        }
    } catch (error) {
        console.error("Error in enhanceSmile:", error);
        throw new Error("Failed to call Hugging Face API.");
    }
}
