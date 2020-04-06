import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';


// TODO: If service worker is enabled, force updates and check for cached HTTP requests (that will fail new req's)
@Injectable({ providedIn: 'root' })
export class UpdateService {
	constructor(
		// private snackBar: MatSnackBar,
		// private sw: SwUpdate
	) {

		// this.sw.available.subscribe(swEvt => {
		// 	window.location.reload()
		// 	this.snackBar.open(`App was updated: ${swEvt.available.hash}`)
		// 	// const snack = this.snackBar.open('A new version is available.', 'Reload')
		// 	// snack
		// 	// 	.onAction()
		// 	// 	.subscribe(() => {
		// 	// 		window.location.reload()
		// 	// 		this.snackBar.open(`App was updated: ${swEvt.available.hash}`)
		// 	// 	})
		// })

		// if (!this.sw.isEnabled) {
		// 	console.log('No service worker')
		// }
	}
}
