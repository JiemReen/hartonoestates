'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function DetailProperti() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('https://6873e6cac75558e2735597fd.mockapi.io/properties/13')
      .then(res => res.json())
      .then(json => setData(json));
  }, []);

  if (!data) return <div style={{ padding: '2rem' }}>Loading...</div>;

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '1000px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Title dan Lokasi */}
      <h1 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{data.title}</h1>
      <p style={{ color: '#666' }}>{data.location}</p>
      <p style={{ fontSize: '0.9rem', color: '#999', marginBottom: '1rem' }}>
        Listing ID: #{data.id}
      </p>

      {/* Harga dan Label */}
      <h2 style={{ color: '#d32f2f', fontSize: '1.6rem' }}>
        Harga Rp {parseInt(data.price).toLocaleString('id-ID')}
      </h2>
      <div style={{ margin: '1rem 0' }}>
        <span style={{
          background: '#d4edda',
          color: '#155724',
          padding: '4px 10px',
          marginRight: 8,
          borderRadius: 5
        }}>
          Rumah
        </span>
        <span style={{
          background: '#f8d7da',
          color: '#721c24',
          padding: '4px 10px',
          borderRadius: 5
        }}>
          Jual
        </span>
      </div>

      {/* Gambar Properti Responsive */}
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16 / 9',
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '2rem'
      }}>
        <Image
          src={data.image}
          alt={data.title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 1000px) 100vw, 1000px"
        />
      </div>

      {/* Detail Properti */}
      <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Detail Properti</h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        rowGap: '1rem',
        columnGap: '2rem',
        marginBottom: '2rem'
      }}>
        <DetailItem label="Nomor Blok" value="B" />
        <DetailItem label="Nomor Unit" value="10" />
        <DetailItem label="Nama Cluster" value="Baranangsiang" />
        <DetailItem label="Luas Bangunan" value="800 m²" />
        <DetailItem label="Luas Tanah" value="1400 m²" />
        <DetailItem label="Kamar Tidur" value="21" />
        <DetailItem label="Kamar Mandi" value="8" />
        <DetailItem label="Jumlah Lantai" value="2" />
        <DetailItem label="Sertifikat" value="SHM" />
        <DetailItem label="Perabot" value="Non Furnished" />
        <DetailItem label="Daya Listrik" value="7200" />
        <DetailItem label="Hook" value="Ya" />
      </div>

      {/* Fasilitas */}
      <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Fasilitas</h3>
      <ul style={{
        listStyle: 'none',
        paddingLeft: 0,
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <li>🚗 Tempat Parkir Mobil: 3 Mobil</li>
        <li>🏍️ Tempat Parkir Motor: 3 Motor</li>
      </ul>

      {/* Informasi Agen */}
      <div style={{
        marginTop: '3rem',
        padding: '1.5rem',
        border: '1px solid #ddd',
        borderRadius: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Image
            src="https://images.unsplash.com/photo-1603415526960-f7e0328f5af1"
            alt="Agen"
            width={80}
            height={80}
            style={{ borderRadius: '50%' }}
          />
          <div>
            <p style={{ fontWeight: 'bold', margin: 0 }}>Parjito</p>
            <p style={{ color: '#777', margin: 0 }}>Agen Independen</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#25D366',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              textDecoration: 'none'
            }}
          >
            💬 WhatsApp
          </a>
          <a
            href="tel:+6281234567890"
            style={{
              background: '#d32f2f',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              textDecoration: 'none'
            }}
          >
            📞 Hubungi
          </a>
        </div>
      </div>
    </div>
  );
}

// Komponen Reusable
function DetailItem({ label, value }: { label: string, value: string }) {
  return (
    <div>
      <p style={{ margin: 0, fontSize: '0.9rem', color: '#777' }}>{label}</p>
      <p style={{ margin: 0, fontWeight: 'bold' }}>{value}</p>
    </div>
  );
}
