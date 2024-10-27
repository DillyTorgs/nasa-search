import { LitElement, html, css } from "lit";


export class NasaImage extends LitElement {

  constructor() {
    super();
    this.title = 'Untitled';
    this.source = '';
    this.alt ='';
    this.owner = 'Unknown Owner';
  }

  static get properties() {
    return {
        source: { type: String },
        title: { type: String },
        alt: { type: String },
        owner: { type: String }
    };
  }

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
      border-color: var(--ddd-theme-default-nittanyNavy);
      box-shadow: var(--ddd-boxShadow-xl);
      border-radius: var(--ddd-spacing-3);
      text-decoration: none;
      margin-bottom: var(--ddd-spacing-2);
      margin-top: var(--ddd-spacing-2);
      background-color: var(--ddd-theme-default-limestoneLight);
    }
    .card:hover{
      background-color: var(--ddd-theme-default-keystoneYellow);
    }

    .card:focus{
      background-color: var(--ddd-theme-default-opportunityGreen);
      outline: none;
    }

    .title, .owner
    {
      text-decoration: none;
      text-align: center;
      font-size: var(--ddd-spacing-3);
      color: var(--ddd-theme-default-beaverBlue);

    }

    .title{
      font-weight: bold;
    }

    
    `];
  }

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
  static get tag() {
    return "nasa-image";
  }
}
customElements.define(NasaImage.tag, NasaImage);