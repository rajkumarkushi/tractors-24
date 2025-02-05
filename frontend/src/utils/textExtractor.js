// src/utils/textExtractor.js
class TextExtractor {
    constructor() {
      // Set of tags to skip (elements that shouldn't be translated)
      this.skipTags = new Set(['SCRIPT', 'STYLE', 'CODE', 'PRE', 'TEXTAREA', 'INPUT']);
      
      // Attributes to check for translatable content
      this.translatableAttributes = ['placeholder', 'title', 'alt', ];
      
      // Bind methods to ensure proper 'this' context
      this.extractTextContent = this.extractTextContent.bind(this);
      this.applyTranslations = this.applyTranslations.bind(this);
    }
  
    extractTextContent(element) {
      const texts = new Map(); // Using Map to store unique text content with their paths
      
      const traverse = (node, path = '') => {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent.trim();
          if (text) {
            texts.set(text, path);
          }
        } else if (node.nodeType === Node.ELEMENT_NODE && !this.skipTags.has(node.tagName)) {
          // Check for translatable attributes
          this.translatableAttributes.forEach(attr => {
            if (node.hasAttribute(attr)) {
              const attrText = node.getAttribute(attr).trim();
              if (attrText) {
                texts.set(attrText, `${path}@${attr}`);
              }
            }
          });
  
          // Traverse children
          Array.from(node.children).forEach((child, index) => {
            traverse(child, `${path}/${index}`);
          });
        }
      };
  
      traverse(element);
      return texts;
    }
  
    applyTranslations(translations, element) {
      const applyToNode = (node, path = '') => {
        if (node.nodeType === Node.TEXT_NODE) {
          const originalText = node.textContent.trim();
          if (translations.has(originalText)) {
            node.textContent = node.textContent.replace(
              originalText, 
              translations.get(originalText)
            );
          }
        } else if (node.nodeType === Node.ELEMENT_NODE && !this.skipTags.has(node.tagName)) {
          // Apply translations to attributes
          this.translatableAttributes.forEach(attr => {
            if (node.hasAttribute(attr)) {
              const originalText = node.getAttribute(attr).trim();
              if (translations.has(originalText)) {
                node.setAttribute(attr, translations.get(originalText));
              }
            }
          });
  
          // Traverse children
          Array.from(node.children).forEach((child, index) => {
            applyToNode(child, `${path}/${index}`);
          });
        }
      };
  
      applyToNode(element);
    }
  }
  
  // Create and export a single instance
  export const textExtractor = new TextExtractor();