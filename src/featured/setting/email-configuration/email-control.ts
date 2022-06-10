import { Validators } from '@angular/forms';
export let email = [
    {name: 'id', defaultValue: null, validation: []},
    {group: true, child: [
        {name: 'protocol', defaultValue: null, validation: [Validators.required]},
        {name: 'host', defaultValue: null, validation: [Validators.required]},
        {name: 'port', defaultValue: null, validation: [Validators.required]},
        {name: 'email', defaultValue: null, validation: [Validators.required, Validators.email]},
        {name: 'password', defaultValue: null, validation: [Validators.required]},
        // {name:'status',defaultValue:null,validation:[Validators.required]},

    ],
    name: 'email_config', defaultValue: null, validation: [Validators.required]},
    {name: 'about_us', defaultValue: null, validation: [Validators.required]},
    {name: 'contact_us', defaultValue: null, validation: [Validators.required]},
    {name: 'privacy_policy', defaultValue: null, validation: [Validators.required]},
    {name: 'term_condition', defaultValue: null, validation: [Validators.required]},
    {name: 'tax', defaultValue: null, validation: [Validators.required]},
    {name: 'max_cart_deadline', defaultValue: null, validation: [Validators.required]},
    {name: 'max_credit_payment_date', defaultValue: null, validation: [Validators.required]},
    {name: 'accept_stockout_order', defaultValue: 0, validation: [Validators.required]},
    {name: 'key', defaultValue: null, validation: []},
    { is_array: true, name: 'lang_keys', defaultValue: [], validation: [Validators.required]},
   ];
