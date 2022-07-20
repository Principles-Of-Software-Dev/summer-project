import { Link } from "react-router-dom"

const MissingPage = () => {
    return (
        <article className="w-screen h-screen">
            <h1>Oops!</h1>
            <p>Page Not Found</p>
            <div className="flex flex-grow">
                <Link to="/landing">Visit Our Homepage</Link>
            </div>
        </article>
    )
}

export default MissingPage