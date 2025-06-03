import Statistics from "./statistics";
import Rooms from "./rooms";
import PopularFurnitures from "./popularFurnitures";
import HowItWorks from "./howItWorks";
import ClientReview from "./clientReview";
import ComingSoon from "./comingSoon";
import "../../../css/home.css"


export default function HomePage() {
    return (
        <div className={"homepage"}>
            <Statistics />
            <Rooms />
            <PopularFurnitures />
            <HowItWorks />
            <ClientReview />
            <ComingSoon />
        </div>
    );
}
