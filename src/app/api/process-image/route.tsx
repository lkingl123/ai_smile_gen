import { NextResponse } from "next/server";
import { convertImageUrlToBase64 } from "../../../utils/imageUtils";
import { enhanceSmile } from "../../../utils/huggingFaceApi";

export async function POST(req: Request) {
  try {
    console.log("Received request to /api/process-image");

    const { imageUrl } = await req.json();
    if (!imageUrl || !imageUrl.startsWith("http")) {
      console.error("Invalid or missing image URL:", imageUrl);
      return NextResponse.json({ error: "Invalid image URL" }, { status: 400 });
    }

    console.log("Processing image from URL:", imageUrl);

    // Step 1: Convert Image URL to Base64
    try {
      const imageBase64 = await convertImageUrlToBase64(imageUrl);
      console.log("Image successfully converted to Base64. Length:", imageBase64.length);

      // Step 2: Enhance Smile with Hugging Face API
      try {
        console.log("Calling Hugging Face API...");
        const enhancedImageUrl = await enhanceSmile(imageBase64);
        console.log("Enhanced Image URL received from Hugging Face:", enhancedImageUrl);

        return NextResponse.json({ enhancedImageUrl });
      } catch (hfError) {
        console.error("Error in Hugging Face API call:", hfError);
        throw new Error("Failed to call Hugging Face API.");
      }
    } catch (base64Error) {
      console.error("Error converting image to Base64:", base64Error);
      throw new Error("Failed to convert image to Base64.");
    }
  } catch (error) {
    console.error("Unexpected error in /api/process-image:", error);
    return NextResponse.json({ error: "Failed to enhance smile" }, { status: 500 });
  }
}
