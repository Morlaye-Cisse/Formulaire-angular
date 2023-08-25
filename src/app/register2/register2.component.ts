import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { User } from './User';

//creation de validdateur personnaliger sans parametre
// function ratingRangerValidator(c:AbstractControl):{ [key: string]:boolean} | null{
//      //contion pour returner une erreur 
//      if(c.value !== null && (isNaN(c.value) || (c.value < 1 || c.value > 5))){
//         return {"rangeError": true}
//      }

//      return null;
// }
//creation de validdateur personnaliger avec parametre
function ratingRangerValidator(min: number,max:number){
  return (c:AbstractControl):{ [key: string]:boolean} | null => {
    //condition pour returner une erreur 
    if(c.value !== null && (isNaN(c.value) || (c.value < min || c.value > max))){
       return {"rangeError": true}
    }
    return null;
  };
} 

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
      rating: [null,ratingRangerValidator(1,5)],
      notification : 'email',
      sendCatalog : true
    });

  }

  public saveData()
    {
      
    }
     
    public RemplirFormulair(){
      //remplire les champ par defaut
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
