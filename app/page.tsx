"use client";

import { useState } from "react";

export default function App() {
  const [patientName, setPatientName] = useState("");
  const [transcript, setTranscript] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateNote = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://m67to0ilt2.execute-api.us-east-1.amazonaws.com/connectToRDS", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientName,
          transcript,
        }),
      });

      const data = await response.json();
      setNote(data.note || JSON.stringify(data));
    } catch (err) {
      console.error(err);
      setNote("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>NexiScribe: Medical Record Generator</h1>

      <label>
        <strong>Patient Name:</strong>
        <br />
        <input
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
        />
      </label>

      <label>
        <strong>Transcript:</strong>
        <br />
        <textarea
          rows={8}
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
        />
      </label>

      <button onClick={handleGenerateNote} disabled={loading} style={{ padding: "0.75rem 1.5rem" }}>
        {loading ? "Generating..." : "Generate Note"}
      </button>

      {note && (
        <div style={{ marginTop: "2rem", backgroundColor: "#f4f4f4", padding: "1rem", borderRadius: "8px" }}>
          <h2>Generated SOAP Note:</h2>
          <pre>{note}</pre>
        </div>
      )}
    </main>
  );
}
