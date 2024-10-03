import { collection } from 'firebase/firestore'
import { db } from './firebase'

export const usersCollection = collection(db, 'users')
export const lostCollection = collection(db, 'lost_items')
export const messageCollection = collection(db, 'messages')
export const projectCollection = collection(db, 'projects')
export const airplaneCollection = collection(db, 'airplanes')
export const crewsCollection = collection(db, 'crews')
export const vacancyCollection = collection(db, 'job_vacancies')
export const incidentCollection = collection(db, 'incidents')
export const trainingCollection = collection(db, 'trainings')
export const interviewCollection = collection(db, 'interviews')
