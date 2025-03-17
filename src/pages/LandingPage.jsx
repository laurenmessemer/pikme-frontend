import Lottie from "lottie-react"; // Import Lottie for animations
import animationData from "../assets/lottie/video2.json"; // Import Lottie animation file
import Image1 from "../assets/placeholders/nyc.jpg"; // ✅ Import placeholder image
import Image2 from "../assets/placeholders/parrot.jpg"; // ✅ Import placeholder image
import Image3 from "../assets/placeholders/snack.jpg"; // ✅ Import placeholder image
import Image4 from "../assets/placeholders/tiger.jpg"; // ✅ Import placeholder image
import Winners from "../components/Cards/Winners"; // Import Winners Component
import "../styles/pages/LandingPage.css"; // Import styles for Landing Page

// ✅ Mock Winners Data
const mockWinnersData = [
    { 
        id: 1, 
        username: "CuriousCat", 
        image: Image1, 
        theme: "Late Nights", 
        payout: 2500, 
        entries: 623, 
        startDate: "2024-01-01", 
        endDate: "2024-01-07" 
    },
    { 
        id: 2, 
        username: "GoldenShot", 
        image: Image2, 
        theme: "Wildlife", 
        payout: 3000, 
        entries: 858, 
        startDate: "2024-02-10", 
        endDate: "2024-02-17" 
    },
    { 
        id: 3, 
        username: "NightSkyMaster", 
        image: Image3, 
        theme: "Snack Time", 
        payout: 2000, 
        entries: 682, 
        startDate: "2024-03-15", 
        endDate: "2024-03-22" 
    },
    { 
      id: 3, 
      username: "gawef", 
      image: Image4, 
      theme: "In The Wild", 
      payout: 2000, 
      entries: 300, 
      startDate: "2024-03-15", 
      endDate: "2024-03-22" 
  }
];

const LandingPage = () => {
  return (
    <div className="landing-container">
      {/* ✅ Hero Section */}
      <div className="hero-section">
        <div className="text-content">
          <h1 className="hero-title">Where Creativity Wins, Not Popularity.</h1>
          <p className="hero-subtext">
            Step into the ultimate photo competition. <br />
            Compete head-to-head in anonymous matchups, earn real rewards, and
            let your talent shine—no followers required.
          </p>
        </div>

        {/* ✅ Lottie Animation Replacing CTA Box */}
        <div className="lottie-container">
          <Lottie animationData={animationData} className="lottie-animation" />
        </div>
      </div>

      {/* ✅ Winners Section */}
      <div className="winners-section">
        <h2 className="winners-title">WINNERS</h2>
          <div className="winners-cards">
            <Winners pastWinners={mockWinnersData}/>
          </div>
      </div>
    </div>
  );
};

export default LandingPage;
