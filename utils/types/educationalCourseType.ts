type EducationalCourseLessonType = {
  lessonId: number,
  lessonName: string,
  lessonDuration: string,
  isFinished: boolean,
  content: string,
}

type EducationalCourseModuleType = {
  moduleId: number,
  moduleName: string,
  moduleDescription: string,
  moduleDuration: string,
  moduleProgressPercentage: number,
  isFinished: boolean,
  lessons: EducationalCourseLessonType[],
}

export type EducationalCourseQuizType = {
  quizId: number,
  question: string,
  options: string[],
  correct: number,
  topic: string,
}

export type EducationalCourseType = {
  ownerId: string,
  courseId: number,
  courseName: string,
  category: string,
  duration: string,
  difficultyLevel: string,
  progressPercentage: number,
  description: string,
  isFinished: boolean,
  isLastAccessed: boolean,
  hasBeenStarted: boolean,
  whatWillLearn: string[],
  modules: EducationalCourseModuleType[],
  quiz: EducationalCourseQuizType[],
}