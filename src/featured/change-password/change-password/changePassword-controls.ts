import {Validators} from "@angular/forms";
export var changePassword = [
 {name:'old_password', defaultValue:null,validation: [Validators.required]},

 {name:'new_password', defaultValue:null,validation: [Validators.required]}
];