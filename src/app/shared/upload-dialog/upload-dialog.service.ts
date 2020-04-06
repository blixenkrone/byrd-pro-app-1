import { Injectable } from '@angular/core';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ComponentType } from '@angular/cdk/portal';

export interface DialogData {
    isLoading: boolean;
    status?: number;
    progress?: number;
    error?: string | null;
}

@Injectable({ providedIn: 'root' })
export class DialogService {

    dialogCfg: MatDialogConfig = {
        autoFocus: false,
        disableClose: true,
        panelClass: 'dialog-class', // ? does not work
        width: '30rem',
        height: '26rem',
    }

    private _dialogDataSubj$ = new Subject<DialogData>();
    dialogData$ = this._dialogDataSubj$.asObservable()

    constructor(private matDialog: MatDialog) { }

    public setDialogData(data: DialogData) {
        this._dialogDataSubj$.next(data)
    }

    public openDialog(component: ComponentType<any>, data: DialogData, opts?: MatDialogConfig) {
        if (opts) { this.dialogCfg = opts }
        if (data) this.setDialogData(data)
        return this.matDialog.open(component, { ...this.dialogCfg })
    }

    public close() {
        this.matDialog.closeAll()
    }
}
