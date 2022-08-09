import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  AbstractControl,
  FormControl,
  Validators,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';

/**
 * TODO
 * 1. Add
 * 2. Delete
 * 3. Edit
 * 4. Validation
 * 5. Dynamic Validation
 */
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  contactForm: FormGroup;

  defaultNicknames = ['Nickname 1', 'Nickname 2'];
  defaultAddress = [
    {
      street: 'Rustam Bagh',
      city: 'Bangalore',
    },
    {
      street: 'Athaloor',
      city: 'Malappuram',
    },
  ];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      nicknames: this.fb.array([]),
      gender: [],
      nri: [],
      state: [''],
      address: this.fb.array([]),
    });

    console.log(this.contactForm);
  }

  ngOnInit() {
    this.setNicknames();
    this.setAddress();
  }

  setNicknames(): void {
    this.defaultNicknames.forEach((item) => {
      this.nicknames.push(this.fb.control(item));
    });
  }

  setAddress(): void {
    this.defaultAddress.forEach((item) => {
      this.address.push(this.createAddressFormGroup(item));
    });
  }

  get nicknames(): FormArray<FormControl> {
    return this.contactForm.controls.nicknames as FormArray<FormControl>;
  }

  addNicknames(): void {
    this.nicknames.push(this.fb.control('Nick'));
  }

  removeNicknames(index: number): void {
    this.nicknames.removeAt(index);
  }

  get address(): FormArray<FormGroup> {
    return this.contactForm.controls.address as FormArray<FormGroup>;
  }

  createAddressFormGroup(
    { street, city } = { street: '', city: '' }
  ): FormGroup {
    return this.fb.group(
      {
        street,
        city: [city, [Validators.minLength(2)]],
      },
      { validators: [addressValidation] }
    );
  }

  addAddress(): void {
    this.address.push(this.createAddressFormGroup());
  }

  removeAddress(index: number): void {
    this.address.removeAt(index);
  }
}

function addressValidation(controlGroup: FormGroup): ValidationErrors | null {
  const {
    controls: { street, city },
  } = controlGroup;

  if (street.value || city.value) {
    return null;
  }

  return { error: 'street or city should have some value' };
}
