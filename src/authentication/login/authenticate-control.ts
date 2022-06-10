import { Validators } from "@angular/forms";

export var authenticate = [
    {name:'id', defaultValue:null,validation: []},
    {name:'email', defaultValue:null,validation: [Validators.required,Validators.email]},
    {name:'password', defaultValue:null,validation: [Validators.required]},
    {name:'remember',defaultValue:false}

]; 