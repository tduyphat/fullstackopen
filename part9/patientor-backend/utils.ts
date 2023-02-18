/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { newPatientEntry, Gender } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
    if(!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };

const parseDateOfBirth = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if(!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if(!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }
    return occupation;
};

const parseSSN = (ssn: unknown): string => {
    if(!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn:' + ssn);
    }
    return ssn;
};

type Fields = {name: unknown, dateOfBirth: unknown, gender: unknown, occupation: unknown, ssn: unknown};

const toNewPatientEntry = ({name, dateOfBirth, gender, occupation, ssn}: Fields): newPatientEntry => {
    const newEntry: newPatientEntry = {
        name: parseName(name),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
        ssn: parseSSN(ssn)
    };

    return newEntry;
};

export default toNewPatientEntry;