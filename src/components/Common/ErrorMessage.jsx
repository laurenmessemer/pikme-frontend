import CustomSvgIcon from "../../constant/CustomSvgIcons";

const ErrorMessage = ({ message = "" }) => {
  return (
    <>
      <p className="custom-error-message">
        <span className="icon-error">
          <CustomSvgIcon icon="ErrorFormIcon" />
        </span>{" "}
        {message}
      </p>
    </>
  );
};

export default ErrorMessage;
