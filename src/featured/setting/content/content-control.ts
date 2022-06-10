import { Validators } from '@angular/forms';
export let content = [
    {name: 'id', defaultValue: null, validation: []},
    {name: 'content_type', defaultValue: null, validation: [Validators.required]},
    {name: 'image_type', defaultValue: null, validation: [Validators.required]},
    {name: 'image_text', defaultValue: null, validation: [Validators.required]},
    {name: 'content_title', defaultValue: null, validation: [Validators.required]},
    {name: 'content_body', defaultValue: null, validation: [Validators.required]},
    {name: 'image', defaultValue: null, validation: [Validators.required]},
    {name: 'status', defaultValue: 0, validation: [Validators.required]},

    ];
