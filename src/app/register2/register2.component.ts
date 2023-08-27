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

//fonction de gestion de la validation croisee
function emailMatcher(c:AbstractControl):{ [key: string]:boolean} | null {

  const emailControl = c.get('email');
  const emaiConfirmControl= c.get('confirmEmailId');

  //verifier que rien n'est saissie
  if(emailControl?.pristine || emaiConfirmControl?.pristine){
    return null;
  }
  //verifier que les deux email correspond
  if(emailControl?.value === emaiConfirmControl?.value){
    return null;
  }

  return {'match' : true};
}


@Component({
  selector: 'app-register2',
  templateUrl: './register2.component.html',
  styleUrls: ['./register2.component.css']
})
export class Register2Component implements OnInit {
  public user: User = new User();

  public registerForm !: FormGroup

  public errorMsg!:string;

  private validationErrorsMessages ={
    required : 'Entrez votre E-Mail',
    email : 'L\'E-Mail n\'est pas valide'
  }

  constructor(private fb:FormBuilder){}
  
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName : ['', [Validators.required,Validators.minLength(4)]],
      lastName : ['', [Validators.required, Validators.maxLength(40)]],
      emailGroup : this.fb.group({
      email : ['', [Validators.required, Validators.email]],
      confirmEmailId : ['', [Validators.required, Validators.email]]
      }, { validators : emailMatcher}),
      phone : ['',Validators.required],
      rating: [null,ratingRangerValidator(1,5)],
      notification : 'email',
      sendCatalog : true
    });

    this.registerForm.get("notification")?.valueChanges.subscribe(v =>{
       this.setNotificationSetting(v)
    });
    //recuperer l'email
    const emailControl = this.registerForm.get("emailGroup.email");
    emailControl?.valueChanges.subscribe(value =>{
      this.setMessage(emailControl);
    })

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

    private setMessage(val: AbstractControl){
      this.errorMsg='';

      if((val.touched || val.dirty) && val.errors){
        console.log(Object.keys(val.errors));
        this.errorMsg = Object.keys(val.errors).map(
          (key) =>{
            if(key=='email')
                return this.validationErrorsMessages.email;
            else
                return this.validationErrorsMessages.required;
          }
        ).join(' ');
      }
      console.log(this.errorMsg);
    }
}
