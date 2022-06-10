import { Validators } from "@angular/forms";

export var variantOption = [
    {name:'id',defaultValue:null,validation:[]},
    {name:'variant_id',defaultValue:null,validation: [Validators.required]},
    {name:'option_value',defaultValue:null,validation: [Validators.required]},
    ];