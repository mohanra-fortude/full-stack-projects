import React, { useState } from "react";
import CandidateList from "../containers/hr/HrManageCandidate";

const Candidate: React.FC<{}> = () => {
  const [count, setCount] = useState(0);
  console.log(count)
  return (
    <div>
       {/* eslint-disable-next-line */}
      <p data-testid="countervalue">{Candidate}</p>
      <button
        data-testid="increment-btn"
        onClick={() => setCount((prev) => prev + 1)}
      >
        Increment
      </button>
      <button
        data-testid="decrement-btn"
        onClick={() => setCount((prev) => prev - 1)}
      >
        Decrement
      </button>
    </div>
  );
};
export default CandidateList;
