import { useEffect, useState } from "react";
import "../styles/admin/ManageCompetitions.css";
import { useAuth } from "../context/UseAuth";
import ToastUtils from "../utils/ToastUtils";
import LazyImage from "../components/Common/LazyImage";

const API_URL = `${import.meta.env.VITE_API_URL}/api/competitions`;
const WINNERS_API_URL = `${
  import.meta.env.VITE_API_URL
}/api/competitions/determine-winners`;

const Competitions = () => {
  const { token } = useAuth();
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [determiningWinners, setDeterminingWinners] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [selectedContestId, setSelectedContestId] = useState("all");

  const fetchCompetitions = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      const data = await response.json();
      setCompetitions(data);
      setError(null);
    } catch (err) {
      console.error("❌ Fetch Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompetitions();
  }, []);

  const handleDetermineWinners = async () => {
    setDeterminingWinners(true);
    try {
      const response = await fetch(WINNERS_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      // alert("Winners successfully determined!");
      ToastUtils.success("Winners successfully determined!");
      await fetchCompetitions();
    } catch (error) {
      console.error("❌ Error determining winners:", error);
      // alert("Error determining winners. Check console for details.");
      ToastUtils.error("Error determining winners. Check console for details.");
    } finally {
      setDeterminingWinners(false);
    }
  };

  const handleEdit = (comp) => {
    setEditingId(comp.id);
    setEditedData({
      votes_user1: comp.votes_user1,
      votes_user2: comp.votes_user2,
      winner_username: comp.winner_username,
      winner_earnings: comp.winner_earnings,
      status: comp.status,
    });
  };

  const handleChange = (e, field) => {
    setEditedData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedData({});
  };

  const handleSave = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify(editedData),
      });

      if (!response.ok) throw new Error("Failed to update competition");

      await fetchCompetitions();
      setEditingId(null);
      setEditedData({});
    } catch (err) {
      console.error("❌ Error updating competition:", err);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this competition?"
    );
    if (!confirmed) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      });

      if (!response.ok) throw new Error("Failed to delete competition");

      await fetchCompetitions();
    } catch (err) {
      console.error("❌ Error deleting competition:", err);
      // alert("Error deleting competition. See console for details.");
      ToastUtils.error("Error deleting competition. See console for details.");
    }
  };

  const contestIds = [...new Set(competitions.map((c) => c.contest_id))];

  const filteredCompetitions =
    selectedContestId === "all"
      ? competitions
      : competitions.filter(
          (c) => c.contest_id === parseInt(selectedContestId)
        );

  return (
    <div className="manage-competitions-content">
      <h2>Manage Competitions</h2>

      <div className="filter-controls">
        <label htmlFor="contest-filter">Filter by Contest:</label>
        <select
          id="contest-filter"
          value={selectedContestId}
          onChange={(e) => setSelectedContestId(e.target.value)}
        >
          <option value="all">All Contests</option>
          {contestIds.map((id) => (
            <option key={id} value={id}>
              Contest #{id}
            </option>
          ))}
        </select>
      </div>

      <button
        className="determine-winners-btn"
        onClick={handleDetermineWinners}
        disabled={determiningWinners}
      >
        {determiningWinners ? "Determining..." : "Determine Winners"}
      </button>

      {loading ? (
        <p>Loading competitions...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : filteredCompetitions.length === 0 ? (
        <p>No competitions available for this contest.</p>
      ) : (
        <table className="competitions-table">
          <thead>
            <tr>
              <th>Competition ID</th>
              <th>Contest ID</th>
              <th>Theme ID</th>
              <th>Theme Name</th>
              <th>Theme Cover</th>
              <th>User 1</th>
              <th>User 2</th>
              <th>Votes (User 1)</th>
              <th>Votes (User 2)</th>
              <th>Winner</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCompetitions.map((comp) => (
              <tr key={comp.id}>
                <td>{comp.id}</td>
                <td>{comp.contest_id}</td>
                <td>{comp.Contest?.Theme?.id || "N/A"}</td>
                <td>{comp.Contest?.Theme?.name || "N/A"}</td>
                <td>
                  {comp.Contest?.Theme?.cover_image_url ? (
                    <LazyImage
                      src={comp.Contest.Theme.cover_image_url}
                      alt={comp.Contest.Theme.name}
                      style={{
                        width: "60px",
                        height: "40px",
                        objectFit: "cover",
                        borderRadius: "4px",
                      }}
                    />
                  ) : (
                    // <img
                    //   src={comp.Contest.Theme.cover_image_url}
                    //   alt={comp.Contest.Theme.name}
                    //   style={{
                    //     width: "60px",
                    //     height: "40px",
                    //     objectFit: "cover",
                    //     borderRadius: "4px",
                    //   }}
                    //   onError={onImageError}
                    // />
                    "N/A"
                  )}
                </td>
                <td>{comp.User1?.username || "N/A"}</td>
                <td>{comp.User2?.username || "N/A"}</td>
                <td>
                  {editingId === comp.id ? (
                    <input
                      type="number"
                      value={editedData.votes_user1}
                      onChange={(e) => handleChange(e, "votes_user1")}
                    />
                  ) : (
                    comp.votes_user1
                  )}
                </td>
                <td>
                  {editingId === comp.id ? (
                    <input
                      type="number"
                      value={editedData.votes_user2}
                      onChange={(e) => handleChange(e, "votes_user2")}
                    />
                  ) : (
                    comp.votes_user2
                  )}
                </td>
                <td>
                  {editingId === comp.id ? (
                    <input
                      type="text"
                      value={editedData.winner_username}
                      onChange={(e) => handleChange(e, "winner_username")}
                    />
                  ) : (
                    comp.winner_username || "TBD"
                  )}
                </td>
                <td>
                  {editingId === comp.id ? (
                    <select
                      value={editedData.status}
                      onChange={(e) => handleChange(e, "status")}
                    >
                      <option value="Waiting">Waiting</option>
                      <option value="Active">Active</option>
                      <option value="Complete">Complete</option>
                    </select>
                  ) : (
                    <span className={`status ${comp.status?.toLowerCase()}`}>
                      {comp.status}
                    </span>
                  )}
                </td>
                <td>
                  {editingId === comp.id ? (
                    <>
                      <button onClick={() => handleSave(comp.id)}>Save</button>
                      <button onClick={handleCancel}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(comp)}>Edit</button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(comp.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Competitions;
