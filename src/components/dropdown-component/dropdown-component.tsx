import { Component, Host, h, State, Prop, Element, Event, EventEmitter, Listen } from '@stencil/core';
import ChevronUp from '../../assets/chevron_up.svg';
import ChevronDown from '../../assets/chevron_down.svg';

@Component({
  tag: 'dropdown-component',
  styleUrl: 'dropdown-component.scss',
  shadow: false,
})

export class DropdownComponent {
  @Element() el: HTMLElement;
  @Prop({
    mutable: true
  }) placeholder: string = '';

  buttonEl: HTMLButtonElement;
  
  @State() placeholderText: string = this.placeholder;
  @State() placeholderValue: string = 'initial';
  @State() open: boolean = false;

  @State() options: any[] = [
    { text: '<= 200 000 km', value: '<= 200000 km' },
    { text: '> 200 000 km', value: '> 200000 km' },
  ];

  @Event() selected: EventEmitter<string>;

  openDropdown = () => {
    this.open = !this.open;
  };

  closeDropdown = () => {
    this.open = false;
  };

  handleOnChange = (event) => {
    const placeHolder = this.el.querySelector('.dropdown-placeholder__text');
    const dropdown = this.el.querySelector('.dropdown');
    const clearButton = this.el.querySelector('.dropdown-clear');
    
    if(placeHolder.textContent !== 'Selected distance') {
      dropdown.classList.add('dropdown--selected');
      placeHolder.classList.add('dropdown-placeholder__text--selected');
      clearButton.classList.add('dropdown-clear--changed');
    }

    this.placeholderText = event.target && event.target.value;
    this.placeholderValue = event.target && event.target.value;
    this.closeDropdown();
    this.selected.emit(this.placeholderValue);
  };

  renderIdPrefix = () => {
    return 'choise-made-'; 
  }

  @Listen("click", { target: "window" })
  handleWindowClick(event: MouseEvent) {
    if (!event.composedPath().includes(this.el)) {
      this.open = false;
    }
  }
  
  resetValues = () => {
    this.placeholderValue = 'initial';
    this.placeholderText = this.placeholder;
    this.closeDropdown();
    const placeHolder = this.el.querySelector('.dropdown-placeholder__text');
    const dropdown = this.el.querySelector('.dropdown');
    const clearButton = this.el.querySelector('.dropdown-clear');

    clearButton.classList.remove('dropdown-clear--changed');
    placeHolder.classList.remove('dropdown-placeholder__text--selected');
    dropdown.classList.remove('dropdown--selected');

    const selectedOption = document.querySelector('input[type=radio]') as HTMLInputElement;
    if (selectedOption && selectedOption.checked === true) {
      selectedOption.checked = false;
    }
    this.selected.emit(this.placeholderValue);
  };

  render() {
    return (
      <Host>
        <div class="dropdown-wrapper">
        <div class="dropdown">
          <button
            onClick={this.openDropdown}
            value={this.placeholderValue}
            class={'dropdown-container ' + (this.open ? 'dropdown-container--open' : '')}
          >
            <span class="dropdown-placeholder__text">{this.placeholderText}</span>
            
            { 
              this.open ?
              <span class='dropdown-arrow' innerHTML={ChevronUp} />
              : <span class='dropdown-arrow' innerHTML={ChevronDown} />
            }
          </button>
          <ul class={"dropdown-values " + (this.open ? 'dropdown-values--open' : '')}>
            {this.options.map((item, index) => (
              <slot>
                <li class="dropdown-values__item">
                  <input
                    type="radio"
                    id={this.renderIdPrefix() + index}
                    name="list-radio"
                    value={item.value}
                    onChange={this.handleOnChange}
                  />
                  <label htmlFor={this.renderIdPrefix() + index}>{item.text}</label>
                </li>
              </slot>
            ))}
          </ul>
        </div>    
          <button ref={(el: HTMLButtonElement) => this.buttonEl = el as HTMLButtonElement}
                  class="dropdown-clear " onClick={this.resetValues}>Reset
          </button>
        </div>
      </Host>
    );
  }

}
