export async function uploadFileToS3(
    file: File,
    presignedUrl: string
  ): Promise<void> {
    const response = await fetch(presignedUrl, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file,
    });
  
    if (!response.ok) {
      throw new Error("Failed to upload to S3.");
    }
  }