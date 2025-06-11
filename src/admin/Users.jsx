import { useEffect, useState } from "react";
import "../styles/admin/Users.css";
import { useAuth } from "../context/UseAuth";
import ToastUtils from "../utils/ToastUtils";
import { checkSuccessResponse } from "../utils/RouterUtils";
import TableLoader from "../components/common/TableLoader";
import IconButton from "../components/Buttons/IconButton";
import UploadCSVPopup from "../components/Popups/UploadCSVPopup";
import Submit from "../components/Buttons/Submit";
import {
  GET_USERS_DOWNLOAD_CSV,
  POST_USERS_UPLOAD_CSV,
} from "../constant/ApiUrls";
import { api } from "../api";
import { set } from "react-hook-form";

const API_URL = `${import.meta.env.VITE_API_URL}/api/users`;

const Users = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [errorData, setErrorData] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);
  useEffect(() => {
    handleSearch();
  }, [search, users]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      });
      if (!response.ok)
        throw new Error(`HTTP ${response.status}: ${await response.text()}`);
      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data);
    } catch (err) {
      console.error("❌ Error fetching users:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const lower = search.toLowerCase();
    const filtered = users.filter(
      (u) =>
        u.username.toLowerCase().includes(lower) ||
        u.email.toLowerCase().includes(lower) ||
        (u.referral_code || "").toLowerCase().includes(lower)
    );
    setFilteredUsers(filtered);
  };

  const sortBy = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    const sorted = [...filteredUsers].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setSortConfig({ key, direction });
    setFilteredUsers(sorted);
  };

  const handleEditClick = (user) => {
    setEditingUserId(user.id);
    setEditedUser({ ...user });
  };

  const handleInputChange = (e, field) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setEditedUser({ ...editedUser, [field]: value });
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(`${API_URL}/${editedUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({
          username: editedUser.username,
          email: editedUser.email,
          role: editedUser.role,
          token_balance: parseInt(editedUser.token_balance, 10) || 0,
          referred_by_id: editedUser.referred_by_id,
          referral_code: editedUser.referral_code,
          referral_bonus_awarded: editedUser.referral_bonus_awarded,
          is_verified: editedUser.is_verified,
          verification_token: editedUser.verification_token,
          // suspended: editedUser.suspended,
          status: editedUser.status,
        }),
      });
      if (checkSuccessResponse(response)) {
        ToastUtils.success("Changes saved successfully.");
      }
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setEditingUserId(null);
      setEditedUser({});
      fetchUsers();
    } catch (err) {
      console.error("❌ Error saving user:", err);
      // alert("Failed to save user.");
      ToastUtils.error("Failed to save user.");
    }
  };

  const handleCancelClick = () => {
    setEditingUserId(null);
    setEditedUser({});
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      });
      if (checkSuccessResponse(response)) {
        ToastUtils.success("User successfully removed from the list.");
      }
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      setFilteredUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("❌ Error deleting user:", err);
      // alert("Failed to delete user.");
      ToastUtils.error("Failed to delete user.");
    }
  };

  // Handle CSV file submission
  const handleCSVSubmit = async (file) => {
    try {
      setIsUploading(true);

      // Create FormData object and append the file
      const formData = new FormData();
      formData.append("csv", file);

      const response = await api({
        endpoint: POST_USERS_UPLOAD_CSV,
        payloadData: formData,
      });

      if (checkSuccessResponse(response)) {
        ToastUtils.success(
          response?.data?.message || "CSV uploaded successfully"
        );
        // Refresh users list after successful upload
        fetchUsers();
        if (response?.data?.userErrorArr.length > 0) {
          setErrorData(response?.data?.userErrorArr || []);
        } else {
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

  return (
    <div className="users-container common-admin-container">
      <div className="filter-controls new-filter-controls">
        <div className="header new-header p0 m0">
          <h2>Users List</h2>
        </div>
        <div className="filter-box">
          <input
            className="search-bar"
            type="text"
            placeholder="Search by username, email, or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Submit
            className="no-spacing small-button width-auto success-button"
            text={"Upload CSV"}
            onClick={() => setShowUploadPopup(true)}
          />
        </div>
      </div>
      {loading ? (
        <div style={{ marginTop: "20px" }}>
          <TableLoader rows={7} columns={9} />
        </div>
      ) : error ? (
        <div className="error-message no-space">
          <p>{error}</p>
        </div>
      ) : (
        <div className="common-table-container">
          <table className="users-table">
            <thead>
              <tr>
                {[
                  { key: "id", label: "ID" },
                  { key: "username", label: "Username" },
                  { key: "email", label: "Email" },
                  { key: "role", label: "Role" },
                  { key: "token_balance", label: "Tokens" },
                  { key: "referred_by_id", label: "Ref By" },
                  { key: "referral_code", label: "Code" },
                  { key: "referral_bonus_awarded", label: "Bonus" },
                  { key: "is_verified", label: "Verified" },
                  { key: "status", label: "Status" },
                  // { key: "suspended", label: "Suspended" },
                  { key: "actions", label: "Actions" },
                ].map(({ key, label }) => (
                  <th
                    key={key}
                    onClick={() => key !== "actions" && sortBy(key)}
                  >
                    {label}{" "}
                    {sortConfig.key === key
                      ? sortConfig.direction === "asc"
                        ? "▲"
                        : "▼"
                      : ""}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) =>
                editingUserId === user.id ? (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>
                      <input
                        value={editedUser.username}
                        onChange={(e) => handleInputChange(e, "username")}
                      />
                    </td>
                    <td>
                      <input
                        value={editedUser.email}
                        onChange={(e) => handleInputChange(e, "email")}
                      />
                    </td>
                    <td>
                      <select
                        value={editedUser.role}
                        onChange={(e) => handleInputChange(e, "role")}
                      >
                        <option value="participant">Participant</option>
                        <option value="moderator">Moderator</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="number"
                        value={editedUser.token_balance}
                        onChange={(e) => handleInputChange(e, "token_balance")}
                      />
                    </td>
                    <td>
                      <input
                        value={editedUser.referred_by_id ?? ""}
                        onChange={(e) => handleInputChange(e, "referred_by_id")}
                      />
                    </td>
                    <td>
                      <input
                        value={editedUser.referral_code ?? ""}
                        onChange={(e) => handleInputChange(e, "referral_code")}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={editedUser.referral_bonus_awarded === true}
                        onChange={(e) =>
                          handleInputChange(e, "referral_bonus_awarded")
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={editedUser.is_verified === true}
                        onChange={(e) => handleInputChange(e, "is_verified")}
                      />
                    </td>
                    {/* <td>
                    <input
                      type="checkbox"
                      checked={editedUser.suspended === true}
                      onChange={(e) => handleInputChange(e, "suspended")}
                    />
                  </td> */}
                    <td>
                      <select
                        value={editedUser.status}
                        onChange={(e) => handleInputChange(e, "status")}
                      >
                        <option value="Normal">Normal</option>
                        <option value="Ban">Ban</option>
                        <option value="Warn">Warn</option>
                      </select>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <IconButton
                          icon="SaveIcon"
                          variant="save"
                          onClick={handleSaveClick}
                          title="Save"
                          size="small"
                        />
                        <IconButton
                          icon="CancelIcon"
                          variant="edit"
                          onClick={handleCancelClick}
                          title="Cancel"
                          size="small"
                        />
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr key={user.id}>
                    {console.log("user: ", user)}
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.token_balance ?? 0}</td>
                    <td>{user.referred_by_id ?? "—"}</td>
                    <td>{user.referral_code || "—"}</td>
                    <td>{user.referral_bonus_awarded === true ? "✅" : "—"}</td>
                    <td>{user.is_verified === true ? "✅" : "—"}</td>
                    {/* <td>{user.suspended === true ? "🚫" : "—"}</td> */}
                    <td>
                      {user.status === "Ban" ? (
                        <span className="status-tag ban">Ban</span>
                      ) : user.status === "Warn" ? (
                        <span className="status-tag warn">Warn</span>
                      ) : (
                        <span className="status-tag normal">Normal</span>
                      )}
                    </td>
                    <td>
                      <div className="action-buttons">
                        <IconButton
                          icon="EditIcon"
                          variant="edit"
                          onClick={() => handleEditClick(user)}
                          title="Edit"
                          size="small"
                        />
                        <IconButton
                          icon="DeleteIcon"
                          variant="delete"
                          onClick={() => handleDeleteUser(user.id)}
                          title="Delete"
                          size="small"
                        />
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
      {showUploadPopup && (
        <UploadCSVPopup
          title="Upload CSV"
          onClose={() => {
            setShowUploadPopup(false)
            setErrorData([]);
            setIsUploading(false);
          }}
          onSubmit={handleCSVSubmit}
          downloadAPI={GET_USERS_DOWNLOAD_CSV}
          downloadFileName="users_template.csv"
          isSubmitting={isUploading}
          setIsUploading={setIsUploading}
          refetchApi={fetchUsers}
          isDownloadButton={true}
          errorData={errorData}
          setErrorData={setErrorData}
        />
      )}
    </div>
  );
};

export default Users;
