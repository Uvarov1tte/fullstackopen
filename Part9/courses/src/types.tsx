export interface CourseProp {
    course: CoursePart
}

export interface AllCoursesProp {
    courses: Array<CoursePart>
}
export interface CourseName {
    name: string
}

export interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

export interface CoursePartDescription extends CoursePartBase {
    description: string;
}

export interface CoursePartBasic extends CoursePartDescription {
    kind: "basic"
}

export interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
}

export interface CoursePartBackground extends CoursePartDescription {
    backgroundMaterial: string;
    kind: "background"
}
export interface CoursePartRequirement extends CoursePartDescription {
    requirements: string[];
    kind: "special"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartRequirement;