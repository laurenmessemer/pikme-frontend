// ===== COMMENTED OUT ORIGINAL IMPLEMENTATION =====
/*
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

const ALERTS = [
  {
    id: "alert-1",
    date: "Today",
    title: "Welcome to PikMe!",
    description: "You’ve officially joined the community. Let the games begin!",
    isImportant: true,
  },
  {
    id: "alert-2",
    date: "Today",
    title: "Verify your email",
    description:
      "Confirm your email address to participate in contests and claim rewards.",
    isImportant: true,
  },
  {
    id: "alert-3",
    date: "Today",
    title: "Set up your profile",
    description:
      "Add a profile picture and username so others know who you are.",
  },
  {
    id: "alert-4",
    date: "Today",
    title: "Start your first contest",
    description:
      "Head to the Compete tab and join a live contest to get started!",
  },
  {
    id: "alert-5",
    date: "Yesterday",
    title: "New feature: Invite a friend",
    description:
      "Use your invite code to challenge a friend in a head-to-head match.",
  },
  {
    id: "alert-6",
    date: "Older",
    title: "Tips for getting more votes",
    description:
      "Make your submissions pop with on-theme content and quality images!",
  },
  {
    id: "alert-7",
    date: "Older",
    title: "Support & Safety",
    description:
      "Need help or want to report an issue? Visit the Settings to contact us anytime.",
  },
];

const Alerts = () => {
  const [readAlerts, setReadAlerts] = useState(() => {
    const saved = localStorage.getItem("readAlerts");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const alertIds = ALERTS.map((a) => a.id);
    setReadAlerts(alertIds);
    localStorage.setItem("readAlerts", JSON.stringify(alertIds));
  }, []);

  const isUnread = (id) => !readAlerts.includes(id);

  const renderSection = (section) => {
    const items = ALERTS.filter((a) => a.date === section);
    if (!items.length) return null;

    return (
      <div className="alert-section-group">
        <h3 className="alert-section-header">{section}</h3>
        <div className="alert-section-box">
          {items.map((alert) => (
            <div
              key={alert.id}
              className={`alert-box ${alert.isImportant ? "important" : ""}`}
            >
              <div className="alert-left">
                <div className="alert-dot-wrapper">
                  {(isUnread(alert.id) || alert.isImportant) && (
                    <span className="alert-dot" />
                  )}
                </div>
                <div className="alert-content">
                  <strong className="alert-title">{alert.title}</strong>
                  <p className="alert-description">{alert.description}</p>
                </div>
              </div>
              <button className="alert-delete">
                <FaTrashAlt />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="alerts-container">
      {renderSection("Today")}
      {renderSection("Yesterday")}
      {renderSection("Older")}
    </div>
  );
};

export default Alerts;
*/

// ===== NEW DYNAMIC ALERTS IMPLEMENTATION =====
import { useEffect, useState } from "react";
import { FaTrashAlt, FaSpinner } from "react-icons/fa";
import { useAuth } from "../../context/UseAuth";
import ToastUtils from "../../utils/ToastUtils";
import DeleteAlertPopup from "../Popups/DeleteAlertPopup";
import { api } from "../../api";
import {
  GET_ALL_ALERTS_API,
  MARK_ALERT_SEEN_API,
  DELETE_ALERT_API,
} from "../../constant/ApiUrls";
import { checkSuccessResponse } from "../../utils/RouterUtils";

const Alerts = () => {
  const { user, token } = useAuth();
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingAlerts, setDeletingAlerts] = useState(new Set());
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  // Fetch alerts from API
  const fetchAlerts = async () => {
    if (!user?.id || !token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await api({
        endpoint: GET_ALL_ALERTS_API,
      });

      if (response && checkSuccessResponse(response)) {
        // Handle different possible response structures
        const alertsData =
          response.data?.alerts || response.data?.data || response.data || [];
        setAlerts(alertsData);
      } else {
        setError(
          response?.data?.message ||
            "Failed to load alerts. Please try again later."
        );
      }
    } catch (err) {
      console.error("❌ Error fetching alerts:", err);
      setError("Failed to load alerts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Mark alert as seen
  const markAsSeen = async (alertId) => {
    if (!user?.id || !token) return;

    try {
      const response = await api({
        endpoint: MARK_ALERT_SEEN_API,
        id: `/${alertId}`,
      });

      if (response && checkSuccessResponse(response)) {
        // Update local state
        setAlerts((prevAlerts) =>
          prevAlerts.map((alert) =>
            alert.id === alertId ? { ...alert, is_seen: true } : alert
          )
        );
      } else {
      }
    } catch (err) {
      console.error("❌ Error marking alert as is_seen:", err);
      // Don't show error toast for this as it's not critical
    }
  };

  // Delete alert
  const deleteAlert = async (alertId) => {
    if (!user?.id || !token) return;

    try {
      setDeletingAlerts((prev) => new Set([...prev, alertId]));

      const response = await api({
        endpoint: DELETE_ALERT_API,
        id: `/${alertId}`,
      });

      if (response && checkSuccessResponse(response)) {
        // Update local state
        setAlerts((prevAlerts) =>
          prevAlerts.filter((alert) => alert.id !== alertId)
        );
        ToastUtils.success("Alert deleted successfully");
      } else {
        ToastUtils.error(response?.data?.message || "Failed to delete alert");
      }
    } catch (err) {
      console.error("❌ Error deleting alert:", err);
    } finally {
      setDeletingAlerts((prev) => {
        const newSet = new Set(prev);
        newSet.delete(alertId);
        return newSet;
      });
      setShowDeleteConfirm(null);
    }
  };

  // Handle alert click
  const handleAlertClick = (alert) => {
    if (!alert.is_seen) {
      markAsSeen(alert.id);
    }
  };

  // Handle delete confirmation
  const handleDeleteClick = (e, alertId) => {
    e.stopPropagation();
    setShowDeleteConfirm(alertId);
  };

  const confirmDelete = () => {
    if (showDeleteConfirm) {
      deleteAlert(showDeleteConfirm);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(null);
  };

  // Fetch alerts on component mount
  useEffect(() => {
    fetchAlerts();
  }, [user?.id, token]); // eslint-disable-line react-hooks/exhaustive-deps

  // Format timestamp for display
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "Unknown";

    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return "Today";
    } else if (diffInHours < 48) {
      return "Yesterday";
    } else {
      return "Older";
    }
  };

  // Group alerts by time period
  const groupAlertsByTime = (alerts) => {
    const groups = {
      Today: [],
      Yesterday: [],
      Older: [],
    };

    alerts.forEach((alert) => {
      const timeGroup = formatTimestamp(alert.createdAt);
      if (groups[timeGroup]) {
        groups[timeGroup].push(alert);
      }
    });

    return groups;
  };

  // Render loading state
  if (loading) {
    return (
      <div className="alerts-container">
        <div className="alert-loading">
          <FaSpinner className="spinner" />
          <p>Loading alerts...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="alerts-container">
        <div className="error-message no-space">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Render empty state
  if (!alerts.length) {
    return (
      <div className="alerts-container">
        <div className="alert-empty">
          <p>No alerts yet</p>
          <span>You'll see notifications and updates here</span>
        </div>
      </div>
    );
  }

  // Group alerts by time
  const groupedAlerts = groupAlertsByTime(alerts);

  // Render alert section
  const renderSection = (sectionTitle, sectionAlerts) => {
    if (!sectionAlerts.length) return null;

    return (
      <div className="alert-section-group" key={sectionTitle}>
        <h3 className="alert-section-header">{sectionTitle}</h3>
        <div className="alert-section-box">
          {sectionAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`alert-box ${alert?.is_seen ? "" : "important"} `}
              onClick={() => handleAlertClick(alert)}
              style={{ cursor: "pointer" }}
            >
              <div className="alert-left">
                <div className="alert-dot-wrapper">
                  {(!alert?.is_seen || alert?.important) && (
                    <span className="alert-dot" />
                  )}
                </div>
                <div className="alert-content">
                  <strong className="alert-title">{alert?.title}</strong>
                  <p className="alert-description">{alert?.message}</p>
                  {/* {alert?.createdAt && (
                    <small className="alert-timestamp">
                      {new Date(alert?.createdAt).toLocaleString()}
                    </small>
                  )} */}
                </div>
              </div>
              <button
                className="alert-delete"
                onClick={(e) => handleDeleteClick(e, alert.id)}
                disabled={deletingAlerts.has(alert.id)}
                title="Delete alert"
              >
                {deletingAlerts.has(alert.id) ? (
                  <FaSpinner className="spinner" />
                ) : (
                  <FaTrashAlt />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="alerts-container">
        {renderSection("Today", groupedAlerts.Today)}
        {renderSection("Yesterday", groupedAlerts.Yesterday)}
        {renderSection("Older", groupedAlerts.Older)}
      </div>

      {/* Delete Confirmation Popup */}
      {showDeleteConfirm && (
        <DeleteAlertPopup onClose={cancelDelete} onConfirm={confirmDelete} />
      )}
    </>
  );
};

export default Alerts;
