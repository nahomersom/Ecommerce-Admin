import { Validators } from '@angular/forms';
export let supplier = [
    {name: 'id', defaultValue: null, validation: []},
    {name: 'company_name', defaultValue: null, validation: [Validators.required]},
    {name: 'tin_number', defaultValue: null, validation: [Validators.required]},
    {name: 'license_number', defaultValue: null, validation: [Validators.required]},
    {name: 'product_category_id', defaultValue: null, validation: [Validators.required]},
    {name: 'product_area_id', defaultValue: null, validation: [Validators.required]},
    {name: 'description', defaultValue: null, validation: []},

    {name: 'image', defaultValue: null, validation: [Validators.required]},
    {group: true, child: [
        {name: 'id', defaultValue: null, validation: []},
        {name: 'full_name', defaultValue: null, validation: [Validators.required]},
        {name: 'email', defaultValue: null, validation: [Validators.required, Validators.email]},
        {name: 'phone_number', defaultValue: null, validation: [Validators.required]},
        {name: 'status', defaultValue: 1, validation: [Validators.required]},
        {name: 'group_id', defaultValue: null, validation: [Validators.required]},
    ],
    name: 'account', defaultValue: null, validation: [Validators.required]},
    {group: true, child: [
        {name: 'id', defaultValue: null, validation: []},
        {name: 'alternative_email_address', defaultValue: null, validation: [Validators.email]},
        {name: 'alternative_phone_number', defaultValue: null, validation: []},
        {name: 'location', defaultValue: null, validation: [Validators.required]},
        {name: 'region', defaultValue: null, validation: [Validators.required]},
        {name: 'city', defaultValue: null, validation: [Validators.required]},
        {name: 'sub_city', defaultValue: null, validation: [Validators.required]},
        {name: 'wereda', defaultValue: null, validation: [Validators.required]},
        // {name:'post', defaultValue:null,validation: []},
    ],
    name: 'address', defaultValue: null, validation: [Validators.required]},
    {group: true, child: [
        {name: 'id', defaultValue: null, validation: []},
        {name: 'contact_person_name', defaultValue: null, validation: [Validators.required]},
        {name: 'email_address', defaultValue: null, validation: [Validators.required, Validators.email]},
        {name: 'phone_number', defaultValue: null, validation: [Validators.required]},
        {name: 'house_number', defaultValue: null, validation: []},
        {name: 'alternative_phone_number', defaultValue: null, validation: []},
        {name: 'region', defaultValue: null, validation: [Validators.required]},
        {name: 'city', defaultValue: null, validation: [Validators.required]},
        {name: 'sub_city', defaultValue: null, validation: [Validators.required]},
        {name: 'wereda', defaultValue: null, validation: [Validators.required]},

    ],
    name: 'contact_person_address', defaultValue: null, validation: [Validators.required]},
    {group: true, child: [
        {name: 'title', defaultValue: null, validation: [Validators.required]},
        {name: 'file', defaultValue: null, validation: [Validators.required]},


    ],
    name: 'attachmentContent', defaultValue: null, validation: [Validators.required]},

    ];


