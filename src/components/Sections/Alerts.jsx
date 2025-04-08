import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import "../../styles/sections/Alerts.css";

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
      description: "Confirm your email address to participate in contests and claim rewards.",
      isImportant: true,
    },
    {
      id: "alert-3",
      date: "Today",
      title: "Set up your profile",
      description: "Add a profile picture and username so others know who you are.",
    },
    {
      id: "alert-4",
      date: "Today",
      title: "Start your first contest",
      description: "Head to the Compete tab and join a live contest to get started!",
    },
    {
      id: "alert-5",
      date: "Yesterday",
      title: "New feature: Invite a friend",
      description: "Use your invite code to challenge a friend in a head-to-head match.",
    },
    {
      id: "alert-6",
      date: "Older",
      title: "Tips for getting more votes",
      description: "Make your submissions pop with on-theme content and quality images!",
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
  