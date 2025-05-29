import CompetitionEntry from "../competition/CompetitionEntry";
import "../styles/pages/Compete.css";

const Compete = () => {
  return (
    <div className="compete-page" style={{ width: "100%" }}>
      {/* Renders the full competition flow */}
      <CompetitionEntry />
    </div>
  );
};

export default Compete;
