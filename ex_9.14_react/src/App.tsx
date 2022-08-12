interface Course {
  name: string, 
  exerciseCount: number
}

const Header = ({text}: {text:string}) => (
  <div><h1>{text}</h1></div>
);

const Content = ({courseParts}: {courseParts:any}) => (
  <div>
    <p>
        {courseParts[0].name} {courseParts[0].exerciseCount}
      </p>
      <p>
        {courseParts[1].name} {courseParts[1].exerciseCount}
      </p>
      <p>
        {courseParts[2].name} {courseParts[2].exerciseCount}
      </p>
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
  const courseParts = [
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