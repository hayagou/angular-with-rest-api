import { ConfirmDialogComponent } from './../../component/common/confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from './../../component/common/alert-dialog/alert-dialog.component';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  alert(title: string, desc: string): MatDialogRef<AlertDialogComponent>{
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '300px',
      disableClose: true,
      data: {title: title, description: desc}
    });
    return dialogRef;
  }

  confirm(title:string, desc: string): MatDialogRef<ConfirmDialogComponent>{
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{
      width: '300px',
      disableClose: true,
      data: {title: title, description: desc}
    });
    return dialogRef;
  }
}

