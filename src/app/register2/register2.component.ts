import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from './User';


@Component({
  selector: 'app-register2',
  templateUrl: './register2.component.html',
  styleUrls: ['./register2.component.css']
})
export class Register2Component implements OnInit {
  public user: User = new User();

  public registerForm !: FormGroup

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName :new FormControl(),
      lastName : new FormControl(),
      email : new FormControl(),
      sendCatalog : new FormControl(true)
    });
  }

  public saveData()
    {
      
    }
     
}
