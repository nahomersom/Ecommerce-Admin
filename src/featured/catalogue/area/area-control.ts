import { Validators } from "@angular/forms";

export var area = [
    {name:'id',defaultValue:null,validation:[]},
    {name:'area_name',defaultValue:null,validation: [Validators.required]},
    {name:'image',defaultValue:null,validation: [Validators.required]},
    {name:'description',defaultValue:null,validation: []},    
  //  {name:'accept_stockout_order',defaultValue:0,validation: [Validators.required]},
    ];