import { LitElement, html, css } from "lit";


export class NasaImage extends LitElement {
 // Define NasaImage component that extends LitElement to create a custom NASA image card element
  constructor() {
    super();
    this.title = 'Untitled';
    this.source = '';
    this.alt ='';
    this.owner = 'Unknown Owner';
  }
    // Define the properties that can be set on the element, all as String types
  static get properties() {
    return {
        source: { type: String },
        title: { type: String },
        alt: { type: String },
        owner: { type: String }
    };
  }
  // Define the CSS styles for the component using Lit's css template literal
  static get styles() {
    return [css`
    

    .image {
      
      width: var(--ddd-font-size-type1-m);
      height: var(--ddd-font-size-type1-m);
      padding-left: var(--ddd-spacing-4);
      margin-left:var(--ddd-spacing-7);
      margin-top: var(--ddd-spacing-2);
      
        

    }

    .card {
      display: inline-block;
      width: 240px;
      height: 240px;
      border: var(--ddd-border-sm);
      border-color: var(--ddd-theme-default-);
      box-shadow: var(--ddd-boxShadow-xl);
      border-radius: var(--ddd-spacing-3);
      text-decoration: none;
      margin-bottom: var(--ddd-spacing-2);
      margin-top: var(--ddd-spacing-2);
      background-color: var(--ddd-theme-default-limestoneLight);
    }
    // Define hover and focus states for interactive feedback
    .card:hover{
      background-color: var(--ddd-theme-default-skyMaxLight);
    }

    .card:focus{
      background-color: var(--ddd-theme-default-globalNeon);
      outline: none;
    }

    .title, .owner
    {
      text-decoration: none;
      text-align: center;
      font-size: var(--ddd-spacing-3);
      color: var(--ddd-theme-default-navy70);

    }

    .title{
      font-weight: bold;
    }

    
    `];
  }
   // Define the HTML template for the component using Lit's html template literal
  render() {
    return html`
    <div class="card" tabindex="0">
        <img class="image" src="${this.source}" alt="${this.alt}"/>
        <br>
        <div class="title">${this.title}</div>
        <div class="owner">${this.owner}</div>
    
    </div>
    `;
  }
  // Define the custom element tag name
  static get tag() {
    return "nasa-image";
  }
}
customElements.define(NasaImage.tag, NasaImage);