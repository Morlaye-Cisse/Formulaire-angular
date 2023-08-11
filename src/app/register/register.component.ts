import { Component, OnInit } from '@angular/core';
import { User } from './User';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user: User = new User();

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
  public saveData(registerForm: NgForm){
    console.log(registerForm.form);
    console.log(JSON.stringify(registerForm.form.value));
    
    
  }

}
