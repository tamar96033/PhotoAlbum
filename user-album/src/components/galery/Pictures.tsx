
import ShowPicture from "./ShowPicture";

const Pictures = ({urls}: {urls: string[]}) => {
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

    return (<>
        <div
            style={{
                columnCount: 3,
                columnGap: '16px',
                padding: '20px',
            }}
        >
            {/* {pictures.map((p, idx) => (
                <ShowPicture key={idx} url={p.url} />
            ))} */}
            {urls?.map((url, index)=>
            <ShowPicture key={index} url={url}/>)}
        </div>
        {/* <button onClick={handle}>print all pictures</button> */}
    </>)
}
export default Pictures