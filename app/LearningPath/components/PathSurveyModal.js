"use client";
import { useState } from "react";

export default function PathSurveyModal({ onClose, onSubmit }) {
  const [level, setLevel] = useState("beginner");
  const [goal, setGoal] = useState("interview");
  const [focus, setFocus] = useState("all");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ level, goal, focus });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Create Custom Path</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Your DSA Level</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full p-2 rounded border"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Goal</label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full p-2 rounded border"
            >
              <option value="interview">Crack Interviews</option>
              <option value="competitive">Competitive Coding</option>
              <option value="revision">Revision</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Focus Area</label>
            <select
              value={focus}
              onChange={(e) => setFocus(e.target.value)}
              className="w-full p-2 rounded border"
            >
              <option value="all">All Topics</option>
              <option value="arrays">Arrays</option>
              <option value="graphs">Graphs</option>
              <option value="dp">Dynamic Programming</option>
            </select>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Generate Path
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
