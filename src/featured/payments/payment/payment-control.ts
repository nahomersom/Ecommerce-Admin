import { Validators } from "@angular/forms";
export var payment = [
    {name:'id',defaultValue:null,validation:[]},
    {name:'payment_method',defaultValue:null,validation: [Validators.required]},
    {name:'paid_for',defaultValue:null,validation: [Validators.required]},
    {name:'amount_paid',defaultValue:null,validation: [Validators.required]},
    {name:'payer',defaultValue:null,validation: [Validators.required]},
    {name:'supplier',defaultValue:null,validation: [Validators.required]},
    {name:'client',defaultValue:null,validation: []},
    {name:'contract_id',defaultValue:null,validation: [Validators.required]},
    {name:'payment_receiver',defaultValue:null,validation: [Validators.required]},
    {name:'order_id',defaultValue:null,validation: [Validators.required]},
    {name:'amount_remaining',defaultValue:null,validation: [Validators.required]},
    {name:'payment_status',defaultValue:0,validation: [Validators.required]},
    {name:'image',defaultValue:null,validation: []},
    {name:'date',defaultValue:null,validation: [Validators.required]},  
    ];