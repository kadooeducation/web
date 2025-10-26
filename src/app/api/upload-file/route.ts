import { pinata } from "@/infra/external/pinata/pinata";
import { NextResponse, type NextRequest } from "next/server";

const groupId = "6ce2ee51-565e-4faf-9a89-3461de0bb026"

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    const { cid } = await pinata.upload.public
      .file(file)
      .group(groupId)
    const url = await pinata.gateways.public.convert(cid);
    return NextResponse.json({
      url,
      error: false,
    }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { name: "Internal Server Error", error: true },
      { status: 500 }
    );
  }
}