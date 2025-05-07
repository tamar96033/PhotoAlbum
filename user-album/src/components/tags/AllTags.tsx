import { useEffect, useState } from "react"
import { useApiClient } from "../../contexts/ApiClientContext"
// import ShowTag from "./ShowTag"
import { Tag } from "../../api/client";
// import './AllTags.css'

// const AllTags = ({handleTag}: {handleTag: Function}) => {
//     const [tags, setTags] = useState<Tag[]>([])
//     const apiClient = useApiClient();
//     const token = localStorage.getItem('token')
//     const [currentTag, setCurrentTag] = useState<Tag>(tags[0])

//     useEffect(() => {
//         const fetchData = async () => {
//             const result = await apiClient.tagAll(token!)

//             console.log('result all tags: ', result);
//             setTags(result)
//             console.log('tags', tags);

//         }

//         fetchData()
//     }, [])

//     // useEffect(() => {
//     //     console.log('tags changed:', tags);
//     // }, [tags]);

//     // const hundleClickTag = (tag: Tag) => {
//     //     setCurrentTag(tag)

//     // }

//     // useEffect(() => {
//     //     console.log('current tag', currectTag);

//     // }, [currectTag])
//     // useEffect(() => {
//     //     console.log('tags changed:', tags);
//     //     if (tags.length > 0) {
//     //         setCurrentTag(tags[0]);  // Set the first tag as the current one once tags are fetched
//     //     }
//     // }, [tags]);

//     // const handleClickTag = (tag: Tag) => {
//     //     setCurrentTag(tag);
//     // };

//     // useEffect(() => {
//     //     if (currentTag) {
//     //         console.log('current tag', currentTag);
//     //     }
//     // }, [currentTag]);

//     return (<>

//         <ul>
//             {tags?.map((tag, index) => (<>

//                 <li key={tag.id}>
//                     <button onClick={() => handleTag(tag)}>{tag.name}</button>

//                 </li>
//                 {currentTag?.id == tag.id &&<PicturesToTag tagId={tag.id!} />}
//             </>
//             ))}
//         </ul>
//     </>)
// }

// export default AllTags

const AllTags = ({ handleTag }: { handleTag: (tag: Tag) => void }) => {
    const [tags, setTags] = useState<Tag[]>([]);
    const apiClient = useApiClient();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            const result = await apiClient.tagAll(token!);
            setTags(result);
        };
        fetchData();
    }, [apiClient, token]);

    return (
        <ul>
            {tags.map((tag) => (
                <li key={tag.id}>
                    <button onClick={() => handleTag(tag)}>{tag.name}</button>
                </li>
            ))}
        </ul>
    );
};

export default AllTags;