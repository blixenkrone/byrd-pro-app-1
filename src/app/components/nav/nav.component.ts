import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { IProUser } from 'src/app/core/models/user.model';

@Component({
	selector: 'app-nav',
	templateUrl: 'nav.component.html',
	styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {

	constructor(
		private authSrv: AuthService,
		private router: Router) { }

	@Input() user!: IProUser;
	@Input() isWait!: boolean;

	ngOnInit() { }

	homeBound() {
		this.router.navigate(['/bookings'])
	}

	openMenu() {
		console.log('a menu is supposed to appear here')
	}

	async logOut() {
		try {
			await this.authSrv.logOut()
			this.router.navigate(['/login']).then(() => window.location.reload())
		} catch (e) {
			alert(e)
		}
	}

}
