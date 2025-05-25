import { useState } from "react"
import DeleteImage from "../DeleteImage"
import UploadImage from "../s3/UploadImage"

const ShowPicture = ({url}: {url: string}) => {
  const [isClicked, setIsClicked] = useState(false)
  const handleImg = () => {
    setIsClicked(true)
  }
  // const url = 'https://photo-alum-tamar-testpnoren.s3.us-east-1.amazonaws.com/a74fd91f-b9f3-4f4c-95c0-9c8c2910dbca.jpg'
  // const [loaded, setLoaded] = useState(false);
  return (<>
    <div style={{
      breakInside: 'avoid-column',
      marginBottom: '16px',
    }}>
      <img
        src={url}
        alt=""
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          borderRadius: '8px',
        }}
        onClick={handleImg}
      />
    </div>
    {/* <div style={{
            position: 'relative',
            width: '100%',
            height: 'auto',
        }}>
            <img
                src={url}
                alt="picture"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                    // width: '100%',           // Ensures the image fills the grid cell
                    // height: 'auto',          // Maintains aspect ratio
                    // objectFit: 'cover',      // Ensures the image covers the container without stretching
                    // borderRadius: '8px',     // Optional: Add border radius for rounded corners
                    // boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',  // Optional: Add a shadow effect
                }}
            />
        </div> */}
    {/* <img
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
    <img
            src={url}
            alt="Picture"
            style={{
                width: '100%',     // or a fixed width like '300px'
                height: 'auto',     // auto maintains aspect ratio
                maxWidth: '300px',  // optional: limit maximum size
                display: 'block',
                marginBottom: '10px',
                objectFit: 'contain' // ensures proper fit if wrapped
            }}
        /> */}
    {/* <img src={url} style={{ width: 200, height: 200 }} onClick={handleImg} /> */}
    {isClicked &&
      <><UploadImage />
        <DeleteImage />
      </>}
  </>)
}

export default ShowPicture