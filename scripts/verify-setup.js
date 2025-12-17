#!/usr/bin/env node

/**
 * Verification script to check if Supabase is properly configured
 * Run with: node scripts/verify-setup.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Supabase Setup...\n');

// Check .env.local file
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.error('❌ .env.local file not found!');
  console.log('💡 Create it with your Supabase URL and anon key\n');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};

envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    envVars[match[1].trim()] = match[2].trim();
  }
});

// Check for required variables
const requiredVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY'
];

let allGood = true;

requiredVars.forEach(varName => {
  if (!envVars[varName] || envVars[varName] === 'YOUR_ANON_KEY_HERE') {
    console.error(`❌ ${varName} is missing or not set`);
    allGood = false;
  } else {
    console.log(`✅ ${varName} is set`);
  }
});

if (allGood) {
  console.log('\n✅ All environment variables are configured!');
  console.log('💡 Next: Run the SQL setup script in Supabase SQL Editor');
  console.log('   File: setup-supabase.sql\n');
} else {
  console.log('\n❌ Please configure your .env.local file');
  console.log('   See QUICK_SETUP.md for instructions\n');
  process.exit(1);
}
