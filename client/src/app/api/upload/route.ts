import { mkdir, writeFile } from "fs/promises"
import path from "path"

import { NextResponse } from "next/server"

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024
const MAX_FILES = 5

const sanitizeName = (name: string) => name.replace(/[^a-zA-Z0-9._-]/g, "_")

export async function POST(request: Request) {
  try {
    const data = await request.formData()
    const files = data.getAll("files") as File[]

    if (!files.length) {
      return NextResponse.json({ error: "No files provided." }, { status: 400 })
    }

    if (files.length > MAX_FILES) {
      return NextResponse.json(
        { error: `You can upload up to ${MAX_FILES} files at once.` },
        { status: 400 }
      )
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads")
    await mkdir(uploadDir, { recursive: true })

    const uploadedFiles: { name: string; size: number; path: string }[] = []

    for (const file of files) {
      const isPdf =
        file.type === "application/pdf" ||
        file.name.toLowerCase().endsWith(".pdf")

      if (!isPdf) {
        return NextResponse.json(
          { error: "Only PDF files are allowed." },
          { status: 400 }
        )
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        return NextResponse.json(
          { error: `File "${file.name}" exceeds 10 MB.` },
          { status: 400 }
        )
      }

      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const timestamp = Date.now()
      const safeFileName = sanitizeName(file.name)
      const storedName = `${timestamp}-${safeFileName}`
      const fullPath = path.join(uploadDir, storedName)
      await writeFile(fullPath, buffer)

      uploadedFiles.push({
        name: file.name,
        size: file.size,
        path: `/uploads/${storedName}`,
      })
    }

    return NextResponse.json({ files: uploadedFiles }, { status: 200 })
  } catch {
    return NextResponse.json({ error: "Failed to upload files." }, { status: 500 })
  }
}
