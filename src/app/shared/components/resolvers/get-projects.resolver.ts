import { inject } from "@angular/core"
import { ProjectsService } from "../../services/projects.service"

export const getProjects = () => {
    const httpClient = inject(ProjectsService)
    return httpClient.getAll()
}