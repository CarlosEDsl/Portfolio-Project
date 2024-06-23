import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { ProjectsService } from "../../services/projects.service";

export const getProject = (route: ActivatedRouteSnapshot) => {
    const projectService = inject(ProjectsService);
    return projectService.get(route.paramMap.get('id') as string);
  }