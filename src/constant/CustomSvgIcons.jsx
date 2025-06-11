const CustomSvgIcon = ({ icon, color = "#FFFFFF" }) => {
  switch (icon) {
    case "ErrorFormIcon":
      return (
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_5647_81058)">
            <path
              d="M6.78757 4.66239V6.92429M6.78757 9.1862H6.79323M12.4423 6.92429C12.4423 10.0473 9.91061 12.5791 6.78757 12.5791C3.66454 12.5791 1.13281 10.0473 1.13281 6.92429C1.13281 3.80125 3.66454 1.26953 6.78757 1.26953C9.91061 1.26953 12.4423 3.80125 12.4423 6.92429Z"
              stroke="#CF2F2F"
              stroke-width="1.35714"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
        </svg>
      );
    case "PasswordEyeIcon":
      return (
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.3925 9.98981C11.0369 9.98981 9.93512 11.0926 9.93512 12.4482C9.93512 13.8028 11.0369 14.9046 12.3925 14.9046C13.7481 14.9046 14.851 13.8028 14.851 12.4482C14.851 11.0926 13.7481 9.98981 12.3925 9.98981ZM12.3925 16.4335C10.194 16.4335 8.40625 14.6457 8.40625 12.4482C8.40625 10.2497 10.194 8.46094 12.3925 8.46094C14.5911 8.46094 16.3798 10.2497 16.3798 12.4482C16.3798 14.6457 14.5911 16.4335 12.3925 16.4335Z"
            fill="#3D3D3D"
          />
          <mask
            id="mask0_5647_80219"
            style={{ maskType: "luminance" }}
            maskUnits="userSpaceOnUse"
            x="2"
            y="4"
            width="21"
            height="17"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2.19922 4.23828H22.5841V20.6533H2.19922V4.23828Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask0_5647_80219)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.79976 12.4453C5.69556 16.6334 8.88887 19.1234 12.392 19.1244C15.8952 19.1234 19.0885 16.6334 20.9843 12.4453C19.0885 8.2582 15.8952 5.76818 12.392 5.76716C8.88989 5.76818 5.69556 8.2582 3.79976 12.4453ZM12.3935 20.6541H12.3894H12.3884C8.17279 20.651 4.38729 17.6962 2.26114 12.7477C2.17858 12.5551 2.17858 12.337 2.26114 12.1443C4.38729 7.19691 8.17381 4.2421 12.3884 4.23905C12.3904 4.23803 12.3904 4.23803 12.3915 4.23905C12.3935 4.23803 12.3935 4.23803 12.3945 4.23905C16.6101 4.2421 20.3956 7.19691 22.5218 12.1443C22.6054 12.337 22.6054 12.5551 22.5218 12.7477C20.3966 17.6962 16.6101 20.651 12.3945 20.6541H12.3935Z"
              fill="#3D3D3D"
            />
          </g>
        </svg>
      );
    case "PasswordEyeOffIcon":
      return (
        <svg
          width="26"
          height="25"
          viewBox="0 0 26 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.6057 16.0834C10.41 16.0834 10.2143 16.009 10.0655 15.8592C9.31327 15.108 8.89844 14.1091 8.89844 13.0471C8.89844 10.8455 10.6882 9.05469 12.8878 9.05469C13.9458 9.05469 14.9732 9.48175 15.706 10.2268C16.0016 10.5285 15.9985 11.0116 15.6968 11.3072C15.3962 11.6049 14.913 11.5998 14.6164 11.3001C14.169 10.8445 13.5391 10.5836 12.8878 10.5836C11.5312 10.5836 10.4273 11.6884 10.4273 13.0471C10.4273 13.7004 10.6831 14.3161 11.1459 14.7788C11.4445 15.0774 11.4445 15.5606 11.1469 15.8592C10.9971 16.009 10.8014 16.0834 10.6057 16.0834"
            fill="#3D3D3D"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M13.4668 16.9705C13.1049 16.9705 12.7828 16.7116 12.7156 16.3426C12.6401 15.9278 12.9153 15.5292 13.3312 15.4538C14.3301 15.2724 15.121 14.4794 15.3004 13.4795C15.3758 13.0647 15.7733 12.7915 16.1882 12.8629C16.604 12.9373 16.8802 13.3348 16.8058 13.7506C16.5133 15.3743 15.227 16.6626 13.6044 16.9582C13.5585 16.9664 13.5116 16.9705 13.4668 16.9705"
            fill="#3D3D3D"
          />
          <mask
            id="mask0_9157_18060"
            style={{ maskType: "luminance" }}
            maskUnits="userSpaceOnUse"
            x="2"
            y="4"
            width="18"
            height="16"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2.69531 4.87891H19.0912V19.2484H2.69531V4.87891Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask0_9157_18060)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.43941 19.2484C7.27429 19.2484 7.10815 19.1944 6.9675 19.0853C5.24395 17.7318 3.78744 15.7473 2.758 13.348C2.67442 13.1543 2.67442 12.9362 2.758 12.7436C3.79865 10.3341 5.26433 8.33939 6.99706 6.97665C10.5298 4.18085 15.2326 4.17168 18.801 6.99704C19.1322 7.25898 19.1883 7.74007 18.9264 8.07133C18.6634 8.40054 18.1843 8.45864 17.8521 8.19567C14.829 5.80248 10.9344 5.81063 7.94394 8.17733C6.4803 9.32908 5.22356 11.0068 4.29604 13.0473C5.21439 15.0756 6.45991 16.7431 7.91234 17.8826C8.24462 18.1436 8.3017 18.6246 8.04077 18.9559C7.88992 19.1475 7.66568 19.2484 7.43941 19.2484"
              fill="#3D3D3D"
            />
          </g>
          <mask
            id="mask1_9157_18060"
            style={{ maskType: "luminance" }}
            maskUnits="userSpaceOnUse"
            x="9"
            y="9"
            width="15"
            height="13"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9.53906 9.07422H23.0773V21.2524H9.53906V9.07422Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask1_9157_18060)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12.8849 21.2524C11.9298 21.2524 10.9799 21.0975 10.0626 20.7927C9.66202 20.6592 9.44492 20.226 9.57844 19.8255C9.71196 19.4239 10.1431 19.2109 10.5457 19.3413C11.3071 19.5951 12.0939 19.7235 12.8849 19.7235C16.3789 19.7235 19.5722 17.2345 21.4772 13.0444C21.0124 12.0262 20.4712 11.1038 19.8657 10.2985C19.6119 9.96117 19.6792 9.48111 20.0166 9.22732C20.3529 8.97352 20.833 9.04283 21.0868 9.37918C21.8247 10.3587 22.473 11.4911 23.0142 12.7407C23.0988 12.9343 23.0988 13.1545 23.0142 13.3471C20.8778 18.2976 17.0913 21.2524 12.8849 21.2524"
              fill="#3D3D3D"
            />
          </g>
          <mask
            id="mask2_9157_18060"
            style={{ maskType: "luminance" }}
            maskUnits="userSpaceOnUse"
            x="4"
            y="4"
            width="18"
            height="18"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4.08594 4.24219H21.6919V21.8477H4.08594V4.24219Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask2_9157_18060)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4.85012 21.8485C4.65442 21.8485 4.45873 21.774 4.30992 21.6242C4.01128 21.3256 4.01128 20.8425 4.30992 20.5438L20.3876 4.46617C20.6862 4.16753 21.1693 4.16753 21.468 4.46617C21.7666 4.76481 21.7666 5.24895 21.468 5.54759L5.39032 21.6242C5.24151 21.774 5.04582 21.8485 4.85012 21.8485"
              fill="#3D3D3D"
            />
          </g>
        </svg>
      );
    case "ArrowLeftIcon":
      return (
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 320 512"
          height="200px"
          width="200px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"></path>
        </svg>
      );
    case "CloseModelIcon":
      return (
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.2197 0.46967C12.5126 0.176777 12.9874 0.176777 13.2803 0.46967C13.5732 0.762563 13.5732 1.23744 13.2803 1.53033L7.81066 7L13.2803 12.4697C13.5732 12.7626 13.5732 13.2374 13.2803 13.5303C12.9874 13.8232 12.5126 13.8232 12.2197 13.5303L6.75 8.06066L1.28033 13.5303C0.987437 13.8232 0.512563 13.8232 0.21967 13.5303C-0.0732234 13.2374 -0.0732231 12.7626 0.21967 12.4697L5.68934 7L0.21967 1.53033C-0.0732232 1.23744 -0.0732232 0.762563 0.21967 0.46967C0.512563 0.176777 0.987437 0.176777 1.28033 0.46967L6.75 5.93934L12.2197 0.46967Z"
            fill="#3D3D3D"
          />
        </svg>
      );
    case "EditIcon":
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.013 1.667a1.5 1.5 0 0 1 2.121 0l1.2 1.2a1.5 1.5 0 0 1 0 2.122L5.5 13.823a.5.5 0 0 1-.177.146l-3.334 1.5a.5.5 0 0 1-.652-.652l1.5-3.334a.5.5 0 0 1 .146-.177L11.013 1.667Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M9.5 3.167L12.833 6.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "UploadIcon":
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 10.667V2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.333 4.667L8 2l2.667 2.667"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2.667 14h10.666"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "DeleteIcon":
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 4h12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.667 4V2.667a1.333 1.333 0 0 1 1.333-1.334h0a1.333 1.333 0 0 1 1.333 1.334V4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M12.667 4v9.333a1.333 1.333 0 0 1-1.334 1.334H4.667A1.333 1.333 0 0 1 3.333 13.333V4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M6.667 7.333v4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.333 7.333v4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "SaveIcon":
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.5 4.5L6 12L2.5 8.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "CancelIcon":
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 4L4 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 4L12 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      if (typeof icon !== "string") {
        return icon;
      }
      break;
  }
};

export default CustomSvgIcon;
