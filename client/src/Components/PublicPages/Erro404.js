import React from "react";
import errorImg from "../../Images/undraw_page_not_found_su7k.svg";
const Erro404 = () => {
  return (
    <div className="error-404">
      <img src={errorImg} alt="404" className="center-x" />
      <p className="text-center fw-bold display-4">
        The Page you're looking for doext Exist
      </p>
    </div>
  );
};

export default Erro404;
