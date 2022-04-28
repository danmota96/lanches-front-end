import './Home.css'
import LancheLista from 'LancheLista';


function Home() {
    return (
        <div className="Home">
            <div className="Home__container">
                <LancheLista/>
            </div>
        </div>
    )
}

export default Home;