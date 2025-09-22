import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function ChallengeDetail() {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/challenges/${id}`)
      .then((res) => setChallenge(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!challenge) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{challenge.title}</h1>
      <p className="text-gray-700 mb-3">{challenge.description}</p>
      <p className="text-sm text-gray-500">
        Sample Input: {JSON.stringify(challenge.sampleInput)}
      </p>
      <p className="text-sm text-gray-500 mb-5">
        Expected Output: {JSON.stringify(challenge.expectedOutput)}
      </p>

      {/* Solve button */}
      <Link
        to={`/solve/${challenge.id}`}
        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        Solve Challenge 🚀
      </Link>
    </div>
  );
}

export default ChallengeDetail;
