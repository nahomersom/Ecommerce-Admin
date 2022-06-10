import { Validators } from "@angular/forms";

export var inventory = [
    {name:'id',defaultValue:null,validation:[]},
    {name:'ware_house_id',defaultValue:null,validation: [Validators.required]},    
    {name:'store_id',defaultValue:null,validation:[Validators.required]},
    {name:'product_id',defaultValue:null,validation: [Validators.required]},
    {name:'quantity',defaultValue:null,validation: [Validators.required]}, 
    {name:'date',defaultValue:null,validation: [Validators.required]}, 
    {name:'inventory_status',defaultValue:null,validation: [Validators.required]}, 
    {name:'product_variant_id', defaultValue:null,validation: [Validators.required]},
    {name:'shelf_location', defaultValue:null,validation: [Validators.required]},
    ];
    