import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.dev';
import { of, Observable, from } from 'rxjs';
import { share, first, catchError } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(
		private http: HttpClient,
		private afAuth: AngularFireAuth) { }

	// regular firebase auth user - use something else
	getFbAuthState$ = () => this.afAuth.authState;

	getFBAuthToken$ = () => this.afAuth.idToken.pipe(first(), share());

	getFbUser = () => this.afAuth.auth.currentUser as firebase.User;

	getProToken$ = (creds: any): Observable<string> => {
		return this.http.post<string>(`${environment.proApiUrl}/authenticate`, creds)
			.pipe(first(), share()) as Observable<string>
	}

	getProTokenPromise$ = (creds: any): Promise<string> => {
		return this.http.post(`${environment.proApiUrl}/authenticate`, creds)
			.pipe(catchError(err => of(err)), share()).toPromise() as Promise<string>
	}

	getSecureRoute$ = () => {
		return this.http.get(`${environment.proApiUrl}/secure`)
			.pipe(share())
	}

	fbLoginWithEmailAndPassword$ = (email: string, password: string) =>
		from(this.afAuth.auth.signInWithEmailAndPassword(email, password))

	getUserAccess$ = (email: string, password: string): Observable<{ isAdmin: boolean, isPro: boolean }> => {
		const body = { email, password }
		return this.http.post<any>(`${environment.proApiUrl}/login`, body)
	}

	fbLoginWithCustomToken$ = (token: string): Observable<firebase.auth.UserCredential> => {
		return from(this.afAuth.auth.signInWithCustomToken(token))
	}

	logOut = (): Promise<void> => {
		return this.afAuth.auth.signOut()
	}
}
