import { Validators } from "@angular/forms";
export var systemUser = [
    {name:'id',defaultValue:null,validation:[]},
    {name:'full_name',defaultValue:null,validation: [Validators.required]},  
    {name:'group_id',defaultValue:null,validation: [Validators.required]}, 
 
    {name:'status',defaultValue:0,validation: [Validators.required]}, 
    {name:'email', defaultValue:null,validation: [Validators.required,Validators.email]},
    {name:'phone_number', defaultValue:null,validation: [Validators.required]},
    {group: true, child:[
        {name:'id', defaultValue:null,validation: []},

        {name:'location', defaultValue:null,validation: []},
        {name:'region', defaultValue:null,validation: [Validators.required]},
        {name:'city', defaultValue:null,validation: [Validators.required]},
        {name:'sub_city', defaultValue:null,validation: [Validators.required]},
        {name:'wereda', defaultValue:null,validation: [Validators.required]},

    ],
    name:'address', defaultValue:null,validation: [Validators.required]},    
    ];