"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, Loader2, UploadCloud } from "lucide-react"

import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type UploadResponse = {
  files: { name: string; size: number; path: string }[]
}

const MAX_FILES = 5

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const Uploader = () => {
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([])
  const [uploadedFiles, setUploadedFiles] = React.useState<UploadResponse["files"]>([])
  const [isDragging, setIsDragging] = React.useState(false)
  const [isUploading, setIsUploading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const addFiles = React.useCallback((incomingFiles: FileList | null) => {
    if (!incomingFiles?.length) return

    const pdfFiles = Array.from(incomingFiles).filter(
      (file) =>
        file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")
    )

    setSelectedFiles((prev) => {
      const deduped = [...prev]
      for (const file of pdfFiles) {
        const exists = deduped.some(
          (existing) =>
            existing.name === file.name &&
            existing.size === file.size &&
            existing.lastModified === file.lastModified
        )
        if (!exists) deduped.push(file)
      }
      return deduped.slice(0, MAX_FILES)
    })
  }, [])

  const onUpload = async () => {
    if (!selectedFiles.length || isUploading) return

    try {
      setIsUploading(true)
      setError(null)
      const formData = new FormData()
      selectedFiles.forEach((file) => formData.append("files", file))

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const payload = await response.json()
      if (!response.ok) {
        throw new Error(payload?.error || "Upload failed.")
      }

      setUploadedFiles(payload.files ?? [])
      setSelectedFiles([])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="flex h-full w-full flex-col gap-4 bg-accent/20 p-4 md:p-6">
      <div className="flex items-center justify-between rounded-xl border bg-background px-3 py-2">
        <Button asChild variant="ghost" size="sm">
          <Link href="/dashboard" className="gap-1">
            <ArrowLeft className="size-4" />
            Back
          </Link>
        </Button>
        <Logo />
      </div>

      <div
        className={cn(
          "flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed bg-background px-6 py-10 text-center transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-border"
        )}
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault()
          setIsDragging(false)
          addFiles(event.dataTransfer.files)
        }}
      >
        <div className="mb-3 flex size-14 items-center justify-center rounded-xl bg-secondary">
          <UploadCloud className="size-8 text-primary" />
        </div>
        <p className="text-sm font-medium">Drop PDF files here or click to browse</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Up to {MAX_FILES} files. PDF only.
        </p>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept=".pdf,application/pdf"
          multiple
          onChange={(event) => addFiles(event.target.files)}
        />
      </div>

      <div className="rounded-xl border bg-background p-4">
        <p className="text-sm font-medium">Selected files</p>
        <div className="mt-3 space-y-2">
          {selectedFiles.length ? (
            selectedFiles.map((file) => (
              <div
                key={`${file.name}-${file.size}-${file.lastModified}`}
                className="flex items-center justify-between rounded-md border px-3 py-2 text-sm"
              >
                <span className="truncate pr-4">{file.name}</span>
                <span className="text-muted-foreground">{formatSize(file.size)}</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No files selected yet.</p>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <Button onClick={onUpload} disabled={!selectedFiles.length || isUploading}>
            {isUploading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload PDFs"
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => setSelectedFiles([])}
            disabled={!selectedFiles.length || isUploading}
          >
            Clear
          </Button>
        </div>
      </div>

      {error ? (
        <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      ) : null}

      {uploadedFiles.length ? (
        <div className="rounded-xl border bg-background p-4">
          <p className="text-sm font-medium">Uploaded files</p>
          <div className="mt-3 space-y-2">
            {uploadedFiles.map((file) => (
              <div
                key={`${file.path}-${file.size}`}
                className="flex items-center justify-between rounded-md border px-3 py-2 text-sm"
              >
                <span className="truncate pr-4">{file.name}</span>
                <span className="text-muted-foreground">{formatSize(file.size)}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Uploader
