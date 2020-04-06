import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { of, Observable, BehaviorSubject, Subject, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { IMediaUser } from 'src/app/core/models/user.model';

// File Blob properties and file Blob to AWS */
export interface MediaFile {
	name: string;
	date: Date | number;
	fileSize: number;
	ext: string;
	file: File;
}

export interface MediaBooking {
	// * file: Blob in request #2
	headline: string;
	photographerUID: string;
	mediaUID: string;
}

export interface MediaBookingResponse {
	status: number;
	error?: { msg: string };
	data?: {
		mediaUploadHash: string;
	}
}

@Injectable({
	providedIn: 'root'
})
export class BookingService {

	private filesSubj$ = new BehaviorSubject<MediaFile[]>([])
	files$ = this.filesSubj$.asObservable()

	constructor(private http: HttpClient) { }

	setFiles(files: MediaFile[]) {
		this.filesSubj$.next(files)
	}

	/** Use this method to clear files from the files subject */
	clearFiles() {
		this.filesSubj$.next([])
	}

	/**
	 * @param booking 1st request => returns a {media_data_hash} for reference in uploadFiles req.
	 */
	initBooking(booking: MediaBooking): Observable<MediaBookingResponse> {
		return this.http.post<MediaBookingResponse>(`${environment.byrdApiUrl}/booking/initmedia`, booking)
	}

	/**
	 * @param files are files
	 * @param mediaId is returned from @func initBooking()
	 */
	uploadFiles(files: MediaFile[], mediaId: string) {
		// { status: number, error?: string }
		const formData = new FormData()
		for (const f of files) {
			formData.append('file', f.file)
		}
		const req = new HttpRequest('POST', `${environment.byrdApiUrl}/booking/upload/${mediaId}`, formData, {
			reportProgress: true,
		});
		return this.http.request(req)
		// return this.http.post<HttpEvent<any>>(`${environment.byrdApiUrl}/booking/upload/${mediaId}`, formData, { reportProgress: true });
	}

	getMediasAvailable$ = (): Observable<IMediaUser[]> => {
		return this.http.get<IMediaUser[]>(`${environment.byrdApiUrl}/booking/get_media`)
	}

}
