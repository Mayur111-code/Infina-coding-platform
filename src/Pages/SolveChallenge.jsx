import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function SolveChallenge() {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    axios.get(`https://leetcode.com/api/problems/all/${id}`)
      .then((res) => setChallenge(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = () => {
    try {
      // ⚠️ Demo only: eval is unsafe in production
      const userFunc = eval(`(${code})`);
      const output = userFunc(challenge.sampleInput);

      if (JSON.stringify(output) === JSON.stringify(challenge.expectedOutput)) {
        setResult(`✅ Correct! You earned ${challenge.points} points`);
      } else {
        setResult(
          `❌ Wrong! Expected ${JSON.stringify(challenge.expectedOutput)}, but got ${JSON.stringify(output)}`
        );
      }
    } catch (err) {
      setResult("⚠️ Error: " + err.message);
    }
  };

  if (!challenge) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Challenge details */}
      <h2 className="text-2xl font-bold mb-2">{challenge.title}</h2>
      <p className="text-gray-600 mb-4">{challenge.description}</p>
      <p className="text-sm text-gray-500">
        Sample Input: {JSON.stringify(challenge.sampleInput)}
      </p>
      <p className="text-sm text-gray-500 mb-5">
        Expected Output: {JSON.stringify(challenge.expectedOutput)}
      </p>

      {/* Code editor */}
      <textarea
        className="w-full h-40 border p-2 font-mono"
        placeholder="Write your function here... e.g. function solve(arr) { return arr.reverse(); }"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      ></textarea>

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded mt-3 hover:bg-green-700"
      >
        Submit ✅
      </button>

      {result && (
        <div className="mt-4 p-3 bg-white shadow rounded">
          <strong>Result:</strong> {result}
        </div>
      )}
    </div>
  );
}

export default SolveChallenge;
