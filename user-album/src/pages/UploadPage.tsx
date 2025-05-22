import { Heading } from "../components/ui/heading"
import { UploadForm } from "../components/upload/UploadForm"

export default function UploadPage() {
  return (
    <div className="flex flex-col gap-6">
      <Heading as="h1" size="2xl">
        Upload Photos
      </Heading>
      <p className="text-muted-foreground">
        Upload your photos and our AI will automatically categorize them into albums.
      </p>
      <UploadForm />
    </div>
  )
}
