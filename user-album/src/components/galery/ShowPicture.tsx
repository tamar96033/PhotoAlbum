import { useState } from "react"
import DeleteImage from "../DeleteImage"
import UploadToS3 from "../UploadToS3"

const ShowPicture = () => {
  const [isClicked, setIsClicked] = useState(false)
  const handleImg = () => {
    setIsClicked(true)
  }
  const url = 'https://photo-alum-tamar-testpnoren.s3.us-east-1.amazonaws.com/d40fcf80-bc3f-429f-a44b-6a90d75128f2.png'
  const [loaded, setLoaded] = useState(false);
  return (<>
    <img
      loading="lazy"
      onLoad={() => setLoaded(true)}
      style={{
        width: '100%',
        height: 'auto',
        borderRadius: '8px',
        transition: 'opacity 0.5s ease-in-out',
        opacity: loaded ? 1 : 0,
      }}
    />
    <img src={url} style={{ width: 200, height: 200 }} onClick={handleImg} />
    {isClicked &&
      <><UploadToS3 />
        <DeleteImage />
      </>}
  </>)
}

export default ShowPicture