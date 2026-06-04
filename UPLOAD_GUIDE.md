# 📤 Panduan Upload ke GitHub

## Langkah-langkah Upload

### 1. Inisialisasi Git Repository

Buka terminal/command prompt di folder project, lalu jalankan:

```bash
git init
```

### 2. Tambahkan Semua File

```bash
git add .
```

### 3. Commit Pertama

```bash
git commit -m "Initial commit: Semarang Smart City website"
```

### 4. Buat Repository Baru di GitHub

1. Buka https://github.com
2. Login ke akun kamu
3. Klik tombol **"New"** atau **"+"** → **"New repository"**
4. Isi nama repository: `semarang-smart-city`
5. Pilih **Public** atau **Private**
6. **JANGAN** centang "Initialize with README" (karena sudah ada README.md)
7. Klik **"Create repository"**

### 5. Hubungkan dengan Remote Repository

Ganti `<username>` dengan username GitHub kamu:

```bash
git remote add origin https://github.com/<username>/semarang-smart-city.git
```

### 6. Push ke GitHub

```bash
git branch -M main
git push -u origin main
```

## ✅ File yang Akan Di-upload

- ✅ `src/` - Source code
- ✅ `assets/` - Gambar dan media
- ✅ `index.html`
- ✅ `package.json`
- ✅ `vite.config.js`
- ✅ `README.md`
- ✅ `.gitignore`

## ❌ File yang TIDAK Di-upload (Otomatis Diabaikan)

- ❌ `node_modules/` - Dependencies (terlalu besar ~200MB+)
- ❌ `package-lock.json` - Auto-generated file
- ❌ `dist/` - Build output
- ❌ `.vscode/` - IDE settings

## 📝 Catatan Penting

1. **`node_modules/` tidak akan di-upload** karena sudah ada di `.gitignore`
2. Orang yang clone repository harus menjalankan `npm install` untuk download dependencies
3. File `.gitignore` sudah dikonfigurasi untuk mengecualikan file-file besar

## 🔄 Update Repository (Setelah Ada Perubahan)

```bash
git add .
git commit -m "Deskripsi perubahan"
git push
```

## 💡 Tips

- Ukuran repository akan sekitar **5-10 MB** (tanpa node_modules)
- GitHub Free bisa upload file maksimal **100 MB per file**
- Repository private unlimited untuk GitHub Free
