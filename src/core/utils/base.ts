import { C, T } from '@angular/cdk/keycodes';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { SecurityService } from '@core/security/security.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CrudOperationService } from './crud-operation.service';
export class Base {
  parentList: any;
  areaList: any;
  productList: any;
  productItemList: any;
  supplierList: any;
  planList: any;
  contractList: any;
  groupList: any;
  warehouseList: any;
  storeList: any;
  paymentOptionList: any;
  parentCategoryList: { [key: string]: Object }[];
  variantList: any;
  productByCategoryList: any;
  public lookup_data: any = {};
  variants: any;
  variantOption: any;
  categoryId: any;
  constructor(
    public service: CrudOperationService

  ) {
  }
  public getControl(formGroup: FormGroup, name: any): FormControl {
    return formGroup.get(name) as FormControl;
  }
  createControls(data: any[]): FormGroup {
    const formGroup = new FormGroup({});

    data.forEach(ele => {
      if (ele.group) {
        const FG = new FormGroup({});

        ele.child.forEach(chi => {
          FG.setControl(chi.name, new FormControl(chi.defaultValue, chi.validation));
        });

        formGroup.setControl(ele.name, FG);

      }
      else if (ele.is_array) {
        formGroup.setControl(ele.name, new FormArray([], ele.validation));

      }
      else {
        formGroup.setControl(ele.name, new FormControl(ele.defaultValue, ele.validation));

      }
    });

    return formGroup;

  }

  clearFileInput(ctrl) {
    try {
      ctrl.value = null;
    } catch (ex) { }
    if (ctrl.value) {
      ctrl.parentNode.replaceChild(ctrl.cloneNode(true), ctrl);
    }
  }
  convert_from_base64(compo, files, name, img = true, formControlName = null, formGroupName = 'formGroup') {
    // name == 'productImage' ? compo[name + 'Array']  : compo[name + 'Array'] = [];
    files = Array.isArray(files) ? files : [files];
    
    files.forEach((file, index) => {
      const extension = file.name.split('.').pop();

      compo.selected = !compo.selected;
      const reader = new FileReader();

      reader.readAsDataURL(img ? file.rawFile : file);

      reader.onload = (_event) => {

        if (compo[name + 'Array']) {
          compo[name + 'Array'].push(reader.result);
        }

        compo[name] = reader.result;

        compo[name + '_url'] = reader.result + ',' + extension;

        compo[name + 'Array' + 'Url']?.push(reader.result + ',' + extension);
        compo[formGroupName].get(formControlName ?? name)?.setValue(compo[name + '_url']);

        if (compo[name + 'Array' + 'Url']) {

          compo[formGroupName].get(formControlName ?? name).setValue(compo[name + 'Array' + 'Url']);
        }
      };

    });

    compo['uploader'].filesData = [];
  }

   load_lookup(payload, reset_key = null, control: FormControl = null, actual_value = null, objectName = null) {
    this.lookup_data[reset_key] = [];
    payload.project_type = 'ecommerce';
    this.service.post(payload, 'Util/Lookup/filter',true).subscribe((res: any) => {
      if (res.statusCode === 200) {

        this.lookup_data[objectName ?? payload.lookup_type] = res.data;
        control ? control.setValue(actual_value) : null;        
      
      }
    });
  }

  
  load_region() {
    const payload = { lookup_type: 'region'};
    this.load_lookup(payload, 'city');
  }

 
  
  load_city(value, actual_value, fg: FormGroup, name,defaultName = 'city', reset_key = 'sub_city') {
    const payload = { parent_id: value, lookup_type: 'city' };
    const control: any = fg.get(name);
    this.load_lookup(payload, reset_key, control, actual_value,defaultName);
 
  }


  load_sub_city(value, actual_value, fg: FormGroup, name,defaultName = 'sub_city', reset_key = 'sub_city') {
    const payload = { parent_id: value, lookup_type: 'sub_city' };
    const control: any = fg.get(name);

    this.load_lookup(payload, reset_key, control, actual_value, defaultName);
  }

  load_parent() {
    this.service.list('catalogue/category/load_parent').subscribe((res: any) => {
      this.parentCategoryList = res.data;

    });
  }
  variant_option() {
    this.service.list('variant/item/load_variant').subscribe((res: any) => {
      this.variantOption = res.data;
      console.log(this.variantOption);

    });
  }
  load_area(data = [], fg: FormGroup = null) {
    this.service.list('catalogue/area/load_area').subscribe((res: any) => {
      this.areaList = res.data;
      if (fg !== null) {
        fg.get('interested_area').setValue(data);

      }
    });
  }
  load_category() {
    this.service.list('catalogue/category/load_category').subscribe((res: any) => {
      this.productList = res.data;

    });
  }
  load_supplier() {
    this.service.list('users/supplier/load_supplier').subscribe((res: any) => {
      this.supplierList = res.data;
    });
  }
  load_group(payload) {
    this.service.post(payload, 'users/group/load_group').subscribe((res: any) => {
      this.groupList = res.data;

    });


}
  load_plan() {
    this.service.list('util/package/load_package').subscribe((res: any) => {
      this.planList = res.data;

    });
  }
  load_contract(supplierId=null) {
    if(supplierId){
      this.service.list('contract/contractItem/load_contract/'+supplierId).subscribe((res: any) => {
        this.contractList = res.data;
  
      });
    }else{ 
      this.service.list('contract/contractItem/load_contract/').subscribe((res: any) => {
        this.contractList = res.data;
  
      });
    }
 
  }
  load_warehouse(supplierId=null) {
  console.log('hi'+supplierId)
    this.service.list('market/warehouse/load_warehouse/'+supplierId).subscribe((res: any) => {
      this.warehouseList = res.data;

    });
  }
  load_store(warehouse_id, store_id = null, formGroupName: FormGroup = null) {
    this.service.list('market/store/load_store/' + warehouse_id).subscribe((res: any) => {
      this.storeList = res.data;

      formGroupName.get('store_id').setValue(store_id);


    });
  }
  load_product(e = null, supplier_id = null) {
  
    this.service.post({ keyword: e.text, supplier_id }, 'catalogue/product/load_product_for_inventory').subscribe((res: any) => {
      console.log(res.data)
      e.updateData(res.data);
    });
  }
  load_variant_option(payload) {
    this.service.post(payload, 'variant/option/load_variant_option_for_product').subscribe((res: any) => {
      this.variantList = res.data;

    });
  }

  load_product_by_category(categoryId) {
    this.service.list('catalogue/product/load_product_by_category_for_order/' + categoryId).subscribe((res: any) => {
      this.categoryId = categoryId;
      this.productByCategoryList = res.data;

    });
  }
  search_product(e = null) {

    this.service.post({ keyword: e.text , product_category_id:this.categoryId , limit: 10}, 'catalogue/product/search_products_for_order').subscribe((res: any) => {
      e.updateData(res.data);

    });
  }
  filter_client(e = null) {
    this.service.post({ keyword: e.text, limit: 10 }, 'users/client/load_client')
    .subscribe((res: any) => {
      e.updateData(res.data);

    });
  }
  filter_order_no(e = null, supplier_id = null) {
    this.service.post({ keyword: e.text, supplier_id, limit: 10 }, 'catalogue/order/load_order_for_payment').subscribe((res: any) => {
      e.updateData(res.data);

    });
  }
}


