import noDataImg from "../../assets/icons/no-data.png";

const NoData = ({
  message = "We couldn't find any records.",
  subtext = "There is currently no data to display. Please check back later or try a different filter.",
}) => (
  <div className="no-activity-data">
    <div className="dashed-box small">
      <div className="empty-icon" aria-label="No data">
        <img
          src={noDataImg}
          alt="No data"
          style={{ width: 56, height: 56, objectFit: "contain" }}
        />
      </div>
      <p className="main-message">{message}</p>
      <p className="sub-message">{subtext}</p>
    </div>
  </div>
);

export default NoData;
