import { Validators } from "@angular/forms";
export var client = [
    {name:'id',defaultValue:null,validation:[]},
    
    {name:'credit_status',defaultValue:null,validation: [Validators.required]}, 
    {name:'payment_option',defaultValue:null,validation: [Validators.required]}, 
    {name:'interested_area',defaultValue:null,validation: [Validators.required]}, 
    {name:'total_credit_limit',defaultValue:null,validation: [Validators.required]}, 
    {name:'one_time_credit_limit',defaultValue:null,validation: [Validators.required]}, 
    {name:'tin_number',defaultValue:null,validation: [Validators.required]}, 
    {name:'image',defaultValue:null,validation: [Validators.required]}, 
    {group: true, child:[
        {name:'title', defaultValue:null,validation: [Validators.required]},
        {name:'file', defaultValue:null,validation: [Validators.required]},  
    ],
    name:'attachment', defaultValue:null,validation: [Validators.required]}, 
    {group: true, child:[
        {name:'id', defaultValue:null,validation: []},
        {name:'full_name',defaultValue:null,validation: [Validators.required]}, 
        {name:'email', defaultValue:null,validation: [Validators.required, Validators.email]},

        {name:'phone_number', defaultValue:null,validation: [Validators.required]},


    ],
    name:'account', defaultValue:null,validation: [Validators.required]}, 
    {group: true, child:[
        {name:'id', defaultValue:null,validation: []},

        {name:'region', defaultValue:null,validation: [Validators.required]},
        {name:'city', defaultValue:null,validation: [Validators.required]},
        {name:'sub_city', defaultValue:null,validation: [Validators.required]},
        {name:'wereda', defaultValue:null,validation: [Validators.required]},
        {name:'house_number', defaultValue:null,validation: [Validators.required]},
        {name:'location', defaultValue:null,validation: [Validators.required]},
        {name:'alternative_phone_number', defaultValue:null,validation: []},
        {name:'alternative_email_address', defaultValue:null,validation: [Validators.email]},

    ],
    name:'address', defaultValue:null,validation: [Validators.required]},    
    ];