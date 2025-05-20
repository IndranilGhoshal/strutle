import { NextResponse } from "next/server";
import { uploadFile } from "../_apiFunction/UploadFileFunction";

export async function POST(request) {
    const result = await uploadFile(request);
    return NextResponse.json(result)
}

