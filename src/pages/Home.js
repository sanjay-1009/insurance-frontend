import Navbar from "../components/home/Navbar";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import InsuranceTypes from "../components/home/InsuranceTypes";
import HowItWorks from "../components/home/HowItWorks";
import Footer from "../components/home/Footer";

function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <Features />
            <InsuranceTypes />
            <HowItWorks />
            <Footer />
        </>
    );
}

export default Home;