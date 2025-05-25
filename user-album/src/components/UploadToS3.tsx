import React, { useState } from "react";
import { useApiClient } from "../contexts/ApiClientContext";

// interface FileParameter {
//   data: Blob;
//   fileName: string;
// }

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  // const [tags, setTags] = useState<string>(''); // Tags as a comma-separated string
  // const [uploading, setUploading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);
  const token = "Bearer " + localStorage.getItem('token')

  const apiClient = useApiClient();

  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
        setFile(selectedFile);
    }
  };

  
//   const handleTagsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setTags(event.target.value);
// };


  const handleUpload = async () => {
    if (!file) return;

    try{
      

      const fileParameter = {
        data: file, // this is the file itself
        fileName: file.name, // this is the file name
      };

      const result = await apiClient.uploadFile(token, fileParameter)
      console.log('result', result);
      

    }catch(error: any){
      console.error("Upload error:", error);
      alert("Upload failed!");
    }
    
  };

//   const handleSubmit = async () => {
//     if (!file) {
//         setError('Please select a file to upload');
//         return;
//     }

//     setUploading(true);
//     setError(null);

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('tags', tags);  // Append the tags here

//     const fileParameter: FileParameter = {
//       data: file,
//       fileName: file.name,
//     };
    
//     try {

//         const response = await apiClient.uploadFile(token, fileParameter)
//         console.log(response);  // Handle success
//     } catch (err) {
//         setError('Error uploading the file');
//     } finally {
//         setUploading(false);
//     }
// };

  return (
    <div className="flex flex-col gap-4 p-4 max-w-md mx-auto">
      <input type="file" onChange={handleFileChange} />
      <button
        className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
        onClick={handleUpload}
        disabled={!file}
      >
        Upload to S3
      </button>
    </div>
  );
};

export default Upload;









// import React, { useState } from "react";
// import { useApiClient } from "../contexts/ApiClientContext";


// const Upload = () => {
//   const [file, setFile] = useState<File | null>(null);
//     const apiClient = useApiClient();

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files?.length) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) return;

//     try {
//       // 1. Ask the backend for a presigned URL
//       const token = "Bearer "+ localStorage.getItem('token')
//       const result = await apiClient.uploadUrl(file.name, token);
//       console.log('result', result);
      
//       // 2. Upload file directly to S3 using the URL
//       const uploadResponse = await fetch(result.url, {
//         method: "PUT",
//         headers: { "Content-Type": file.type },
//         body: file,
//       });

//       if (!uploadResponse.ok) {
//         throw new Error("Failed to upload to S3.");
//       }


//       apiClient.upload(file.name, result.url, token, ["tag1", "tag2"])
//       alert("Upload successful!");

//     } catch (error) {
//       console.error("Upload error:", error);
//       alert("Upload failed!");
//     }
//   };

//   return (<>
//     <div className="flex flex-col gap-4 p-4 max-w-md mx-auto">
//       <input type="file" onChange={handleFileChange} />
//       <button
//         className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
//         onClick={handleUpload}
//         disabled={!file}
//       >
//         Upload to S3
//       </button>
//     </div>
//     </>
//   );
// };

// export default Upload;
























// import { useState } from "react";

// const UploadToS3 = () => {
//     const [file, setFile] = useState<File | null>(null);
//     const [uploading, setUploading] = useState(false);
  
//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//       if (event.target.files) {
//         setFile(event.target.files[0]);
//       }
//     };
  
//     const uploadFile = async () => {
//       if (!file) {
//         alert("Please select a file first.");
//         return;
//       }
  
//       setUploading(true);
  
//       try {
//         // בקשת URL זמני להעלאה
//         const response = await fetch(
//           `https://localhost:7256/api/Upload/presigned-url?fileName=${file.name}`
//         );
  
//         if (!response.ok) {
//           throw new Error("Failed to get presigned URL");
//         }
  
//         const { url } = await response.json();
  
//         // העלאת הקובץ ל-S3 ישירות
//         const uploadResponse = await fetch(url, {
//           method: "PUT",
//           body: file,
//           headers: {
//             "Content-Type": file.type,
//           },
//         });
  
//         if (uploadResponse.ok) {
//           alert("File uploaded successfully!");
//         } else {
//           throw new Error("Upload failed");
//         }
//       } catch (error) {
//         console.error("Error uploading file:", error);
//       } finally {
//         setUploading(false);
//       }
//     };
  
//     return (
//       <div>
//         <input type="file" onChange={handleFileChange} />
//         <button onClick={uploadFile} disabled={uploading}>
//           {uploading ? "Uploading..." : "Upload"}
//         </button>
//       </div>
//     );
//   };
  
//   export default UploadToS3;