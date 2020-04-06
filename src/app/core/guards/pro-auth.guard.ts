import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, forkJoin, race, zip } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { take, map, tap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';

@Injectable({ providedIn: 'root' })
export class ProAuthGuard implements CanActivate {
	constructor(private authSrv: AuthService, private prfSrv: UserService, private router: Router) { }
	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
		Observable<boolean> | Promise<boolean> | boolean {
		const isFBAuthState$ = this.authSrv.getFbAuthState$().pipe(
			take(1),
			map(authState => !!authState),
			tap((loggedIn) => {
				return !loggedIn ? this.router.navigate(['/login']) : true;
			})
		)
		const isPro$ = this.prfSrv.getUserByTokenHeader$().pipe(
			take(1),
			map(pro => !!pro.isProfessional),
			tap((isPro) => !isPro ? this.router.navigate(['/login']) : true)
		)

		return race(isFBAuthState$, isPro$).pipe(
			map((val) => {
				if (!!val) {
					return true;
				}
				return false;
			}),
			// tap(res => console.log(res))
		)

	}
}
