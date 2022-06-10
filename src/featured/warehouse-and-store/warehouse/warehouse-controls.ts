import { Validators } from "@angular/forms";
export var warehouse = [
    {name:'id',defaultValue:null,validation:[]},
    {name:'ware_house_name',defaultValue:null,validation: [Validators.required]},  
    // {name:'description',defaultValue:null,validation: []},
  
    {group: true, child:[
        {name:'id', defaultValue:null,validation: []},
        {name:'region', defaultValue:null,validation: [Validators.required]},
        {name:'city', defaultValue:null,validation: [Validators.required]},
        {name:'sub_city', defaultValue:null,validation: [Validators.required]},
        {name:'wereda', defaultValue:null,validation: [Validators.required]},
        {name:'location', defaultValue:null,validation: [Validators.required]},
        {name:'latitude', defaultValue:null,validation: []},
        {name:'longitude', defaultValue:null,validation: []}
    ],
    name:'address', defaultValue:null,validation: [Validators.required]},    
    ];