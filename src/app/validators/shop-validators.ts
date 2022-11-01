import { FormControl, ValidationErrors } from "@angular/forms";

export class ShopValidators {
    // whitespace validation
    static notOnlyWhitespace(control: FormControl): ValidationErrors {

        // check if only has white space
        if((control.value != null) && (control.value.trim().length === 0)) {
            return {'notOnlyWhitespace': true}; // this 'notOnlyWhitespace' 
            // is the validation error key the html template will check for
        } else {
            return null;
        }
    }
}
