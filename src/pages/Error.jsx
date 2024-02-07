import { Link } from "react-router-dom"
function Error(){
    return(<>
    <div>Error</div>
    <Link to={`/`}>Home</Link>
    </>)
}
export default Error