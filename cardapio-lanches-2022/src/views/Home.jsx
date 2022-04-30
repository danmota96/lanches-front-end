import './Home.css'
import LancheLista from 'components/LancheLista/LancheLista';
import Navbar from 'components/NavBar/Navbar';

function Home() {
    return (
        <div className="Home">
            <Navbar />
            <div className="Home__container">
                <LancheLista/>
            </div>
        </div>
    )
}

export default Home;