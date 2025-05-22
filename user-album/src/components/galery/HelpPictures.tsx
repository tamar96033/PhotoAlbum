import { useEffect, useState } from "react";
import { Picture } from "../../api/client";
import { useApiClient } from "../../contexts/ApiClientContext";
import Pictures from "./Pictures";

const HelpPictures = () => {
    // const apiClient = useApiClient();

    // const [pictures, setPictures] = useState<Picture[]>([])
    // const token = "Bearer " + localStorage.getItem('token')

    // useEffect(() => {
    //     const fetchData = async () => {
    //         console.log('apiClient', apiClient);

    //         try {

    //             const result = await  apiClient.currentUser(token)
    //             console.log(result);

    //             setPictures(result);
    //             console.log('pictures', pictures);
    //         } catch (error: any) {
    //             console.log('there is an error', error!.message);
    //         }
    //     };
    //     fetchData()

    // }, [])

    // const handle = async () => {
    //     const result = await apiClient.pictureAll(token!)
    //     setPictures(result)
    //     console.log('pictures', pictures);
    // }

    // useEffect(() => {
    //     console.log('pictures', pictures);

    // }, [pictures])
    const apiClient = useApiClient();

    const [pictures, setPictures] = useState<Picture[]>([]);
    const token = "Bearer " + localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // קבלת התמונות מה-API
                const result = await apiClient.currentUser(token);
                console.log(result);

                // אני מניח שהתוצאה היא מערך של אובייקטי Picture
                setPictures(result);
            } catch (error: any) {
                console.log('יש שגיאה', error!.message);
            }
        };
        fetchData();
    }, [token]); // הוספתי את token כתלות כדי לרענן את הבקשה אם ה-token משתנה

    // חילוץ ה-URLs מתוך התמונות
    const pictureUrls = pictures.map((picture) => picture.url);

    return(<>
        <Pictures urls={pictureUrls}/>
    </>)
}

export default HelpPictures