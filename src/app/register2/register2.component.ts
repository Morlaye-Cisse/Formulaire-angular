import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from './User';


@Component({
  selector: 'app-register2',
  templateUrl: './register2.component.html',
  styleUrls: ['./register2.component.css']
})
export class Register2Component implements OnInit {
  public user: User = new User();

  public registerForm !: FormGroup

  constructor(private fb:FormBuilder){}
  
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName : ['', [Validators.required,Validators.minLength(4)]],
      lastName : ['', [Validators.required, Validators.maxLength(40)]],
      email : ['', [Validators.required, Validators.email]],
      phone : ['',Validators.required],
      notification : 'email',
      sendCatalog : true
    });
  }

  public saveData()
    {
      
    }
     
    public RemplirFormulair(){
      this.registerForm.patchValue({
        firstName : "Morlaye",
        lastName : "Cisse",
        email : "mor@g.com",
        sendCatalog : false
      })
    }

    public setNotificationSetting(method:String){
          const phoneControl =this.registerForm.get('phone');

          if(method === 'texte')
          {
            phoneControl?.setValidators(Validators.required);
          } else {
            phoneControl?.clearValidators();
          }

          phoneControl?.updateValueAndValidity();
    }
}
