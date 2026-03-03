module.exports = {
  apps: [
    {
      name: 'kimi-agent-website',
      script: 'server/prod.js',
      // 根据机器 CPU 自动选择进程数；如果只想单进程，改为 1
      instances: 1,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3010,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3010,
      },
      watch: false,
      max_memory_restart: '512M',
      time: true,
    },
  ],
};

