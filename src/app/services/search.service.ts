import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, take, mergeMap, map, filter, tap, share } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { IMediaUser, IProfileRequest } from '../models/user.model';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private afAuth: AngularFireAuth,
    private http: HttpClient) { }

  fakeData(query: string) {
    console.log('Searching for: ', query)
    return this.http.get('https://jsonplaceholder.typicode.com/todos')
      .pipe(catchError(err => of(null)))
  }

  getToken() {
    return this.afAuth.idToken.pipe(map(token => token ? token : null))
  }

  searchProfiles(params: IProfileRequest): Observable<IMediaUser[]> {
    return this.getToken().pipe(mergeMap(token => {
      return this.http.get<IMediaUser[]>(`${environment.byrdApiUrl}/profiles/pro`, { params: params as any })
        .pipe(map((res: any) => res.hits), share())
    }))
  }


}
