import error from '../../assets/side-bg.png'
import './404Page.css'

/**
 * @returns Component which is rendered when entered to an invalid route. (404)
 */
const ErrorRoutes = () => {
    return (
        <div className="error-container">
            <img src={error} alt="Logo" className="error-image" />
            <div className="text">
                <h1 className="h1-text">Are you lost?</h1>
                <h2 className="h2-text">Click on the logo to go to the main page.</h2>
            </div>
        </div>
    )
}

export default ErrorRoutes;