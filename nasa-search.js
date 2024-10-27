import { LitElement, html, css } from 'lit';
import { DDDSuper } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import "./nasa-image.js";
// Define the NasaSearch class extending LitElement
export class NasaSearch extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      loading: { type: Boolean, reflect: true },
      items: { type: Array },
      value: { type: String }
    };
  }
    // Define styles for the component
  static get styles() {
    return css`
      :host {
        display: block;
        background-color: var(--ddd-theme-default-limestoneLight);
        padding: var(--ddd-spacing-4);
      }

      .search-container {
        margin-bottom: var(--ddd-spacing-6);
      }

      details {
        background-color: var(--ddd-theme-default-skyBlue);
        border-radius: var(--ddd-radius-md);
        padding: var(--ddd-spacing-3);
        margin-bottom: var(--ddd-spacing-4);
      }

      summary {
        font-family: var(--ddd-font-primary);
        font-size: var(--ddd-font-size-4xl);
        color: var(--ddd-theme-default-shrineBlue);
        padding: var(--ddd-spacing-2);
        cursor: pointer;
      }

      input {
        width: 100%;
        font-family: var(--ddd-font-secondary);
        font-size: var(--ddd-font-size-xl);
        padding: var(--ddd-spacing-3);
        border: 2px solid var(--ddd-theme-default-navy40);
        border-radius: var(--ddd-radius-sm);
        background-color: var(--ddd-theme-default-white);
      }

      input:focus {
        outline: none;
        border-color: var(--ddd-theme-default-keystoneYellow);
        box-shadow: var(--ddd-boxShadow-sm);
      }

      .results {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: var(--ddd-spacing-4);
        padding: var(--ddd-spacing-2);
      }

      :host([loading]) .results {
        opacity: 0.3;
        transition: opacity 0.3s ease;
      }

      h2 {
        font-family: var(--ddd-font-primary);
        color: var(--ddd-theme-default-nittanyNavy);
        text-align: center;
        margin: var(--ddd-spacing-4) 0;
        font-size: var(--ddd-font-size-3xl);
      }
    `;
  }
  // Constructor to initialize properties
  constructor() {
    super();
    this.initializeProperties();
  }
   // Method to set initial property values
  initializeProperties() {
    this.value = null;
    this.title = '';
    this.loading = false;
    this.items = [];
  }
   // Render method to define the component's HTML structure
  render() {
    return html`
      <div class="search-container">
        <h2>${this.title}</h2>
        <details open>
          <summary>Explore NASA Images</summary>
          <input 
            id="input" 
            placeholder="Search space, planets, and other stuff..." 
            @input="${this.handleInput}"
          />
        </details>
      </div>

      <div class="results">
        ${this.renderSearchResults()}
      </div>
    `;
  }

  renderSearchResults() {
    return this.items.map(item => html`
      <a href="${item.links[0].href}" target="_blank" tabindex="0">
        <nasa-image
          source="${item.links[0].href}"
          title="${item.data[0].title}"
          alt="${item.data[0].description}"
          owner="${item.data[0].secondary_creator || 'NASA'}"
        ></nasa-image>
      </a>
    `);
  }

  handleInput(e) {
    this.value = e.target.value;
  }

  updated(changedProperties) {
    if (changedProperties.has('value')) {
      this.handleValueUpdate();
    }
  }

  handleValueUpdate() {
    if (this.value) {
      this.fetchNASAImages(this.value);
    } else {
      this.items = [];
    }
  }

  async fetchNASAImages(searchTerm) {
    this.loading = true;
    try {
      const response = await fetch(
        `https://images-api.nasa.gov/search?media_type=image&q=${searchTerm}`
      );
      const data = await response.json();
      if (data.collection) {
        this.items = data.collection.items;
      }
    } catch (error) {
      console.error('Error fetching NASA images:', error);
    } finally {
      this.loading = false;
    }
  }

  static get tag() {
    return 'nasa-search';
  }
}

customElements.define(NasaSearch.tag, NasaSearch);