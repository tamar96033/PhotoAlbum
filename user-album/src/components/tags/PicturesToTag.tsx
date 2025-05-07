import { useEffect, useState } from "react"
import { useApiClient } from "../../contexts/ApiClientContext"
import { PictureDto } from "../../api/client"
import Pictures from "../galery/Pictures"
import './AllTags.css'

const PicturesToTag = ({ tagId }: { tagId: number }) => {

    const [pictures, setPictures] = useState<PictureDto[]>([])
    const [anyPicture, setAnyPicture] = useState(true)
    const apiClient = useApiClient()
    const token = "Bearer " + localStorage.getItem('token')

    useEffect(() => {
        const fetchData = async () => {
            try {
                
            
            const result = await apiClient.picturesByTag(tagId, token!)

            console.log('result picture to tag', result);
            setPictures(result)

               // Check if there are no pictures and update the anyPicture state accordingly
               if (result.length === 0) {
                setAnyPicture(true);
            } else {
                setAnyPicture(false);
            }
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                setAnyPicture(true)
                console.log('Resource not found (404)');
            } else {
                setAnyPicture(true)
                console.log('An error occurred:', error);
            }
        }
        }
        fetchData()
    }, [tagId])

    const pictureUrls = pictures.map((p) => p.url).filter((url): url is string => url !== undefined);

    return (<>
        pictures to tag
    {!anyPicture && <Pictures urls={pictureUrls}/>}
    {anyPicture && <div>there isnt pictures</div>}
        {/* <div>
            <h3>Pictures for Tag {tagId}</h3>
            <div className="picture-grid">
                {pictureUrls?.map((url, index) => (
                    <div key={index} className="picture-item">
                        <img src={url} alt={`Picture ${index + 1}`} />
                    </div>
                ))}
            </div> */}
        {/* </div> */}
    </>)
}

export default PicturesToTag