// Скрипт для запуска тестов через Node.js

console.log('Starting tests with Node.js...');
console.log('Make sure the server is running before executing tests.');

const { execSync } = require('child_process');

try {
  // Выполняем тесты в той же директории
  console.log('Running tests...\n');
  execSync('node --experimental-vm-modules node_modules/mocha/bin/mocha.js tests/**/*.test.js --timeout 10000', { 
    stdio: 'inherit' 
  });
  
  console.log('\nTests completed successfully!');
} catch (error) {
  console.error('\nTest execution failed:', error.message);
  process.exit(1);
} 