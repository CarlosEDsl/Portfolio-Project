import { Project } from "./projecttInterface";

export type ProductPayload = Omit<Project, 'id'>;