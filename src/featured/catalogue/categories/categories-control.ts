import { Validators } from "@angular/forms";

export var categories = [
    {name:'id',defaultValue:null,validation:[]},
    {name:'area_id',defaultValue:null,validation: [Validators.required]},
    {name:'parent_category_id',defaultValue:null,validation:[]},
    {name:'category_name',defaultValue:null,validation: [Validators.required]},
    {name:'image',defaultValue:null,validation: [Validators.required]},
    {name:'description',defaultValue:null,validation: []},    
    {name:'type',defaultValue:null,validation: [Validators.required]},    
    {name:'accept_stockout_order',defaultValue:0,validation: [Validators.required]},
    ];