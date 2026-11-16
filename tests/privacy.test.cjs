const {test}=require('node:test'),assert=require('node:assert/strict');const P=require('../privacy-content.js');
test('policy is complete in both languages and matches actual providers and file access',()=>{
 for(const lang of ['uk','ru']){const html=P.content(lang);assert.equal((html.match(/<section>/g)||[]).length,9);for(const term of ['Supabase','Cloudflare','Google','jsDelivr','Print3D'])assert.ok(html.includes(term));assert.ok(!/заготовка|замінити своїм|заменить своим/.test(html));assert.ok(!html.includes('@example'));assert.ok(/посилання|ссылк/.test(html))}
});
