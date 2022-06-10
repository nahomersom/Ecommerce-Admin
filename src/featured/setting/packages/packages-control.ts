import { Validators } from '@angular/forms';
export let packages = [
    {name: 'id', defaultValue: null, validation: []},
    {name: 'package_name', defaultValue: null, validation: [Validators.required]},
    {name: 'price', defaultValue: null, validation: [Validators.required]},
    {name: 'payment_type', defaultValue: null, validation: [Validators.required]},
    {name: 'max_ware_house', defaultValue: null, validation: [Validators.required]},
    {name: 'max_store', defaultValue: null, validation: [Validators.required]},
    {name: 'commission', defaultValue: null, validation: [Validators.required]},
    {name: 'max_category', defaultValue: null, validation: [Validators.required]},
    {name: 'max_user', defaultValue: null, validation: [Validators.required]},
    {name: 'group', defaultValue: null, validation: [Validators.required]},
    {name: 'is_featured', defaultValue: 0, validation: [Validators.required]},
    {name: 'status', defaultValue: 0, validation: [Validators.required]}, ,
    {name: 'description', defaultValue: null, validation: []},
    ];
