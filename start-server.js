const fs = require('fs');
const path = require('path');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('✅ Created uploads directory');
}

console.log('🚀 Starting HRMS Backend Server...');
console.log('📖 Swagger UI will be available at: http://localhost:5000/api-docs');
console.log('📁 File uploads will be stored in: ./uploads');
console.log('');

// Start the server using npm
const { spawn } = require('child_process');
const server = spawn('npm', ['run', 'start:dev'], { 
  stdio: 'inherit',
  shell: true 
});

server.on('error', (error) => {
  console.error('❌ Failed to start server:', error.message);
  console.log('');
  console.log('💡 Make sure you have installed dependencies:');
  console.log('   npm install');
  console.log('');
  console.log('💡 Make sure your database is running and configured');
});

process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  server.kill('SIGINT');
  process.exit(0);
}); 