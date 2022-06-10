import { Validators } from "@angular/forms";

export var contract = [
    {name:'id',defaultValue:null,validation:[]},
    {name:'contract_title',defaultValue:null,validation: [Validators.required]},
    {name:'supplier_id',defaultValue:null,validation: [Validators.required]},
    {name:'date',defaultValue:null,validation: [Validators.required]},
    {name:'deadline',defaultValue:null,validation: [Validators.required]},
    {name:'attachment',defaultValue:null,validation: [Validators.required]},
    {name:'package_id',defaultValue:null,validation: [Validators.required]}

   ];