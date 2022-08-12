import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part =({part}: {part: CoursePart}) => {
  switch (part.type) {
    case "normal":
      return (
        <div>
          <h3>{part.name}</h3>
          <p>Number of exercises: {part.exerciseCount}</p>
          <i>{part.description}</i>

        </div>
      );
    case "groupProject":
      return (
        <div>
          <h3>{part.name}</h3>
          <p>Number of exercises: {part.exerciseCount}</p>
          <p>Number of project exercises: {part.groupProjectCount}</p>

        </div>
    );

    case "submission":
      return (
        <div>
          <h3>{part.name}</h3>
          <p>Number of exercises: {part.exerciseCount}</p>
          <i>{part.description}</i>
          <p>submit to {part.exerciseSubmissionLink}</p>
        </div>
      );

    case "special":
      return (
        <div>
          <h3>{part.name}</h3>
          <p>Number of exercises: {part.exerciseCount}</p>
          <i>{part.description}</i>
        </div>
      );

    default:
      return assertNever(part);
  }

}

export default Part;