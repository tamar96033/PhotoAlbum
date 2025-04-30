import React, { useState } from 'react';

const UploadFolder = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{ [fileName: string]: number }>({});

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    for (const file of files) {
      try {
        const response = await fetch(`/api/pictures/presigned-upload-url?fileName=${file.name}`);
        const data = await response.json();
        const url = data.url;

        await uploadFileWithProgress(url, file);
      } catch (error) {
        console.error('שגיאה בהעלאה:', error);
      }
    }

    alert('העלאת כל הקבצים הסתיימה!');
  };

  const uploadFileWithProgress = (url: string, file: File) => {
    return new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', url);
      xhr.setRequestHeader('Content-Type', file.type);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentCompleted = Math.round((event.loaded * 100) / event.total);
          setUploadProgress((prevProgress) => ({
            ...prevProgress,
            [file.name]: percentCompleted,
          }));
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve();
        } else {
          reject(new Error('Upload failed'));
        }
      };

      xhr.onerror = () => reject(new Error('Upload error'));
      xhr.send(file);
    });
  };

  return (
    <div>
      <input
        type="file"
        webkitdirectory="true"
        multiple
        onChange={handleFileChange}
      />
      <button onClick={handleUpload}>העלה תיקייה</button>

      <div style={{ marginTop: '20px' }}>
        {files.map((file) => (
          <div key={file.name} style={{ marginBottom: '10px' }}>
            <div>{file.name}</div>
            <div style={{ width: '100%', backgroundColor: '#eee', borderRadius: '4px' }}>
              <div
                style={{
                  width: `${uploadProgress[file.name] || 0}%`,
                  height: '8px',
                  backgroundColor: '#2196f3',
                  borderRadius: '4px',
                  transition: 'width 0.3s',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadFolder;
