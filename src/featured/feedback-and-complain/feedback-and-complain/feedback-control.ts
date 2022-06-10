import { Validators } from "@angular/forms";

export var feedback = [
    {name:'id',defaultValue:null,validation:[]},
    {name:'complain_by',defaultValue:null,validation: [Validators.required]},
    {name:'email_address',defaultValue:null,validation:[Validators.required]},
    {name:'phone_number',defaultValue:null,validation: [Validators.required]},
    {name:'remark',defaultValue:null,validation:[Validators.required]},
    {name:'complain',defaultValue:null,validation: [Validators.required]},
    {name:'status',defaultValue:0,validation: [Validators.required]},
    {name:'description',defaultValue:null,validation: []},    
    ];