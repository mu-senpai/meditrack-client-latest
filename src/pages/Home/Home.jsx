import WhyMediTrackSection from "./WhyMediTrackSection";
import Banner from "./Banner";
import FeedbackSection from "./FeedbackSection";
import FeaturesSection from "./FeaturesSection";
import NewsletterSection from "./NewsletterSection";
import PopularCamps from "./PopularCamps";
import StatCards from "./StatCards";
import MeetDoctors from "./MeetDoctors";

const Home = () => {
    return (
        <div>
            {/* <Banner></Banner> */}
            <WhyMediTrackSection></WhyMediTrackSection>
            <FeaturesSection></FeaturesSection>
            <StatCards></StatCards>
            <PopularCamps></PopularCamps>
            <FeedbackSection></FeedbackSection>
            <MeetDoctors></MeetDoctors>
            <NewsletterSection></NewsletterSection>
        </div>
    );
};

export default Home;