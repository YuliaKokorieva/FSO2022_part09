import { CoursePart } from "../types";
import Part from "./Part";

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

export default Content;