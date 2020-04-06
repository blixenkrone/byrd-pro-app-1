import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.dev';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SingleMailPrefs } from '../models/mail.model';
import { catchError, retry } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class MailService {

	constructor(
		private http: HttpClient) { }

	getToken() {
		this.http.post(`${environment.proApiUrl}/mail/send`, { displayName: 'blix' })
	}

	sendMail(body: SingleMailPrefs) {
		const mail$ = this.http.post(`${environment.proApiUrl}/mail/send`, body, { withCredentials: true })
			.pipe(catchError(err => of(err)), retry(2))
		return mail$;
	}

}
