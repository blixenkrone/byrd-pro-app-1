import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, combineLatest } from 'rxjs';
import { share, delay, mergeAll } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LoaderService {
    // * From HTTP calls in http-interceptor.ts
    private isHTTPSubj$ = new BehaviorSubject<boolean>(false);
    isHTTP$ = this.isHTTPSubj$.asObservable()

    // * User clicked emissions
    private isClickedSubj$ = new Subject<boolean>();
    isClicked$ = this.isClickedSubj$.asObservable() // ! should be this one in the future, not the static false below

    // ? Implement timeout() also
    isWait$: Observable<boolean> = combineLatest(this.isClicked$, this.isHTTP$).pipe(
        mergeAll(),
        delay(200),
        share(),
    )

    // for async loading bar progress
    private progressSubj$ = new BehaviorSubject<number>(0);
    progress$ = this.progressSubj$.asObservable()

    constructor() { }

    setHttpLoading = (val: boolean) => this.isHTTPSubj$.next(val)
    setClicked = (val: boolean) => this.isClickedSubj$.next(val)
    setProgress = (val: number) => this.progressSubj$.next(val)

    setGlobalLoading(val: boolean) {
        this.isHTTPSubj$.next(val)
        this.isClickedSubj$.next(val)
    }
}
