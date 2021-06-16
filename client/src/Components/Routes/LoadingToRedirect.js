import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { message } from "antd";
export default function LoadingToRedirect({ destination }) {
  const [count, setCount] = useState(5);
  const history = useHistory();
  const key = "updatable";
  const showMessage = () => {
    message.loading({ content: `Redirecting in ${count} seconds...`, key });
    setTimeout(() => {
      message.success({
        content: `Redirecting in ${count} seconds...`,
        key,
        duration: 2,
      });
      history.push(`${destination}`);
    }, 5000);
  };
  useEffect(() => {
    showMessage();
  }, []);
  return (
    <div className="container p-5 text-center" style={{ paddingTop: "10vh" }}>
      <p>Redirecting you in {count} seconds</p>
    </div>
  );
}
