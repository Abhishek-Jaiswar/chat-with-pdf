import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

const messages = [
  {
    id: 1,
    role: "assistant",
    text: "Upload one or more PDFs and ask a question. I will answer using only your indexed documents.",
  },
  {
    id: 2,
    role: "user",
    text: "Summarize the onboarding section and list the top 3 action items.",
  },
  {
    id: 3,
    role: "assistant",
    text: "I can do that once your files are available in this workspace. Use the upload flow, then ask your question again.",
  },
]

const indexedDocs = [
  "Q4 Product Brief.pdf",
  "Customer Interviews.pdf",
  "Onboarding Playbook.pdf",
]

export function ChatArea({ showDocuments = true }: { showDocuments?: boolean }) {
  return (
    <div className="@container/main flex flex-1 flex-col p-4 md:p-6">
      <div
        className={`grid flex-1 gap-4 ${
          showDocuments ? "lg:grid-cols-[minmax(0,1fr)_320px]" : "grid-cols-1"
        }`}
      >
        <Card className="flex min-h-0 flex-1 flex-col">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between gap-2">
              <CardTitle>Document Chat</CardTitle>
              <Badge variant="secondary">Workspace Ready</Badge>
            </div>
          </CardHeader>
          <CardContent className="flex min-h-0 flex-1 flex-col gap-4 p-4">
            <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto rounded-lg border bg-muted/20 p-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                    message.role === "user"
                      ? "ml-auto bg-primary text-primary-foreground"
                      : "border bg-background"
                  }`}
                >
                  {message.text}
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <Textarea
                placeholder="Ask a question about your documents..."
                className="min-h-24 resize-none"
              />
              <div className="flex justify-end">
                <Button>Send message</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {showDocuments ? (
          <Card className="h-fit">
            <CardHeader className="border-b">
              <CardTitle className="text-base">Indexed Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 p-4">
              {indexedDocs.map((doc) => (
                <div
                  key={doc}
                  className="rounded-md border bg-muted/20 px-3 py-2 text-sm"
                >
                  {doc}
                </div>
              ))}
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  )
}
