interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number,
}

// interface ExValues {
//   target: number,
//   hours: Array<number>
// }

export const calculateExercises = (numbers: Array<number>, target: number): Result => {
  const ave = numbers.reduce((a,b) => a+b, 0)/numbers.length;
  const ratingRes = ratingCalc(target, ave);


  const result:Result = {
    periodLength: numbers.length,
    trainingDays:  numbers.filter(x=> x!==0).length,
    success: (target < ave) ? true : false ,
    rating: ratingRes.rating,
    ratingDescription: ratingRes.descr,
    target: target,
    average: ave
  }; 

  return result;
};

const ratingCalc = (target: number, average: number) : {rating: number, descr: string} => {
  switch (true) {
    case (average==0) : 
      return {rating: 0, descr: "very bad"};
    case (average>=target) :
      return {rating: 3, descr: "fantastic job"};
    case ((target - average)<=average*0.1) :
      return {rating:2, descr: "not too bad but could be better"};
    case ((target - average)>average*0.1) :
      return {rating:1, descr: "bad"};
    default:
      return {rating: 0, descr: "no comments"};
  }
};


// const parseArguments = (args: Array<string>) : ExValues => {
//   console.log(`: ${args}`);
//   let numCheck = true;
//   for (let i=2; i<args.length; i++) {
//     if (isNaN(Number(args[i]))) {
//       numCheck = false;
//       throw new Error('Provided values were not numbers!');
//     }
//   }
//   const hoursArray:Array<number> = [];

//   if (numCheck) {
//     for (let i=2; i<args.length; i++) {
//       hoursArray.push(Number(args[i]));
//     }
//   }

//   const exValues: ExValues = {
//     target: Number(args[2]),
//     hours: hoursArray
//   };
//   return exValues;
// };

// try {
//   const {target, hours} = parseArguments(process.argv);
//   console.log(calculateExercises(hours, target));
// } catch (error: unknown) {
//   let errorMessage = 'Something bad happened.';
//   if (error instanceof Error) {
//     errorMessage += ' Error: ' + error.message;
//   }
//   console.log(errorMessage);
// }



