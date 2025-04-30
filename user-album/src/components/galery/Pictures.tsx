import { useEffect, useState } from "react"
import { Picture } from "../../api/client"
import { useApiClient } from "../../contexts/ApiClientContext";
import UploadToS3 from "../UploadToS3";
import DeleteImage from "../DeleteImage";
import ShowPicture from "./ShowPicture";

const Pictures = () => {
    // const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;
    // const apiClient = useContext(ApiClientContext);
    const apiClient = useApiClient();

    const [pictures, setPictures] = useState<Picture[]>([])
    useEffect(() => {
        const fetchData = async () => {
            // const apiClient = new ApiClient(API_BASE_URL);
            console.log('apiClient', apiClient);

            try {
                // const result = await apiClient.pictureAll()
                const token = "Bearer " + localStorage.getItem('token')
                console.log(token);

                const result = await apiClient.pictureAll(token!)
                // const result = await apiClient.pictureAll(undefined)
                // console.log('func',apiClient.pictureGET);
                console.log('result', result);

                setPictures(result);
                console.log('pictures', pictures);
            } catch (error: any) {
                console.log('there is an error', error!.message);
            }
        };
        fetchData()

    }, [])

    const handle = () =>{
        console.log('pctures', pictures);
    }
    return (<>
        <ShowPicture />
<button onClick={handle}>sdfadf</button>
    </>)
}
export default Pictures