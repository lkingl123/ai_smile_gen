import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { imageUrl, uid } = await req.json();

    if (!imageUrl || !imageUrl.startsWith("http") || !uid) {
      return NextResponse.json(
        { error: "Missing or invalid imageUrl or uid" },
        { status: 400 }
      );
    }

    // 🔁 Forward request to Python backend
    const PYTHON_BACKEND_URL =
      process.env.PYTHON_BACKEND_URL || "http://127.0.0.1:8000";

    const response = await fetch(`${PYTHON_BACKEND_URL}/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image_url: imageUrl, // ✅ correct snake_case key for Python
        uid,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text(); // log full raw response
      console.error("Python Backend Error:", errorText);
      return NextResponse.json(
        { error: "Failed to enhance the image." },
        { status: 500 }
      );
    }

    const { enhancedImageUrl } = await response.json();
    return NextResponse.json({ enhancedImageUrl });
  } catch (error) {
    console.error("Error in /api/enhance-image:", error);
    return NextResponse.json(
      { error: "Failed to enhance the image." },
      { status: 500 }
    );
  }
}
