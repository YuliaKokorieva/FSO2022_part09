import { CoursePart } from "../types"


const Total = ({courseParts}: {courseParts:Array<CoursePart>}) => (
  <div>
    <p>
      <b>Total number of exercises:{" "}
      {courseParts.reduce((carry:number, part:CoursePart) => carry + part.exerciseCount, 0)}</b>
    </p>
  </div>
);

export default Total;