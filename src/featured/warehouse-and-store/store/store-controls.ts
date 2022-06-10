import { Validators } from "@angular/forms";

export var store = [
    {name:'id',defaultValue:null,validation:[]},
    {name:'store_name',defaultValue:null,validation: [Validators.required]},    
 
    {name:'product_category_id',defaultValue:null,validation: [Validators.required]},
    {name:'store_keeper_name',defaultValue:null,validation:[Validators.required]},
    {name:'ware_house_id',defaultValue:null,validation: [Validators.required]}, 
    {name:'status',defaultValue:0,validation: [Validators.required]}, 
    ];