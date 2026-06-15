/**
 * POST /api/literature/upload
 * Upload a text chunk to the Pinecone vector store
 * Body: { text: string; source: string }
 *
 * In a real system you'd also handle PDF parsing here using
 * a library like pdf-parse before chunking and embedding.
 */

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const apiKey = process.env.PINECONE_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Pinecone not configured — set PINECONE_API_KEY" },
      { status: 503 }
    );
  }

  const { text, source } = await req.json();

  if (!text || !source) {
    return NextResponse.json({ error: "text and source required" }, { status: 400 });
  }

  // TODO: embed text and upsert to Pinecone
  // See lib/literature.ts embedText() for the embedding step

  return NextResponse.json({
    message: "Upload endpoint ready — configure embedText() in lib/literature.ts",
    source,
    characters: text.length,
  });
}
