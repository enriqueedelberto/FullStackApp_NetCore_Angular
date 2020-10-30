import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ShowMessagesService {

  constructor(private snackBar: MatSnackBar) { }

  showMessage(message: string, action: string) {
    this.snackBar.open(message.toUpperCase(), action, {
      duration: 12000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });

  }
}
