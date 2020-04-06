import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProTokenInterceptor, LoadInterceptor } from './http-interceptor';

export enum HttpCodes {
	Unauthorized = 401,
	Success = 200,
	NotFound = 404,
}

/* "Barrel" of Http Interceptors */
/** Http interceptor providers in outside-in order */
export const httpTokenInterceptor = [
	{
		provide: HTTP_INTERCEPTORS,
		useClass: ProTokenInterceptor,
		multi: true
	},
	{
		provide: HTTP_INTERCEPTORS,
		useClass: LoadInterceptor,
		multi: true
	},
]
