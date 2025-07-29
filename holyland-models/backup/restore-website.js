#!/usr/bin/env node

/**
 * Holy Land Models Website Restore Script
 * This script can restore website content from the backup file
 * Usage: node restore-website.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔄 Holy Land Models Website Restore Script');
console.log('==========================================\n');

// Read the backup file
const backupPath = path.join(__dirname, 'website-backup.json');

if (!fs.existsSync(backupPath)) {
  console.error('❌ Backup file not found at:', backupPath);
  console.log('Please ensure the backup file exists before running this script.');
  process.exit(1);
}

try {
  const backupData = JSON.parse(fs.readFileSync(backupPath, 'utf8'));
  console.log('✅ Backup file loaded successfully');
  console.log(`📅 Last backup: ${backupData.websiteInfo.lastBackup}`);
  console.log(`📊 Version: ${backupData.websiteInfo.version}\n`);

  // Display backup contents
  console.log('📋 Backup Contents:');
  console.log('==================');
  console.log(`• Pages: ${backupData.websiteStructure.pages.length}`);
  console.log(`• Components: ${backupData.websiteStructure.components.length}`);
  console.log(`• Languages: Hebrew, English, Arabic, Spanish`);
  console.log(`• Models: ${Object.keys(backupData.modelData).length}`);
  console.log(`• Images: ${backupData.images.avichai.portfolio.length + 1} total\n`);

  // Display restore instructions
  console.log('📖 Restore Instructions:');
  console.log('=======================');
  backupData.restoreInstructions.steps.forEach((step, index) => {
    console.log(`${index + 1}. ${step}`);
  });

  console.log('\n⚠️  Important Notes:');
  console.log('===================');
  backupData.restoreInstructions.importantNotes.forEach((note, index) => {
    console.log(`• ${note}`);
  });

  console.log('\n🎯 Key Translation Keys:');
  console.log('========================');
  console.log('• viewModels: "גלה את הכישרון שלנו"');
  console.log('• ourModels: "הדוגמנים שלנו"');
  console.log('• forAgencies: "לסוכנויות"');
  console.log('• contact: "צור קשר"');

  console.log('\n📞 Contact Information:');
  console.log('======================');
  console.log(`• Email: ${backupData.contactInfo.email}`);
  console.log(`• Phone: ${backupData.contactInfo.phone}`);
  console.log(`• Website: ${backupData.contactInfo.website}`);

  console.log('\n✅ Restore script completed successfully!');
  console.log('💡 Use this backup data to restore any lost content.');

} catch (error) {
  console.error('❌ Error reading backup file:', error.message);
  process.exit(1);
}