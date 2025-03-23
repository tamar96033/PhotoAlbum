import { useEffect, useState } from "react"
import { Picture } from "../api/client"
import { useApiClient } from "../contexts/ApiClientContext";

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
                const token = "Bearer "+ localStorage.getItem('token')
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
    return (<>
        <div>
            <h1>Pictures</h1>
            <div>
                {pictures && pictures.length > 0 ? (
                    pictures.map((picture) => (
                        <div key={picture.id}>
                            {/* <img src={picture.url} alt={picture.name} /> */}
                            <p>{picture.name}</p>
                            {/* {picture.pictureTags?.map((tag)=>(
                                <div>tag - {tag.id}</div>
                            ))} */}
                        </div>
                    ))
                ) : (
                    <p>No pictures available.</p>
                )}
            </div>
        </div>
    </>)
}
export default Pictures