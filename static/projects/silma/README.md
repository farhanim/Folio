# SILMA — Static Clickable Prototype

A copy of the SILMA `manage_asset` app that runs without a backend. It is one `index.html` that uses the original CSS, JS and images (`dist/`, `assets/`, `plugins/`, `css/`, `js/`, `img/`, copied from `public/`).

## Run

Double-click `index.html`, or open it through XAMPP at `http://localhost/silmav3/silma-prototype/`.
The login form is already filled in. Click **LOGIN**. You land on the **Dashboard**, which shows asset KPIs, a summary of requests per service, asset condition, your pending tasks and recent activity.

## Demo accounts (password: `password`)

| Role        | Email                         |
|-------------|-------------------------------|
| Super Admin | superadmin@kemdikbud.go.id    |
| Admin       | admin@kemdikbud.go.id         |
| User Plus   | userplus@kemdikbud.go.id      |
| User        | user@kemdikbud.go.id          |

You can switch role at any time from the user menu (top right): **Ganti Peran (Demo)**.

## Walking a workflow end to end

1. **User Plus**: Rencana Pengadaan → Buat Pengajuan
2. **Super Admin**: open the request → Tunjuk Admin → pick *Rina Kartika Sari*
3. **Admin**: Proses → Terima (or Tolak)
4. **Super Admin**: Terima Penerimaan → Selesai

Pengadaan, Peminjaman, Perpindahan, KIB, PSP, Wasdal, Penghapusan and Stock Opname work the same way: the Super Admin creates or assigns, the Admin processes.

## Notes

- Data is dummy data. It is saved in the browser's `localStorage`. Use **Reset Data Demo** in the user menu to start over.
- PDF and DOC exports, labels and DBR open as printable pages in a new tab.
- The QR or barcode camera is simulated. Click a sample code in the scan dialog.
- Fonts and icon fonts load from Google Fonts or a CDN, so you need an internet connection for exact typography.
