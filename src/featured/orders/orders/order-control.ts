import { Validators } from "@angular/forms";
export var order = [
    {
        group: true, child:[
        {name:'full_name', defaultValue:null,validation: [Validators.required]},
        {name:'phone_number', defaultValue:null,validation: [Validators.required]},

    ],
    name:'order_by', defaultValue:null,validation: [Validators.required]},  
    {name:'id',defaultValue:null,validation: []},
    {name:'payment_status',defaultValue:0,validation: [Validators.required]},
    {name:'payment_method',defaultValue:null,validation: [Validators.required]},
    {name:'delivery_time',defaultValue:null,validation: [Validators.required]},
    {name:'is_credit',defaultValue:null,validation: [Validators.required]},
    {name:'client_id',defaultValue:null,validation: [Validators.required]},//single select with filtering
    {
        group: true, child:[
        {name:'id', defaultValue:null,validation: []},
        {name:'region', defaultValue:null,validation: [Validators.required]},
        {name:'city', defaultValue:null,validation: [Validators.required]},
        {name:'sub_city', defaultValue:null,validation: [Validators.required]},
        {name:'wereda', defaultValue:null,validation: [Validators.required]},
        {name:'phone_number', defaultValue:null,validation: [Validators.required]},
        {name:'email_address', defaultValue:null,validation: [Validators.required,Validators.email]},
        {name:'latitude', defaultValue:null,validation: []},
        {name:'longitude', defaultValue:null,validation: []}
    ],
    name:'shipping_address', defaultValue:null,validation: [Validators.required]}, 
    {
        group: true, 
        child:[
        {name:'id', defaultValue:null,validation: []},
        {name:'product_item_id', defaultValue:null,validation: [Validators.required]},//multiselect with filtering
        {name:'unit_price', defaultValue:null,validation: [Validators.required]},
        {name:'quantity', defaultValue:null,validation: [Validators.required]},
    ],
    
    name:'detail', defaultValue:null,validation: [Validators.required]}, 
    {
        group: true, 
        child:[
        {name:'category', defaultValue:null,validation: [Validators.required]},//multiselect with filtering
        {name:'variant', defaultValue:null,validation: [Validators.required]},
    ],
    
    name:'product_detail', defaultValue:null,validation: [Validators.required]}, 

];