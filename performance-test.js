// Simple performance test script
// Run with: node performance-test.js

console.log('🚀 Starting Performance Test...\n');

const testUrls = [
  'http://localhost:4322/test-performance?mode=with-icons',
  'http://localhost:4322/test-performance?mode=no-icons'
];

console.log('📋 Test Instructions:');
console.log('1. Make sure dev server is running (npm run dev)');
console.log('2. Open these URLs in your browser:');
testUrls.forEach((url, index) => {
  console.log(`   ${index + 1}. ${url}`);
});
console.log('3. Check browser DevTools Console for metrics');
console.log('4. Compare the performance results\n');

console.log('💡 What to look for:');
console.log('- Total Load Time difference');
console.log('- First Paint and First Contentful Paint');
console.log('- Network tab bundle sizes');
console.log('- DOM Ready time');

console.log('\n📊 Manual Test Steps:');
console.log('1. Open browser DevTools (F12)');
console.log('2. Go to Network tab');
console.log('3. Visit first URL, note the metrics in console');
console.log('4. Clear Network tab');
console.log('5. Visit second URL, compare metrics');
console.log('6. Look for lucide-astro bundle size in Network tab');

console.log('\n⚡ Expected Results:');
console.log('- If icons slow down: no-icons version should be faster');
console.log('- If minimal impact: similar load times');
console.log('- Lucide bundle size should be visible in Network tab');