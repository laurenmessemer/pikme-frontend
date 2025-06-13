import { useEffect, useState } from "react";
import "../styles/admin/ManageCompetitions.css";
import { useAuth } from "../context/UseAuth";
import ToastUtils from "../utils/ToastUtils";
import LazyImage from "../components/Common/LazyImage";
import IconButton from "../components/Buttons/IconButton";
import TableLoader from "../components/common/TableLoader";
import Submit from "../components/Buttons/Submit";
import WinnerImagePopup from "../components/Popups/WinnerImagePopup";

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
  const [selectedImage, setSelectedImage] = useState(null);

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
    <div className="manage-competitions-content common-admin-container">
      <div className="header new-header p0">
        <h2>Manage Competitions</h2>
      </div>

      <div className="filter-controls new-filter-controls">
        <div className="filter-box">
          <select
            className="common-filter-select"
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

        <Submit
          className="no-spacing small-button width-auto success-button"
          text={determiningWinners ? "Determining..." : "Determine Winners"}
          onClick={handleDetermineWinners}
          disabled={determiningWinners}
        />
      </div>

      {loading ? (
        <div style={{ marginTop: "20px" }}>
          <TableLoader rows={7} columns={12} />
        </div>
      ) : error ? (
        <div className="error-message no-space">
          <p>{error}</p>
        </div>
      ) : filteredCompetitions.length === 0 ? (
        <p>No competitions available for this contest.</p>
      ) : (
        <div className="common-table-container">
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
                <th>Image (User 1)</th>
                <th>Image (User 2)</th>
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
                        className="cursor-pointer"
                        onClick={() =>
                          setSelectedImage(comp.Contest?.Theme?.cover_image_url)
                        }
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
                    {comp.user1_image ? (
                      <LazyImage
                        src={comp?.user1_image}
                        alt={comp?.User1?.username || "User Image"}
                        style={{
                          width: "60px",
                          height: "40px",
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                        className="cursor-pointer"
                        onClick={() => setSelectedImage(comp.user1_image)}
                      />
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td>
                    {comp.user2_image ? (
                      <LazyImage
                        src={comp?.user2_image}
                        alt={comp?.User2?.username || "User Image"}
                        style={{
                          width: "60px",
                          height: "40px",
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                        className="cursor-pointer"
                        onClick={() => setSelectedImage(comp.user2_image)}
                      />
                    ) : (
                      "N/A"
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
                      <div className="action-buttons">
                        <IconButton
                          icon="SaveIcon"
                          variant="save"
                          onClick={() => handleSave(comp.id)}
                          title="Save"
                          size="small"
                        />
                        <IconButton
                          icon="CancelIcon"
                          variant="edit"
                          onClick={handleCancel}
                          title="Cancel"
                          size="small"
                        />
                      </div>
                    ) : (
                      <div className="action-buttons">
                        <IconButton
                          icon="EditIcon"
                          variant="edit"
                          onClick={() => handleEdit(comp)}
                          title="Edit"
                          size="small"
                        />
                        <IconButton
                          icon="DeleteIcon"
                          variant="delete"
                          onClick={() => handleDelete(comp.id)}
                          title="Delete"
                          size="small"
                        />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {selectedImage && (
        <WinnerImagePopup
          imageUrl={selectedImage}
          onClose={() => setSelectedImage(null)}
          isFullView={true}
        />
      )}
    </div>
  );
};

export default Competitions;
