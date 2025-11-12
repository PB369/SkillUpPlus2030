import { EducationalCourseType } from "./educationalCourseType";

type userSkill = {
  skillName: string,
  level: 'Básico' | 'Intermediário' | 'Avançado'
}

export type UserType = {
  id: string;
  username: string;
  password?: string;
  email: string;
  isAuthenticated: boolean;
  educationalCourses?: EducationalCourseType[];
  skills?: userSkill[];
};