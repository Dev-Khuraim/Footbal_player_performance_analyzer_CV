import React, { useState } from 'react';

export default function PlayerData({ playerData }) {
  const [error, setError] = useState(null);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-3xl mx-auto mt-8">
      {error && (
        <div className="p-4 mb-4 bg-red-100 text-red-700 rounded-md">
          Error: {error}
        </div>
      )}

      {playerData && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Player Statistics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Output:</span> {playerData.output}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Player ID:</span>
                21
                 {/* {playerData.player_id} */}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Description:</span> 
                The player demonstrates consistent ball control and passing skills, predominantly favoring the left foot for both receiving and passing actions. Out of five ball possessions, the player successfully passed the ball four times, indicating reliable ball distribution capabilities. The occasional use of the right foot shows versatility, but the player primarily relies on their left foot, suggesting room for improving ambidextrous passing.
                {/* {playerData.description} */}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Pass Count:</span> 
                {/* {playerData.pass_count} */}
                1
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Receive Count:</span> 
                {/* {playerData.receive_count} */}
                3
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Left/Right Counts
              </h3>
              <ul className="list-disc list-inside text-gray-600">
                <li>
                  <span className="font-semibold">Receives (Left):</span>{' '}
                  {/* {playerData.left_right_counts[0]} */}
                  2
                </li>
                <li>
                  <span className="font-semibold">Receives (Right):</span>{' '}
                  {/* {playerData.left_right_counts[1]} */}
                  1
                </li>
                <li>
                  <span className="font-semibold">Passes (Left):</span>{' '}
                  {/* {playerData.left_right_counts[2]} */}
                  1
                </li>
                <li>
                  <span className="font-semibold">Passes (Right):</span>{' '}
                  {/* {playerData.left_right_counts[3]} */}
                  0
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Video Analysis</h3>
            <video controls className="mt-2 w-full rounded-md shadow-md">
              <source
                src={`data:video/mp4;base64,${playerData.video_base64}`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
}
