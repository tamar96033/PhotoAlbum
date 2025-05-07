import React, { useState } from 'react';
import { useApiClient } from '../../contexts/ApiClientContext';
import { FileParameter } from '../../api/client';
// import { useApiClient } from '../../api/client'; // מייבא את ה-ApiClient שנוצר על ידי NSwag

const convertToFileParameter = (file: File): FileParameter => ({
    data: file,
    fileName: file.name,
  });
  
const UploadImage = () => {
    const [file, setFile] = useState<File | null>(null);
    const [tags, setTags] = useState('');
    const [uploading, setUploading] = useState(false);
    // const { uploadFile } = useApiClient(); // הפונקציה שהגדרת ב-NSwag
    const token = "Bearer " + localStorage.getItem('token')
    const apiClient = useApiClient();


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTags(e.target.value);
    };

    const handleUpload = async () => {
        if (!file) {
            alert('Please select a file!');
            return;
        }

        setUploading(true);
        try {

            const fileParameter = convertToFileParameter(file);
              // Modify the request to include the headers
              const response = await apiClient.uploadFile(token, fileParameter, tags);
            console.log('response', response);
            
            alert('File uploaded successfully!');
        } catch (error) {
            alert('Failed to upload file.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <input
                type="text"
                value={tags}
                onChange={handleTagsChange}
                placeholder="Enter tags, separated by commas"
            />
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
        </div>
    );
};

export default UploadImage;