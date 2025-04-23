import { useState } from "react";

const UploadToS3 = () => {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
  
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        setFile(event.target.files[0]);
      }
    };
  
    const uploadFile = async () => {
      if (!file) {
        alert("Please select a file first.");
        return;
      }
  
      setUploading(true);
  
      try {
        // בקשת URL זמני להעלאה
        const response = await fetch(
          `https://localhost:7256/api/Upload/presigned-url?fileName=${file.name}`
        );
  
        if (!response.ok) {
          throw new Error("Failed to get presigned URL");
        }
  
        const { url } = await response.json();
  
        // העלאת הקובץ ל-S3 ישירות
        const uploadResponse = await fetch(url, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": file.type,
          },
        });
  
        if (uploadResponse.ok) {
          alert("File uploaded successfully!");
        } else {
          throw new Error("Upload failed");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setUploading(false);
      }
    };
  
    return (
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={uploadFile} disabled={uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>
    );
  };
  
  export default UploadToS3;