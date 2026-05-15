import fs from 'fs';
import path from 'path';

const baseUrl = 'https://ui.taohq.org';

function getVueFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(getVueFiles(file));
    } else if (file.endsWith('.vue')) {
      results.push(file);
    }
  });
  return results;
}

const pagesDir = path.resolve(process.cwd(), 'pages');
const publicDir = path.resolve(process.cwd(), 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const files = getVueFiles(pagesDir);
const urls = [];

files.forEach(file => {
  let relativePath = path.relative(pagesDir, file).replace(/\\/g, '/');
  
  // Remove .vue extension
  relativePath = relativePath.replace(/\.vue$/, '');
  
  // Handle index.vue
  if (relativePath.endsWith('index')) {
    relativePath = relativePath.replace(/index$/, '');
  }
  
  // Ensure trailing slash or clean url
  if (relativePath.length > 0 && !relativePath.endsWith('/')) {
    relativePath += '/';
  }

  // Handle dynamic routes (skip or format them if needed, here we skip simple [id] for static sitemap)
  if (relativePath.includes('[')) return;

  urls.push(`${baseUrl}/${relativePath}`);
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url === baseUrl + '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
console.log('✅ Generated sitemap.xml');
