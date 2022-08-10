

// interface BmiValues {
//   height: number;
//   mass: number;
// }

export const calculateBmi = (height: number, mass: number) : string => {
  const bmi = mass/((height/100)*(height/100));

  switch(true) {
    case (0<=bmi && bmi<=18.4):
      return "Underweight";
    case (18.4<bmi && bmi<=24.9):
      return "Normal weight";
    case (24.9<bmi && bmi<=29.9):
      return "Overweight";
    case (29.9<bmi):
      return "Obese";
    default:
      return("No info");
  }
};
// export const validateInput = (inputQuery: Query) : boolean => {
//   if (!("weight" in inputQuery) || !("height" in inputQuery)) {
//     return false;
//   }
//   return true;

// }

// const parseArgumentsBmi = (args: Array<string>): BmiValues => {
//   if (args.length < 4) throw new Error('Not enough arguments');
//   if (args.length > 4) throw new Error('Too many arguments');

//   if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//     return {
//       height: Number(args[2]),
//       mass: Number(args[3])
//     }
//   } else {
//     throw new Error('Provided values were not numbers!');
//   }
// }


// try {
//   const {height, mass} = parseArgumentsBmi(process.argv);
//   console.log(calculateBmi(height, mass))
// } catch (error: unknown) {
//   let errorMessage = 'Something bad happened.'
//   if (error instanceof Error) {
//     errorMessage += ' Error: ' + error.message;
//   }
//   console.log(errorMessage);
// }

