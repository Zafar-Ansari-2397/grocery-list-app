import React, { useEffect } from "react";

const Alert = ({ msg, type, removeAlert, list }) => {
  useEffect(() => {
    const time = setTimeout(() => {
      removeAlert();
    }, 3000);

    return () => clearTimeout(time);
  }, [list]);
  return (
    <>
      <p className={`alert alert-${type}`}>{msg}</p>
    </>
  );
};

export default Alert;
