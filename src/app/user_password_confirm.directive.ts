/*
@user_password_confirm.directive.ts
Custom password validation
The userPasswordConfirm class is implements the Angular Validator interface
So we need to import the Validator form "@angualr/forms"
In the Angular, When we create a directive
We need to decorate the directive
We create selector as attribute apply to the field we want to use
*/
import { Validator, NG_VALIDATORS, AbstractControl } from "@angular/forms";
import { Directive, Input } from "@angular/core";

@Directive({
    selector: '[pwdValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: userPasswordConfirm,
        multi: true
    }]
})

export class userPasswordConfirm implements Validator{
    // Use the input field to pass the value that we want to compare
    @Input() pwdValidator: string;
    validate(control: AbstractControl): {[key:string]: any} | null{
        // To find the parent element form then get the the password element
        const controlToCompare = control.parent.get(this.pwdValidator); 
        if(controlToCompare && controlToCompare.value !== control.value){
            // The return type is {[key:string]: any | null}
            // Return the key to the template component to get the error type
            return { 'notEqual':true };
        }
        // Then add this module into root module
        return null;
    }
}