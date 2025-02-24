import { Component } from '@angular/core';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TextareaModule } from 'primeng/textarea';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-contact-panel',
  imports: [SelectModule, ButtonModule, FormsModule, ReactiveFormsModule, FloatLabelModule, TextareaModule, CommonModule],
  templateUrl: './contact-panel.component.html',
  styleUrl: './contact-panel.component.css'
})
export class ContactPanelComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get name() {
    return this.contactForm.get('name');
  }

  get email() {
    return this.contactForm.get('email');
  }

  get message() {
    return this.contactForm.get('message');
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Dane wysłane:', this.contactForm.value);
      alert('Formularz został wysłany!');
      this.contactForm.reset();
    }
  }
}