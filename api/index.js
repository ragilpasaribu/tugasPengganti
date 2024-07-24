/* eslint-disable prettier/prettier */
import express from 'express';
import { koneksi } from '../database.js';

const app = express();

app.use(express.json());

app.get('/produk', async (req, res) => {
    const hasil = await koneksi.query('SELECT * from transaksi');
    res.json(hasil);
});

app.post('/produk', async (req, res) => {
    await koneksi.execute(
        'INSERT INTO produk (nama_produk, deskripsi, harga, stok) VALUES (?, ?, ?, ?)',
        [
            req.body.nama_produk,
            req.body.deskripsi,
            req.body.harga,
            req.body.stok
        ]
    );
    res.send('Produk Berhasil Ditambahkan');
});

app.post('/pembeli', async (req, res) => {
    await koneksi.execute(
        'INSERT INTO pembeli (nama_pembeli,email_pembeli,no_telepon,alamat_pembeli) VALUES (?, ?, ?, ?)',
        [
            req.body.nama_pembeli,
            req.body.email_pembeli,
            req.body.no_telepon,
            req.body.alamat_pembeli
        ]
    );
    res.send('Pembeli Berhasil Ditambahkan');
});

app.post('/transaksi', async (req, res) => {
    await koneksi.execute(
        'INSERT INTO transaksi (id_pembeli,id_produk,jumlah,tanggal) VALUES (?, ?, ?, ?)',
        [
            req.body.id_pembeli,
            req.body.id_produk,
            req.body.jumlah,
            req.body.tanggal
        ]
    );
    res.send('Transaksi Berhasil Ditambahkan');
});


app.put('/produk/:id_produk',async (req,res)=>{
    await koneksi.execute('UPDATE produk set nama_produk=?, deskripsi=?, harga=?, stok=? where id_produk=?',[
        req.body.nama_produk,
        req.body.deskripsi,
        req.body.harga,
        req.body.stok,
        req.params.id_produk,
    ]);
    res.send('produk berhasil diupdate');
});

app.put('/pembeli/:id_pembeli',async (req,res)=>{
    await koneksi.execute('UPDATE pembeli set nama_pembeli=?, email_pembeli=?, no_telepon=?, alamat_pembeli=? where id_pembeli=?',[
        req.body.nama_pembeli,
        req.body.email_pembeli,
        req.body.no_telepon,
        req.body.alamat_pembeli,
        req.params.id_pembeli,
    ]);
    res.send('pembeli berhasil diupdate');
});


app.put('/transaksi/:id_transaksi',async (req,res)=>{
    await koneksi.execute('UPDATE transaksi set id_pembeli=?, id_produk=?, jumlah=?, tanggal=? where id_pembeli=?',[
        req.body.id_pembeli,
        req.body.id_produk,
        req.body.jumlah,
        req.body.tanggal,
        req.params.id_pembeli,
    ]);
    res.send('transaksi berhasil diupdate');
});


app.delete('/produk/:id_produk',async(req,res)=>{
    await koneksi.execute('DELETE from produk where id_produk=?',[req.params.id_produk]);
    res.send('Product berhasil di hapus');
});

app.delete('/pembeli/:id_pembeli',async(req,res)=>{
    await koneksi.execute('DELETE from pembeli where id_pembeli=?',[req.params.id_pembeli]);
    res.send('Pembeli berhasil di hapus');
});

app.delete('/transaksi/:id_transaksi',async(req,res)=>{
    await koneksi.execute('DELETE from transaksi where id_transaksi=?',[req.params.id_transaksi]);
    res.send('Transaksi berhasil di hapus');
});

app.listen(3000, () => console.log('Server berhasil dijalankan di port 3000'));
