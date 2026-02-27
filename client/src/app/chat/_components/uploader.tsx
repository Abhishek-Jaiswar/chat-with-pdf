"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, UploadCloud } from "lucide-react";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type UploadedFile = {
  name: string;
  size: number;
  path: string;
};

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const Uploader = () => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [uploadedFile, setUploadedFile] = React.useState<UploadedFile | null>(
    null,
  );
  const [isDragging, setIsDragging] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const setPdfFile = React.useCallback((incomingFiles: FileList | null) => {
    if (!incomingFiles?.length) return;

    const pdfFiles = Array.from(incomingFiles).filter(
      (file) =>
        file.type === "application/pdf" ||
        file.name.toLowerCase().endsWith(".pdf"),
    );

    if (!pdfFiles.length) {
      setError("Please select a PDF file.");
      return;
    }

    if (pdfFiles.length > 1) {
      setError("Please choose only one PDF.");
      return;
    }

    setError(null);
    setSelectedFile(pdfFiles[0]);
    setUploadedFile(null);
  }, []);

  const onUpload = async () => {
    if (!selectedFile || isUploading) return;

    try {
      setIsUploading(true);
      setError(null);
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("http://localhost:8080/upload/pdf", {
        method: "POST",
        body: formData,
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || "Upload failed.");
      }

      setUploadedFile(payload.file ?? null);
      setSelectedFile(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

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
          isDragging ? "border-primary bg-primary/5" : "border-border",
        )}
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          setPdfFile(event.dataTransfer.files);
        }}
      >
        <div className="mb-3 flex size-14 items-center justify-center rounded-xl bg-secondary">
          <UploadCloud className="size-8 text-primary" />
        </div>
        <p className="text-sm font-medium">Drop a PDF here or click to browse</p>
        <p className="mt-1 text-xs text-muted-foreground">One PDF only.</p>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept=".pdf,application/pdf"
          onChange={(event) => setPdfFile(event.target.files)}
        />
      </div>

      <div className="rounded-xl border bg-background p-4">
        <p className="text-sm font-medium">Selected file</p>
        <div className="mt-3 space-y-2">
          {selectedFile ? (
            <div className="flex items-center justify-between rounded-md border px-3 py-2 text-sm">
              <span className="truncate pr-4">{selectedFile.name}</span>
              <span className="text-muted-foreground">
                {formatSize(selectedFile.size)}
              </span>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No file selected yet.</p>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <Button onClick={onUpload} disabled={!selectedFile || isUploading}>
            {isUploading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload PDF"
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => setSelectedFile(null)}
            disabled={!selectedFile || isUploading}
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

      {uploadedFile ? (
        <div className="rounded-xl border bg-background p-4">
          <p className="text-sm font-medium">Uploaded file</p>
          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between rounded-md border px-3 py-2 text-sm">
              <span className="truncate pr-4">{uploadedFile.name}</span>
              <span className="text-muted-foreground">
                {formatSize(uploadedFile.size)}
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Uploader;
