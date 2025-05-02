// // app/MyPathsPage.jsx
// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { usePaths } from "../utils/usePaths";
// import PathSurveyModal from "../components/PathSurveyModal";
// import { BookOpen, Plus, Trash2 } from "lucide-react";

// const DEFAULT_PATH_ID = "default-full-dsa-path";

// function generateCustomPath(survey) {
//   // In real use, call your AI/LLM backend here.
//   // For now, generate a random id and a simple name.
//   return {
//     id: `custom-${Date.now()}`,
//     name: `Custom Path (${survey.level}, ${survey.goal}, ${survey.focus})`,
//     survey,
//     createdAt: Date.now(),
//   };
// }

// export default function MyPathsPage() {
//   const router = useRouter();
//   const { paths, addPath, removePath } = usePaths();
//   const [showSurvey, setShowSurvey] = useState(false);

//   // Default path always exists
//   const allPaths = [
//     {
//       id: DEFAULT_PATH_ID,
//       name: "Complete DSA Path",
//       description: "Full recommended path covering all DSA topics.",
//       icon: <BookOpen className="w-8 h-8 text-blue-600" />,
//       isDefault: true,
//     },
//     ...paths,
//   ];

//   const handleSurveySubmit = (survey) => {
//     const newPath = generateCustomPath(survey);
//     addPath(newPath);
//   };

//   return (
//     <div className="max-w-3xl mx-auto py-10 px-4">
//       <h1 className="text-3xl font-bold mb-6">My Learning Paths</h1>
//       <div className="mb-6 flex gap-3">
//         <button
//           onClick={() => router.push(`/path/${DEFAULT_PATH_ID}`)}
//           className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
//         >
//           <BookOpen size={20} /> Start Default Path
//         </button>
//         <button
//           onClick={() => setShowSurvey(true)}
//           className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
//         >
//           <Plus size={20} /> New Custom Path
//         </button>
//       </div>

//       <div className="space-y-4">
//         {allPaths.map((path) => (
//           <div
//             key={path.id}
//             className="flex items-center justify-between bg-white dark:bg-zinc-800 p-4 rounded shadow border"
//           >
//             <div className="flex items-center gap-4">
//               {path.icon || <BookOpen className="w-8 h-8 text-blue-600" />}
//               <div>
//                 <div className="font-semibold">{path.name}</div>
//                 {path.description && (
//                   <div className="text-sm text-zinc-500">
//                     {path.description}
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div className="flex gap-2">
//               <button
//                 onClick={() => router.push(`/path/${path.id}`)}
//                 className="bg-blue-500 text-white px-3 py-1 rounded"
//               >
//                 Visit
//               </button>
//               {!path.isDefault && (
//                 <button
//                   onClick={() => removePath(path.id)}
//                   className="text-red-500 hover:bg-red-100 p-2 rounded"
//                   title="Delete Path"
//                 >
//                   <Trash2 size={18} />
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {showSurvey && (
//         <PathSurveyModal
//           onClose={() => setShowSurvey(false)}
//           onSubmit={handleSurveySubmit}
//         />
//       )}
//     </div>
//   );
// }

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
