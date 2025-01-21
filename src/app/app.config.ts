import { ApplicationConfig } from "@angular/core";
import { routes } from "./app.routes";
import { provideRouter } from "@angular/router";
import { provideHttpClient } from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes), provideHttpClient(), provideAnimations(), provideAnimations(),]
  };