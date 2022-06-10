import { Validators } from "@angular/forms";

export var variant = [
    {name:'id',defaultValue:null,validation:[]},
    {name:'value',defaultValue:null,validation: [Validators.required]},
    {name:'input_type',defaultValue:null,validation: [Validators.required]},
    ];