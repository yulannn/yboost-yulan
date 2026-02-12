import CocktailDetails from "../components/common/CocktailDetail";
import Navbar from "../components/navigation/Navbar";

const DetailsCocktail = () => {
    return (
        <div className="flex flex-col min-h-screen bg-light">
            <Navbar />
            <div className="flex-1">
                <CocktailDetails />
            </div>
        </div>
    );
};

export default DetailsCocktail;