import PropTypes from "prop-types";
import flashIcon from "../../assets/icons/flash.svg";
import bronzeMedal from "../../assets/medals/bronzeprize.svg";
import goldMedal from "../../assets/medals/goldprize.svg";
import silverMedal from "../../assets/medals/silverprize.svg";
import "../../styles/cards/SubmissionCard.css";
import Opponent from "../Buttons/Opponent";
import Submit from "../Buttons/Submit";
import Dropdown from "../Dropdowns/Dropdown"; // ✅ Import the reusable dropdown
import SubmissionTimer from "../Timers/SubmissionTimer";

const SubmissionCard = ({
    contestTitle,
    contestDescription,
    contestId,
    entryFee,
    selectedOpponent,
    onOpponentSelect,
    onSubmit
}) => {
    return (
        <div className="submission-card">
            <div className="submission-header">
                <img src={flashIcon} alt="Contest Icon" className="contest-icon" />
                <h2 className="contest-title">{contestTitle}</h2>
            </div>
            
            <SubmissionTimer contestId={contestId} entryFee={entryFee} />

            {/* Medals in Top Right */}
            <div className="submission-card__medals">
                <img src={goldMedal} alt="Gold Medal" className="submission-medal gold" />
                <img src={silverMedal} alt="Silver Medal" className="submission-medal silver" />
                <img src={bronzeMedal} alt="Bronze Medal" className="submission-medal bronze" />
            </div>


            <p className="contest-description">{contestDescription}</p>

            {/* ✅ Insert Dropdowns Here */}
            <Dropdown title="Rules & Guidelines">
                <ul>
                    <li>No AI-generated images</li>
                    <li>Must be original work</li>
                    <li>Only high-resolution images</li>
                    <li>No watermarks or text overlays</li>
                </ul>
            </Dropdown>

            <Dropdown title="Payout Details">
                <div className="payout-table-container">
                    <table className="payout-table">
                        <thead>
                            <tr>
                                <th>Placement</th>
                                <th>Payout</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>🥇 1st</td>
                                <td>$2500</td>
                            </tr>
                            <tr>
                                <td>🥈 2nd</td>
                                <td>$1000</td>
                            </tr>
                            <tr>
                                <td>🥉 3rd</td>
                                <td>$500</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Dropdown>


            <p className="opponent-description">Choose Your Opponent.</p>
            <div className="submission-card-opponents">
                <Opponent 
                    opponentName="Challenge Friend" 
                    isSelected={selectedOpponent === "Challenge Friend"}
                    onClick={() => onOpponentSelect("Challenge Friend")} 
                />
                <Opponent 
                    opponentName="Pick For Me" 
                    isSelected={selectedOpponent === "Pick For Me"} 
                    onClick={() => onOpponentSelect("Pick For Me")} 
                />
            </div>
            
            <div className="submission-card-submit">
                <Submit onClick={onSubmit} />
            </div>
        </div>
    );
};

SubmissionCard.propTypes = {
    contestTitle: PropTypes.string.isRequired,
    contestDescription: PropTypes.string.isRequired,
    contestId: PropTypes.number.isRequired,
    entryFee: PropTypes.number.isRequired, 
    selectedOpponent: PropTypes.string,
    onOpponentSelect: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default SubmissionCard;
