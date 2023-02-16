interface exerciseInfo {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

interface exerciseValues {
    target: number,
    exerciseHours: Array<number>
}

const parseArguments = (args: Array<string>): exerciseValues => {
    if (args.length < 2) throw new Error('Not enough arguments');
    const exerciseHours = args.slice(3, args.length).map(n => Number(n))
    const target = Number(args[2])
    return {target, exerciseHours}    
}

const calculateExercises = ( target: number, exerciseHours: Array<number>): exerciseInfo => {
    const periodLength = exerciseHours.length
    const trainingDays = exerciseHours.filter(n => n>0).length
    const average = (exerciseHours.reduce((a, b) => (a+b)))/periodLength
    const success = average >= target
    let rating, ratingDescription
    if(average < target) {
        rating = 1
        ratingDescription = "not too bad but could be better"
    }
    else if (average === target) {
        rating = 2 
        ratingDescription = "ok"
    }
    else {
        rating = 3
        ratingDescription = "good"
    }
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
}

const {target, exerciseHours} = parseArguments(process.argv)
console.log(calculateExercises(target, exerciseHours))