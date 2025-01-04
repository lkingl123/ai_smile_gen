import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { imageUrl } = await req.json();
    if (!imageUrl || !imageUrl.startsWith("http")) {
      return NextResponse.json({ error: "Invalid image URL" }, { status: 400 });
    }

    // Send request to Python backend
    const PYTHON_BACKEND_URL = process.env.PYTHON_BACKEND_URL || "http://127.0.0.1:8000";
    const response = await fetch(`${PYTHON_BACKEND_URL}/process-image`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("Python Backend Error:", errorResponse);
      return NextResponse.json({ error: "Failed to process the image." }, { status: 500 });
    }

    const { enhancedImageUrl } = await response.json();
    return NextResponse.json({ enhancedImageUrl });
  } catch (error) {
    console.error("Error in /api/process-image:", error);
    return NextResponse.json({ error: "Failed to enhance the image." }, { status: 500 });
  }
}
