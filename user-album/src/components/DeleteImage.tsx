import { useState } from "react";

const DeleteImage = () => {
    const [message, setMessage] = useState('');
    const [presignedUrl] = useState('https://photo-alum-tamar-testpnoren.s3.us-east-1.amazonaws.com/1.png');
  
    const handleDeleteImage = async () => {
      try {
        const response = await fetch(presignedUrl, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          setMessage('התמונה נמחקה בהצלחה!');
        } else {
          setMessage('שגיאה במחיקת התמונה');
        }
      } catch (error: any) {
        setMessage('שגיאה: ' + error.message);
      }
    };
  
    return (
      <div>
        <h2>מחיקת תמונה מ-S3</h2>
        <button onClick={handleDeleteImage}>מחק תמונה</button>
        {message && <p>{message}</p>}
      </div>
    );
  };
  
  export default DeleteImage;