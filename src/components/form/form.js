import JustValidate from 'just-validate';
import { closeModal } from '../popup/popup';
import { fadeIn, fadeOut } from '../fade/fade';

(() => {
  document.querySelectorAll('form').forEach(form => {
    const validateForm = new JustValidate(form, {
      validateBeforeSubmitting: true,
      errorLabelStyle: { color: "#D44444" },
      errorLabelCssClass: ['form__invalid'],
      errorFieldCssClass: ['form__error'],
      successFieldCssClass: ['form__success'],
      successLabelCssClass: ['form__valid']
      });
      let phoneValidate = form.querySelector('input[type="tel"]');
      let emailValidate = form.querySelector('input[type="email"]');
      let agreeValidate = form.querySelector('input[name="agree"]');
      if(agreeValidate) {
        agreeValidate.addEventListener('change', e => {
          if(!e.target.checked) {
            validateForm.addField('input[name="agree"]', [ { rule: 'required' } ]);
          }
        });
      }
      if(emailValidate) {
        validateForm.addField('input[type="email"]', [
          {rule: "required", errorMessage: "введите email"},
          {rule: "email", errorMessage: "не валидный email"}
        ]);
      }
      if(phoneValidate) {
        validateForm.addField('input[type="tel"]', [
          {rule: 'customRegexp', value: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/gi, errorMessage: "мин. 11 цифр"},
          {rule: "required", errorMessage: "введите телефон"},
          {rule: "minLength", value: 16, errorMessage: "мин. 11 цифр"} 
        ]);
      }
      validateForm.onValidate(onValidate => {
        if(!onValidate.isValid) {
          form.classList.add('form-error');
        } else {
          form.classList.remove('form-error');
        }
      });
      validateForm.onSuccess(function(e){
        const formSerialize = formElement => {
          const values = {};
          const inputs = formElement.elements;
      
          for(let i = 0; i < inputs.length; i++) {
            values[inputs[i].name] = inputs[i].value;
          }
          delete values[""];
          return values;
        };
        
        const data = JSON.stringify(formSerialize(e.target));
        const popup = document.querySelector(`.${e.target.className}`)?.closest('.popup');
        if(popup) { closeModal(popup.getAttribute('data-popup-target')); }
        setTimeout(()=> alert(`Данные формы: ${data}`), 1000);
      });
  });
  document.addEventListener('click', e => {
    if(e.target.closest('.js-leave-comment')) {
      const _self = e.target.closest('.js-leave-comment')
      const field = _self.previousElementSibling;
      fadeIn(field);
      fadeOut(_self);
    }
  });
})();