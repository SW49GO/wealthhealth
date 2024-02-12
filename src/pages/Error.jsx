import { Link } from "react-router-dom"
function Error(){
    return(<>
    <div className="error">Une erreur est survenue...</div>
    <Link to={`/`}>Home</Link>
    </>)
}
export default Error