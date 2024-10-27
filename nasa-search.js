import { LitElement, html, css } from 'lit';
import { DDDSuper } from "@lrnwebcomponents/d-d-d/d-d-d.js";


import "./nasa-image.js";
export class NasaSearch extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      loading: { type: Boolean, reflect: true },
      items: { type: Array, },
      value: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        
      }
      :host([loading]) .results {
        opacity: 0.1;
        visibility: hidden;
        height: var(--ddd-ls-72-lg);
      }
      .results {
        visibility: visible;
        height: 100%;
        opacity: 1;
        transition-delay: .5s;
        transition: .5s all ease-in-out;
        display:flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
       
        

      }

      details {
        margin: var(--ddd-spacing-4);
        padding: var(--ddd-spacing-4);
        background-color: var(--ddd-theme-default-nittanyNavy);
        border-radius: var(--ddd-spacing-2);
      }
      summary {
        font-size: var(--ddd-spacing-6);
        padding: var(--ddd-spacing-2);
        color: var(--ddd-theme-default-pughBlue);
        font-size: var(--ddd-spacing-10);
        text-align: center;
        font-family: var(--ddd-font-secondary);
        
      }
      input {
        font-size: var( --ddd-spacing-5);
        line-height: var(--ddd-spacing-10);
        width: 100%;
        border-radius: var(--ddd-spacing-2);
        padding-left: var(--ddd-spacing-2);
        
      }

      
    `;
  }

  constructor() {
    super();
    this.value = null;
    this.title = '';
    this.loading = false;
    this.items = [];
  }

  render() {
    return html`
    <h2>${this.title}</h2>

    <details open>
      <summary>NASA Images</summary>
      <div>
        <input id="input" placeholder="Space and Stuff" @input="${this.inputChanged}" />
      </div>
    </details>
    
    <div class="results">
      
  
    
      ${this.items.map((item, index) => html`
        <a href="${item.links[0].href}" target="_blank" tabindex="0">
        

      <nasa-image
        source="${item.links[0].href}"
        title="${item.data[0].title}"
        alt="${item.data[0].description}"
        owner="${item.data[0].secondary_creator}"

      ></nasa-image>
      </a>
      `)}
    </div>
    `;
  }

  inputChanged(e) {
    this.value = this.shadowRoot.querySelector('#input').value;
  }
  // life cycle will run when anything defined in `properties` is modified
  updated(changedProperties) {
    // see if value changes from user input and is not empty
    if (changedProperties.has('value') && this.value) {
      this.updateResults(this.value);
    }
    else if (changedProperties.has('value') && !this.value) {
      this.items = [];
    }
    // @debugging purposes only
    if (changedProperties.has('items') && this.items.length > 0) {
      console.log(this.items);
    }
  }

  updateResults(value) {
    this.loading = true;
    fetch(`https://images-api.nasa.gov/search?media_type=image&q=${value}`).then(d => d.ok ? d.json(): {}).then(data => {
      if (data.collection) {
        this.items = [];
        this.items = data.collection.items;
        this.loading = false;
      }  
    });
  }

  static get tag() {
    return 'nasa-search';
  }
}
customElements.define(NasaSearch.tag, NasaSearch);