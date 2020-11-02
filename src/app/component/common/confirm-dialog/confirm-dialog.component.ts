import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  form: FormGroup;
  title: string;
  description: string;

  constructor(private fb : FormBuilder,
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) { 
      this.title = data.title;
      this.description = data.description;
    }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [this.title, []],
      description: [this.description, []]
    })
  }

  close(){
    this.dialogRef.close();
  }
}
