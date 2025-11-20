// import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client
// process.env.API_KEY is injected by the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeFashionImage = async (base64Image: string): Promise<string> => {
  try {
    // Remove the data URL prefix if present (e.g., "data:image/jpeg;base64,")
    const cleanBase64 = base64Image.split(',')[1] || base64Image;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg', // Assuming JPEG, Gemini handles standard formats
              data: cleanBase64,
            },
          },
          {
            text: `
              You are a professional fashion stylist and AI prompt engineer.
              Analyze the uploaded fashion image in detail.
              
              Your goal is to generate a comma-separated list of high-quality English keywords tailored for image generation tools like ImageFX or Midjourney.
              
              Focus on extracting:
              1. Garment details (e.g., oversized hoodie, pleated skirt, bomber jacket)
              2. Material & Texture (e.g., denim, satin sheen, chunky knit, iridescent)
              3. Colors (be specific, e.g., neon green, pastel pink, matte black)
              4. Accessories (e.g., chunky silver chain, beanie, rimless sunglasses)
              5. Vibe & Style (e.g., Y2K, cyberpunk, streetwear, harajuku fashion, pop art)
              6. Lighting & Composition (e.g., studio lighting, vibrant background, fisheye lens)

              Output format rules:
              - ONLY return the comma-separated English keywords.
              - Do NOT write sentences or explanations.
              - Do NOT include Markdown formatting like **bold**.
              - Prioritize visual descriptors.
            `
          }
        ]
      }
    });

    return response.text || "解析できませんでした。もう一度お試しください。";

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("画像の解析中にエラーが発生しました。");
  }
};
