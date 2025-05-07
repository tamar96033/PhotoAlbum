import { useState } from "react";
import PicturesToTag from "./PicturesToTag";

const ShowTag = ({tag}: {tag:string}) => {

    const [flag, setFlag] = useState(false)
    const handleClick = () => {
        console.log('you are ni handle click');
        setFlag(!flag)
    }

    return(<>
    <button onClick={handleClick}>{tag}</button>
    {flag && <PicturesToTag/>}
    </>)
}

export default ShowTag