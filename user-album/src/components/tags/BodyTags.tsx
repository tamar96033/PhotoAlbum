import { useEffect, useState } from "react"
import AllTags from "./AllTags"
import { Tag } from "../../api/client";
import { useApiClient } from "../../contexts/ApiClientContext";
import PicturesToTag from "./PicturesToTag";
import './AllTags.css'

const BodyTags = () => {
    // const [tags, setTags] = useState<Tag[]>([])
    // const apiClient = useApiClient();
    // const token = localStorage.getItem('token')
    // const [currentTag, setCurrentTag] = useState<Tag>(tags[0])

    // const handleTag = (tag: Tag) => {
    //     setCurrentTag(tag)
    // }

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const result = await apiClient.tagAll(token!)

    //         console.log('result all tags: ', result);
    //         setTags(result)
    //         console.log('tags', tags);

    //     }

    //     fetchData()
    // }, [])

    // useEffect(() => {
    //     console.log('tags changed:', tags);
    // }, [tags]);

    // useEffect(() => {
    //     console.log('tags changed:', tags);
    //     if (tags.length > 0) {
    //         setCurrentTag(tags[0]);  // Set the first tag as the current one once tags are fetched
    //     }
    // }, [tags]);

    // return(<>
    //     <AllTags handleTag={handleTag}/>
    //     <PicturesToTag tagId={currentTag.id!}/>
    // </>)
    const [tags, setTags] = useState<Tag[]>([]);
    const [currentTag, setCurrentTag] = useState<Tag | null>(null); // Initializing with null
    const apiClient = useApiClient();
    const token = "Bearer " + localStorage.getItem('token');

    const handleTag = (tag: Tag) => {
        console.log('Tag selected:', tag);  // נוודא שהפונקציה נקראת

        setCurrentTag(tag);
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await apiClient.tagAll(token!);
            setTags(result);
        };
        fetchData();
    }, [apiClient, token]);

    // If tags are loaded and no tag is selected yet, set the first tag
    useEffect(() => {
        if (tags.length > 0 && currentTag === null) {
            setCurrentTag(tags[0]);
        }
    }, [tags, currentTag]);

    return (
        // <>
        //     <AllTags handleTag={handleTag} />
        //     {currentTag && <PicturesToTag tagId={currentTag.id!} />}
        // </>
        <div className="container">
            <div className="sidebar">
                <AllTags handleTag={handleTag} />
            </div>
            <div className="content">
                {currentTag && <PicturesToTag tagId={currentTag.id!} />}
            </div>
        </div>
    );
}

export default BodyTags