import { Validators } from "@angular/forms";
export var product = [
    {name:'id',defaultValue:null,validation:[]},
    {name:'title',defaultValue:null,validation: [Validators.required]},   
    { name:'product_category_id',defaultValue:null,validation: [Validators.required]}, 
    { name:'min_order',defaultValue:null,validation: [Validators.required]}, 
    { name:'measurment_unit', defaultValue:null,validation: [Validators.required]},
    {name:'has_variant',defaultValue:true,validation: [Validators.required]},
    {name:'accept_stockout_order',defaultValue:0,validation: [Validators.required]},
    
    { name:'model', defaultValue:null,validation: [Validators.required]},
    { name:'brand', defaultValue:null,validation: [Validators.required]},
    { name:'color', defaultValue:null,validation: [Validators.required]},
    {name:'thumbnail',defaultValue:null,validation: [Validators.required]},
    { name:'price', defaultValue:null,validation: []},
    {name:'image',defaultValue:null,validation: [Validators.required]},

    {
        group: true, child:[
        {name:'attribute', defaultValue:null,validation: [Validators.required]},
        {name:'value', defaultValue:null,validation: [Validators.required]},

    ],
    name:'attributes', defaultValue:null,validation: [Validators.required]},  

    {
        group: true, child:[
        {name:'id',defaultValue:null,validation:[]},
        {name:'product_id',defaultValue:null,validation:[]},
        {name:'price', defaultValue:null,validation: [Validators.required]},
        {name:'variant', defaultValue:null,validation: [Validators.required]},
       

    ],
    name:'detail', defaultValue:null,validation: [Validators.required]},  
    { name:'status',defaultValue:0}, 
    { name:'description', defaultValue:null,validation: [Validators.required]},    
];