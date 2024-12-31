import { NextResponse } from "next/server";
import { enhanceSmile } from "../../../utils/huggingFaceApi";

export async function POST(req: Request) {
  try {
    console.log("Received request to /api/process-image");

    // Step 1: Parse the request body to get the image URL
    const { imageUrl } = await req.json();
    if (!imageUrl || !imageUrl.startsWith("http")) {
      console.error("Invalid or missing image URL:", imageUrl);
      return NextResponse.json({ error: "Invalid image URL" }, { status: 400 });
    }

    console.log("Processing image from URL:", imageUrl);

    // Step 2: Enhance Smile with Hugging Face API
    try {
      console.log("Calling Hugging Face API...");
      const enhancedImageUrl = await enhanceSmile(imageUrl); // Pass URL directly to enhanceSmile
      console.log("Enhanced Image URL received from Hugging Face:", enhancedImageUrl);

      return NextResponse.json({ enhancedImageUrl });
    } catch (hfError) {
      console.error("Error in Hugging Face API call:", hfError);
      throw new Error("Failed to call Hugging Face API.");
    }
  } catch (error) {
    console.error("Unexpected error in /api/process-image:", error);
    return NextResponse.json({ error: "Failed to enhance smile" }, { status: 500 });
  }
}
