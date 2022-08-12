interface Course {
  name: string, 
  exerciseCount: number
}

const Header = ({text}: {text:string}) => (
  <div><h1>{text}</h1></div>
);

const Content = ({courseParts}: {courseParts:any}) => (
  <div>
    {
      courseParts.map((part:Course)=> (
        <p key={part.name}>
          {part.name}: {part.exerciseCount} exercises
        </p>
      ))
    }
  </div>
);

const Total = ({courseParts}: {courseParts:any}) => (
  <div>
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry:number, part:Course) => carry + part.exerciseCount, 0)}
    </p>
  </div>
)

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: Array<Course> = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header text ={courseName} />
      <Content courseParts = {courseParts}/>
      <Total courseParts = {courseParts}/>
    </div>
  );
};

export default App;