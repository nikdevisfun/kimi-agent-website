import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { websites, categories } from './data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3010;

app.use(cors());
app.use(express.json());

// 内存存储
let websitesData = [...websites];

// API 路由
// 获取所有分类
app.get('/api/categories', (req, res) => {
  res.json(categories);
});

// 获取所有网站
app.get('/api/websites', (req, res) => {
  const { category, search } = req.query;
  
  let result = websitesData;
  
  // 按分类筛选
  if (category && category !== 'all') {
    result = result.filter(w => w.category === category);
  }
  
  // 按关键词搜索
  if (search) {
    const keyword = search.toLowerCase();
    result = result.filter(w => 
      w.name.toLowerCase().includes(keyword) ||
      w.description.toLowerCase().includes(keyword) ||
      w.url.toLowerCase().includes(keyword)
    );
  }
  
  res.json(result);
});

// 获取单个网站
app.get('/api/websites/:id', (req, res) => {
  const website = websitesData.find(w => w.id === req.params.id);
  if (!website) {
    return res.status(404).json({ error: 'Website not found' });
  }
  res.json(website);
});

// 添加网站
app.post('/api/websites', (req, res) => {
  const { name, url, description, category } = req.body;
  
  if (!name || !url || !description || !category) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const newWebsite = {
    id: Date.now().toString(),
    name,
    url,
    description,
    category,
    createdAt: Date.now(),
  };
  
  websitesData.unshift(newWebsite);
  res.status(201).json(newWebsite);
});

// 更新网站
app.put('/api/websites/:id', (req, res) => {
  const { name, url, description, category } = req.body;
  const index = websitesData.findIndex(w => w.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Website not found' });
  }
  
  websitesData[index] = {
    ...websitesData[index],
    name: name || websitesData[index].name,
    url: url || websitesData[index].url,
    description: description || websitesData[index].description,
    category: category || websitesData[index].category,
  };
  
  res.json(websitesData[index]);
});

// 删除网站
app.delete('/api/websites/:id', (req, res) => {
  const index = websitesData.findIndex(w => w.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Website not found' });
  }
  
  const deleted = websitesData.splice(index, 1)[0];
  res.json(deleted);
});

// 获取分类统计
app.get('/api/stats', (req, res) => {
  const stats = {};
  categories.forEach(cat => {
    if (cat.id === 'all') {
      stats[cat.id] = websitesData.length;
    } else {
      stats[cat.id] = websitesData.filter(w => w.category === cat.id).length;
    }
  });
  res.json(stats);
});

// 重置数据（恢复初始100个网站）
app.post('/api/reset', (req, res) => {
  websitesData = [...websites];
  res.json({ message: 'Data reset successfully', count: websitesData.length });
});

// 静态文件服务
app.use(express.static(path.join(__dirname, '../dist')));

// 所有其他路由返回 index.html
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Loaded ${websitesData.length} websites`);
});
