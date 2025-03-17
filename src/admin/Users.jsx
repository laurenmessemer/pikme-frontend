import { useEffect, useState } from "react";
import "../styles/admin/Users.css";

const API_URL = "http://localhost:5004/api/users"; 


const Users = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error(`HTTP ${response.status}: ${await response.text()}`);

                const data = await response.json();
                setUsers(data);
            } catch (err) {
                console.error("❌ Error fetching users:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // ✅ Open Edit Modal
    const handleEditUser = (user) => {
        setSelectedUser({ ...user });
    };

    // ✅ Handle Form Input Changes
    const handleInputChange = (e) => {
        setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
    };

    // ✅ Save User Updates
    const handleSaveUser = async () => {
      try {
          console.log("🚀 Sending update request:", selectedUser);
  
          const response = await fetch(`http://localhost:5004/api/users/${selectedUser.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                  username: selectedUser.username,
                  email: selectedUser.email,
                  role: selectedUser.role,
                  token_balance: parseInt(selectedUser.token_balance, 10) || 0,
              }),
          });
  
          if (!response.ok) {
              throw new Error(`HTTP ${response.status}: ${await response.text()}`);
          }
  
          alert("✅ User updated successfully!");
          setSelectedUser(null);
          setLoading(true);
          window.location.reload(); // ✅ Refresh page to update UI
      } catch (error) {
          console.error("❌ Error updating user:", error);
          alert("❌ Failed to update user.");
      }
  };
  
  

    return (
        <div>
            <h2>Users List</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : (
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Tokens</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{user.token_balance ?? 0}</td>
                                <td>
                                    <button className="edit-btn" onClick={() => handleEditUser(user)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* ✅ Edit User Modal */}
            {selectedUser && (
                <div className="user-edit-modal">
                    <h3>Edit User</h3>
                    <label>
                        Username:
                        <input type="text" name="username" value={selectedUser.username} onChange={handleInputChange} />
                    </label>

                    <label>
                        Email:
                        <input type="email" name="email" value={selectedUser.email} onChange={handleInputChange} />
                    </label>

                    <label>
                        Role:
                        <select name="role" value={selectedUser.role} onChange={handleInputChange}>
                            <option value="participant">Participant</option>
                            <option value="moderator">Moderator</option>
                            <option value="admin">Admin</option>
                        </select>
                    </label>

                    <label>
                        Token Balance:
                        <input type="number" name="token_balance" value={selectedUser.token_balance} onChange={handleInputChange} />
                    </label>

                    <button className="save-btn" onClick={handleSaveUser}>Save Changes</button>
                    <button className="close-btn" onClick={() => setSelectedUser(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default Users;
