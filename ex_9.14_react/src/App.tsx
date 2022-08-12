interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartBaseExtended extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartBaseExtended {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBaseExtended {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartBaseExtended {
  type: "special";
  requirements: Array<string>;
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

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
        )

      
    default:
      return assertNever(part)
  }

}


const Header = ({text}: {text:string}) => (
  <div><h1>{text}</h1></div>
);

const Content = ({courseParts}: {courseParts:Array<CoursePart>}) => (
  <div>
    {
      courseParts.map((part:CoursePart)=> (
        <div key={part.name}>
          <Part part = {part}/>
        </div>
      ))
    }
  </div>
);

const Total = ({courseParts}: {courseParts:Array<CoursePart>}) => (
  <div>
    <p>
      <b>Total number of exercises:{" "}
      {courseParts.reduce((carry:number, part:CoursePart) => carry + part.exerciseCount, 0)}</b>
    </p>
  </div>
)

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the easy course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the hard course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ]

  return (
    <div>
      <Header text ={courseName} />
      <Content courseParts = {courseParts}/>
      <Total courseParts = {courseParts}/>
    </div>
  );
};

export default App;