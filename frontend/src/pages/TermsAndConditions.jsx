//  Written by Aleem Abbas-Hussain and Mohammed Shahid 

import React from "react";
import termsHtml from "./TermsHtml.jsx"; // import the string from above
import "../styles/TermsAndConditions.css";

const TandCs = () => {
  return (
    <div className="page-wrapper">
        <><button
          type="button"
          className="close-btn-tandc"
          onClick={() => (window.location.href = "/signup")}
      >
          X
      </button><div className="terms-container"
          dangerouslySetInnerHTML={{ __html: termsHtml }} /></>
    </div>
  );
};

export default TandCs;

