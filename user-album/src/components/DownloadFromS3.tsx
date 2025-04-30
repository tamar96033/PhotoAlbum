//from GPT מוצאי שבת
async function downloadFileFromS3(url: string, fileName: string) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch file from S3');
    }else{
      console.log('dont Failed to fetch file from S3');
      
    }

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error('Download error:', error);
  }
}

const downloadFromS3 = () => {
    
  const handleDownload=async ()=>{

  await downloadFileFromS3(
    'https://photo-alum-tamar-testpnoren.s3.us-east-1.amazonaws.com/1.png','1.png'
  );}
  return(<>
  <button onClick={handleDownload}>download</button></>)
}

export default downloadFromS3
