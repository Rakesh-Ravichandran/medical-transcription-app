"use client";

import { useState } from "react";

export default function App() {
  const [response, setResponse] = useState(null);

  const callLambda = async () => {
    const res = await fetch("https://m67to0ilt2.execute-api.us-east-1.amazonaws.com/connectToRDS");
    const data = await res.json();
    setResponse(data);
  };

  return (
    <main style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Lambda + RDS Test</h1>
      <button
        onClick={callLambda}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          background: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Test API
      </button>
      {response && (
        <pre style={{ marginTop: "1rem", background: "#eee", padding: "1rem" }}>
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </main>
  );
}
