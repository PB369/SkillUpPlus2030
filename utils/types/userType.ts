import { EducationalCourseType } from "./educationalCourseType";

type userSkill = {
  skillName: string,
  level: 'Básico' | 'Intermediário' | 'Avançado'
}

type UserJourneyType = {
  amountStreakDays: number;
  amountTotalAccessDays: number;
  amountFinishedCourses: number;
  amountChatMessages: number;
  userPoints: number;
}

export type UserType = {
  id: string;
  username: string;
  password?: string;
  email: string;
  accountCreationDate: string;
  lastAccessDate?: string;
  isAuthenticated: boolean;
  educationalCourses?: EducationalCourseType[];
  skills?: userSkill[];
  userJourney: UserJourneyType;
};