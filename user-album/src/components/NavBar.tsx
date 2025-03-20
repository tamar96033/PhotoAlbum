import { Link } from "react-router-dom"


const style: React.CSSProperties = {
    position: 'absolute',
    top: '2%',
    right: '2%',
};

const NavBar = () => {
    return(<>
    <nav style={style}>
        <Link to='/'>HomePage</Link> |
        <Link to='/pictures'>pictures</Link> | 
        <Link to='/login'>loginPage</Link>
    </nav>
    </>)
}
export default NavBar