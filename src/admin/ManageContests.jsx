import { useEffect, useState } from "react";
import "../styles/admin/ManageContests.css";
import { useAuth } from "../context/UseAuth";
import LazyImage from "../components/Common/LazyImage";
import TableLoader from "../components/common/TableLoader";
import IconButton from "../components/Buttons/IconButton";
import WinnerImagePopup from "../components/Popups/WinnerImagePopup";
import UploadCSVPopup from "../components/Popups/UploadCSVPopup";
import {
  GET_CONTEST_DOWNLOAD_CSV,
  POST_CONTEST_UPLOAD_CSV,
} from "../constant/ApiUrls";
import { checkSuccessResponse } from "../utils/RouterUtils";
import ToastUtils from "../utils/ToastUtils";
import { api } from "../api";

const CONTESTS_API_URL = `${import.meta.env.VITE_API_URL}/api/contests`;
const COMPETITIONS_API_URL = `${import.meta.env.VITE_API_URL}/api/competitions`;

const ManageContests = () => {
  const { token } = useAuth();
  const [contests, setContests] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [contestsLoading, setContestsLoading] = useState(true);
  const [contestsError, setContestsError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadCsvId, setUploadCsvId] = useState({});
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorData, setErrorData] = useState([]);

  const fetchData = async (retryCount = 2) => {
    setContestsLoading(true);
    try {
      const [contestsRes, competitionsRes] = await Promise.all([
        fetch(CONTESTS_API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }),
        fetch(COMPETITIONS_API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }),
      ]);

      if (!contestsRes.ok || !competitionsRes.ok) {
        throw new Error("Failed to fetch contests or competitions");
      }

      const contestsData = await contestsRes.json();
      const competitionsData = await competitionsRes.json();

      setContests(contestsData);
      setCompetitions(competitionsData);
      setContestsError(null);
    } catch (err) {
      if (retryCount > 0) {
        setTimeout(() => fetchData(retryCount - 1), 2000);
        return;
      }
      setContestsError(err.message);
    } finally {
      setContestsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const getTotalEntriesForContest = (contestId) => {
    return competitions.reduce((count, comp) => {
      if (comp.contest_id === contestId) {
        if (comp.user1_id) count++;
        if (comp.user2_id) count++;
      }
      return count;
    }, 0);
  };

  const handleEdit = (contest) => {
    setEditingId(contest.id);
    setEditedData({ ...contest, ...contest.winnings });
  };

  const handleUpload = (contest) => {
    setUploadCsvId(contest);
    setShowUploadPopup(true);
  };

  const handleChange = (e, key) => {
    setEditedData({ ...editedData, [key]: e.target.value });
  };

  const handleWinningsChange = (e, tier) => {
    setEditedData({
      ...editedData,
      winnings: { ...editedData.winnings, [tier]: e.target.value },
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedData({});
  };

  // Handle CSV file submission
  const handleCSVSubmit = async (file) => {
    try {
      setIsUploading(true);

      // Create FormData object and append the file
      const formData = new FormData();
      formData.append("csv", file);
      formData.append("constestId", uploadCsvId?.id);

      const response = await api({
        endpoint: POST_CONTEST_UPLOAD_CSV,
        payloadData: formData,
      });

      if (checkSuccessResponse(response)) {
        if (response?.data?.count === 0) {
          ToastUtils.error(response?.data?.message || "No data uploaded");
        } else {
          ToastUtils.success(
            response?.data?.message || "CSV uploaded successfully"
          );
        }
        // Refresh users list after successful upload
        fetchData();
        if (response?.data?.userErrorArr.length > 0) {
          setErrorData(response?.data?.userErrorArr || []);
        } else {
          setUploadCsvId({});
          setShowUploadPopup(false);
        }
      } else {
        ToastUtils.error(response?.data?.error || "Failed to upload CSV");
      }
    } catch (error) {
      console.error("Error uploading CSV:", error);
      ToastUtils.error(
        error.message || "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (id) => {
    try {
      const response = await fetch(`${CONTESTS_API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify(editedData),
      });

      if (!response.ok) throw new Error("Failed to update contest");

      const updated = await response.json();
      setContests((prev) => prev.map((c) => (c.id === id ? updated : c)));
      setEditingId(null);
    } catch (err) {
      console.error("❌ Error updating:", err);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this contest?"
    );
    if (!confirm) return;

    try {
      const response = await fetch(`${CONTESTS_API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      });

      if (!response.ok) throw new Error("Failed to delete contest");

      setContests((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("❌ Error deleting contest:", err);
    }
  };

  return (
    <div className="manage-contests-container common-admin-container">
      <div className="header new-header p0">
        <h2>Manage Contests</h2>
      </div>

      {contestsLoading ? (
        <TableLoader rows={7} columns={10} />
      ) : contestsError ? (
        <div className="error-message no-space">
          <p>{contestsError}</p>
        </div>
      ) : contests.length === 0 ? (
        <p>No contests available.</p>
      ) : (
        <div className="common-table-container">
          <table className="contests-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Status</th>
                <th>Theme</th>
                <th>Theme Image</th>
                <th>Entry Fee</th>
                <th>Total Entries</th>
                {/* <th>Prize Pool</th> */}
                <th>1st Place</th>
                <th>2nd Place</th>
                <th>3rd Place</th>
                <th>Contest Live Date</th>
                <th>Submission Deadline</th>
                <th>Voting Live Date</th>
                <th>Voting Deadline</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contests.map((contest) => (
                <tr key={contest.id}>
                  <td>{contest.id}</td>
                  <td>
                    {editingId === contest.id ? (
                      <select
                        value={editedData.status}
                        onChange={(e) => handleChange(e, "status")}
                      >
                        <option value="Upcoming">Upcoming</option>
                        <option value="Live">Live</option>
                        <option value="Complete">Complete</option>
                      </select>
                    ) : (
                      <span
                        className={`status ${
                          contest.status?.toLowerCase() || "unknown"
                        }`}
                      >
                        {contest.status || "Unknown"}
                      </span>
                    )}
                  </td>
                  <td>{contest.Theme?.name || "N/A"}</td>
                  <td>
                    {contest.Theme?.cover_image_url ? (
                      <>
                        <LazyImage
                          src={contest.Theme.cover_image_url}
                          alt={contest.Theme.name}
                          style={{
                            width: "60px",
                            height: "40px",
                            objectFit: "cover",
                            borderRadius: "4px",
                          }}
                          className="cursor-pointer"
                          onClick={() =>
                            setSelectedImage(contest.Theme?.cover_image_url)
                          }
                        />
                        {/* // <img
                      //   src={contest.Theme.cover_image_url}
                      //   alt={contest.Theme.name}
                      //   style={{
                      //     width: "60px",
                      //     height: "40px",
                      //     objectFit: "cover",
                      //     borderRadius: "4px",
                      //   }}
                      //   onError={onImageError}
                      // /> */}
                      </>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td>
                    {editingId === contest.id ? (
                      <input
                        type="number"
                        value={editedData.entry_fee}
                        onChange={(e) => handleChange(e, "entry_fee")}
                      />
                    ) : (
                      `${contest.entry_fee}`
                    )}
                  </td>
                  <td>{getTotalEntriesForContest(contest.id)}</td>
                  {/* <td>
                    {editingId === contest.id ? (
                      <input
                        type="number"
                        value={editedData.prize_pool}
                        onChange={(e) => handleChange(e, "prize_pool")}
                      />
                    ) : (
                      `${contest.prize_pool}`
                    )}
                  </td> */}
                  <td>
                    {editingId === contest.id ? (
                      <input
                        type="number"
                        value={editedData.winnings?.first}
                        onChange={(e) => handleWinningsChange(e, "first")}
                      />
                    ) : (
                      `${contest.winnings?.first}`
                    )}
                  </td>
                  <td>
                    {editingId === contest.id ? (
                      <input
                        type="number"
                        value={editedData.winnings?.second}
                        onChange={(e) => handleWinningsChange(e, "second")}
                      />
                    ) : (
                      `${contest.winnings?.second}`
                    )}
                  </td>
                  <td>
                    {editingId === contest.id ? (
                      <input
                        type="number"
                        value={editedData.winnings?.third}
                        onChange={(e) => handleWinningsChange(e, "third")}
                      />
                    ) : (
                      `${contest.winnings?.third}`
                    )}
                  </td>
                  <td>
                    {editingId === contest.id ? (
                      <input
                        type="date"
                        value={editedData.contest_live_date?.slice(0, 10)}
                        onChange={(e) => handleChange(e, "contest_live_date")}
                      />
                    ) : (
                      new Date(contest.contest_live_date).toLocaleDateString()
                    )}
                  </td>
                  <td>
                    {editingId === contest.id ? (
                      <input
                        type="date"
                        value={editedData.submission_deadline?.slice(0, 10)}
                        onChange={(e) => handleChange(e, "submission_deadline")}
                      />
                    ) : (
                      new Date(contest.submission_deadline).toLocaleDateString()
                    )}
                  </td>
                  <td>
                    {editingId === contest.id ? (
                      <input
                        type="date"
                        value={editedData.voting_live_date?.slice(0, 10)}
                        onChange={(e) => handleChange(e, "voting_live_date")}
                      />
                    ) : (
                      new Date(contest.voting_live_date).toLocaleDateString()
                    )}
                  </td>
                  <td>
                    {editingId === contest.id ? (
                      <input
                        type="date"
                        value={editedData.voting_deadline?.slice(0, 10)}
                        onChange={(e) => handleChange(e, "voting_deadline")}
                      />
                    ) : (
                      new Date(contest.voting_deadline).toLocaleDateString()
                    )}
                  </td>
                  <td>
                    {editingId === contest.id ? (
                      <div className="action-buttons">
                        <IconButton
                          icon="SaveIcon"
                          variant="save"
                          onClick={() => handleSave(contest.id)}
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
                          icon="UploadIcon"
                          variant="upload"
                          onClick={() => handleUpload(contest)}
                          title="Upload"
                          size="small"
                        />
                        <IconButton
                          icon="EditIcon"
                          variant="edit"
                          onClick={() => handleEdit(contest)}
                          title="Edit"
                          size="small"
                        />
                        <IconButton
                          icon="DeleteIcon"
                          variant="delete"
                          onClick={() => handleDelete(contest.id)}
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
      {showUploadPopup && (
        <UploadCSVPopup
          title={`${uploadCsvId?.Theme?.name}`}
          onClose={() => {
            setShowUploadPopup(false);
            setErrorData([]);
            setIsUploading(false);
            setUploadCsvId({});
          }}
          onSubmit={handleCSVSubmit}
          downloadAPI={GET_CONTEST_DOWNLOAD_CSV}
          downloadFileName="contest_template.csv"
          isSubmitting={isUploading}
          isDownloadButton={true}
          errorData={errorData}
        />
      )}
    </div>
  );
};

export default ManageContests;

// import { useEffect, useState } from "react";
// import "../styles/admin/ManageContests.css";

// const CONTESTS_API_URL = `${import.meta.env.VITE_API_URL}/api/contests`;

// const ManageContests = () => {
//   console.log("📌 ManageContests component is rendering!");

//   // ✅ Contests State
//   const [contests, setContests] = useState([]);
//   const [contestsLoading, setContestsLoading] = useState(true);
//   const [contestsError, setContestsError] = useState(null);

//   // ✅ Fetch Contests
//   useEffect(() => {
//     const fetchContests = async (retryCount = 2) => {
//       console.log("📢 Fetching contests from API:", CONTESTS_API_URL);
//       setContestsLoading(true);

//       try {
//         const response = await fetch(CONTESTS_API_URL);
//         if (!response.ok) {
//           const text = await response.text();
//           throw new Error(`HTTP ${response.status}: ${text}`);
//         }

//         const data = await response.json();
//         if (!Array.isArray(data)) throw new Error("Invalid response format: Expected an array");

//         console.log("✅ Contests fetched successfully:", data);
//         setContests(data);
//         setContestsError(null);
//       } catch (err) {
//         console.error("❌ Error fetching contests:", err);
//         if (retryCount > 0) {
//           console.warn(`Retrying... (${retryCount} attempts left)`);
//           setTimeout(() => fetchContests(retryCount - 1), 2000);
//           return;
//         }
//         setContestsError(err.message);
//       } finally {
//         setContestsLoading(false);
//       }
//     };

//     fetchContests();
//   }, []);

//   useEffect(() => {
//     console.log("🔍 useEffect triggered, calling fetchCompetitions...");
//   }, []);

//   // ✅ Function to Manually Trigger Winner Determination

//   return (
//     <div className="manage-contests-container">
//       {/* ✅ Contests Section */}
//       <div className="header">
//         <h2>Manage Contests</h2>
//       </div>

//       {contestsLoading ? (
//         <p>Loading contests...</p>
//       ) : contestsError ? (
//         <p className="error">{contestsError}</p>
//       ) : contests.length === 0 ? (
//         <p>No contests available.</p>
//       ) : (
//         <table className="contests-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Status</th>
//               <th>Theme</th>
//               <th>Theme Image</th> {/* ✅ NEW */}
//               <th>Entry Fee</th>
//               <th>Total Entries</th>
//               <th>Prize Pool</th>
//               <th>1st Place</th>
//               <th>2nd Place</th>
//               <th>3rd Place</th>
//               <th>Contest Live Date</th>
//               <th>Submission Deadline</th>
//               <th>Voting Live Date</th>
//               <th>Voting Deadline</th>
//             </tr>
//           </thead>
//           <tbody>
//             {contests.map((contest) => (
//               <tr key={contest.id}>
//                 <td>{contest.id}</td>
//                 <td>
//                   <span className={`status ${contest.status?.toLowerCase() || "unknown"}`}>
//                     {contest.status || "Unknown"}
//                   </span>
//                 </td>
//                 <td>{contest.Theme?.name || "N/A"}</td>
//                 <td>
//                   {contest.Theme?.cover_image_url ? (
//                     <img
//                       src={contest.Theme.cover_image_url}
//                       alt={contest.Theme.name}
//                       style={{ width: "60px", height: "40px", objectFit: "cover", borderRadius: "4px" }}
//                     />
//                   ) : (
//                     "N/A"
//                   )}
//                 </td>
//                 <td>${contest.entry_fee ?? 0}</td>
//                 <td>{contest.total_entries ?? 0}</td>
//                 <td>${contest.prize_pool ?? 0}</td>
//                 <td>${contest.winnings?.first ?? "N/A"}</td>
//                 <td>${contest.winnings?.second ?? "N/A"}</td>
//                 <td>${contest.winnings?.third ?? "N/A"}</td>
//                 <td>{contest.contest_live_date ? new Date(contest.contest_live_date).toLocaleDateString() : "TBD"}</td>
//                 <td>{contest.submission_deadline ? new Date(contest.submission_deadline).toLocaleDateString() : "TBD"}</td>
//                 <td>{contest.voting_live_date ? new Date(contest.voting_live_date).toLocaleDateString() : "TBD"}</td>
//                 <td>{contest.voting_deadline ? new Date(contest.voting_deadline).toLocaleDateString() : "TBD"}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//     </div>
//   );
// };

// export default ManageContests;
