import { Validators } from "@angular/forms";

export var bank = [
    {name:'id',defaultValue:null,validation:[]},
    {name:'bank_name',defaultValue:null,validation: [Validators.required]},
    {name:'account_no',defaultValue:null,validation: [Validators.required]},
    {name:'branch',defaultValue:null,validation: [Validators.required]},
    ];