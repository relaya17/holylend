# Holy Land Models - Website Backup System

## 📁 Backup Files

### `website-backup.json`
קובץ גיבוי מלא המכיל את כל התוכן החשוב של האתר:
- תרגומים לכל השפות (עברית, אנגלית, ערבית, ספרדית)
- נתוני דוגמנים
- מבנה האתר
- פרטי קשר
- נתיבי תמונות

### `restore-website.js`
סקריפט שחזור אוטומטי שמציג את תוכן הגיבוי ומספק הוראות שחזור.

## 🔄 How to Use

### Viewing Backup Contents
```bash
cd backup
node restore-website.js
```

### Manual Restore Process
1. **העתק את קובץ הגיבוי** למיקום בטוח
2. **אם תוכן האתר נמחק**, השתמש בקובץ הגיבוי לשחזור התרגומים
3. **עדכן את אובייקטי התרגום** בכל קובץ קומפוננטה
4. **בנה מחדש את הפרויקט** באמצעות `pnpm build`
5. **בדוק את כל הדפים** כדי לוודא שהתוכן שוחזר נכון

## 🎯 Key Changes Made

### Button Text Update
- **Before**: "צפה בדוגמנים שלנו" (View Our Models)
- **After**: "גלה את הכישרון שלנו" (Discover Our Talent)

### Backup System Features
- ✅ גיבוי מלא של כל התרגומים
- ✅ נתוני דוגמנים
- ✅ מבנה האתר
- ✅ פרטי קשר
- ✅ הוראות שחזור

## 📋 Important Translation Keys

| Key | Hebrew | English |
|-----|--------|---------|
| `viewModels` | גלה את הכישרון שלנו | Discover Our Talent |
| `ourModels` | הדוגמנים שלנו | Our Models |
| `forAgencies` | לסוכנויות | For Agencies |
| `contact` | צור קשר | Contact |

## 🚨 Emergency Restore

If website content is accidentally deleted:

1. **Run the restore script**:
   ```bash
   cd backup
   node restore-website.js
   ```

2. **Copy translations** from the backup file to the appropriate component files

3. **Rebuild the project**:
   ```bash
   pnpm build
   ```

4. **Test the website** to ensure everything is restored correctly

## 📞 Contact Information

- **Email**: info@holyland-models.com
- **Phone**: +972-XX-XXXXXXX
- **Website**: https://holyland-models.com

## 🔄 Backup Maintenance

- **Update backup** when making significant changes to translations
- **Keep backup file** in a safe location
- **Test restore process** periodically
- **Document any new translations** added to the website

---

**Last Updated**: 2024-01-20  
**Version**: 1.0.0  
**Backup Type**: Full Website Backup