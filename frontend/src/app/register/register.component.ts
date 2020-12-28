import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userEmail: string;
  password: string;
  confirmPassword: string;

  constructor() { }

  ngOnInit(): void {
  }

}
