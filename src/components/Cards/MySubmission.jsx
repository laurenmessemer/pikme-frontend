import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "../../styles/components/MySubmission.css";
import MySubmissionCard from "./MySubmissionCard";

const MySubmissions = ({ userId }) => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5004/api/leaderboard/mysubmissions?userId=${userId}`
                );

                if (response.data.success) {
                    setSubmissions(response.data.submissions);
                }
            } catch (error) {
                console.error("Error fetching submissions:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSubmissions();
    }, [userId]);

    return (
        <div className="my-submissions-container">
            {loading ? (
                <p>Loading...</p>
            ) : submissions.length === 0 ? (
                <div className="no-submissions">
                    <div className="dashed-box">
                        <p>Join a game!</p>
                    </div>
                </div>
            ) : (
                <div className="my-submissions-grid">
                    {submissions.map((submission) => (
                        <MySubmissionCard key={submission.id} {...submission} />
                    ))}
                </div>
            )}
        </div>
    );
};

MySubmissions.propTypes = {
    userId: PropTypes.number.isRequired,
};

export default MySubmissions;
