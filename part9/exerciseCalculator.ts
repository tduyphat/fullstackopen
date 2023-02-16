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

export const parseArguments = (exerciseHoursParam: Array<number>, targetParam: number): exerciseValues => {
    const exerciseHours =  exerciseHoursParam
    const target = Number(targetParam)
    const check = exerciseHours.map(n => isNaN(n))
    if(check.includes(false) && !isNaN(target)) return {target, exerciseHours}
    else throw new Error("Some of arguments are not number")    
}

export const calculateExercises = ( target: number, exerciseHours: Array<number>): exerciseInfo => {
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