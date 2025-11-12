import { EducationalCourseType } from "./educationalCourseType";

export type UserType = {
  id: string;
  username: string;
  password?: string;
  email: string;
  isAuthenticated: boolean;
  educationalCourses?: EducationalCourseType[];
};