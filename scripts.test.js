import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

describe('Voltar Inicio Button', () => {
  let dom;
  let window;
  let document;

  beforeEach(() => {
    const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');
    dom = new JSDOM(html);
    window = dom.window;
    document = window.document;

    const script = document.createElement('script');
    script.textContent = `
      document.getElementById("voltar-inicio").addEventListener("click", function() {
        window.location.href = 'index.html'; 
      });
    `;
    document.body.appendChild(script);
  });
});
