import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.dev';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IAssignmentParams, IStoryParams, IStoryResponse } from '../core/models/story.model';

@Injectable({
	providedIn: 'root'
})

export class StoriesService {
	constructor(
		private http: HttpClient) {
	}

	getAssignments$(params: IAssignmentParams): Observable<any> {
		return this.http.get(`${environment.byrdApiUrl}/assignments`, { params: params as any })
			.pipe(catchError(err => of(err)), map(res => res.hits))
	}

	getStories$ = (params: IStoryParams): Observable<IStoryResponse> => {
		return this.http.get<IStoryResponse>(`${environment.byrdApiUrl}/stories`, { params: params as any })
			.pipe(catchError(err => of(err)), map(res => res.hits))
	}

	getUserStories$ = (uid: string, params: IStoryParams): Observable<IStoryResponse> => {
		return this.http.get<IStoryResponse>(`${environment.byrdApiUrl}/profiles/${uid}/uploads`, { params: params as any })
			.pipe(catchError(err => of(err)), map(res => res.hits))
	}

}
