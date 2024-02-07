import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useAuth } from '../../auth/AuthContext';

const KategoriTambah = () => {    
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        nama_kategori: ''
    });
    const { authToken } = useAuth();
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Sedang menyimpan data...',
            allowEscapeKey: false,
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/kategori', formData,
            {   
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${authToken}`,
                  },
                }
            );
            console.log(response.data);
            // Optionally, you can show a success message to the user using a library like SweetAlert2.
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Berhasil menambahkan data.',
                showConfirmButton: false,
            });

            setTimeout(() => {
                navigate('/admin/kategori');
            }, 1000);
        } catch (error) {
            console.error('Error creating kategori:', error.response.data);
            console.log(formData);
            // Optionally, you can show an error message to the user using a library like SweetAlert2.
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Terjadi kesalahan dalam menambahkan data!',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid">
            <div>
                <h1 className="h3 mb-3 text-gray-800">Tambah Kategori</h1>
                {/* Contoh DataTales */}

                <div className="card shadow mb-4" style={{ width: '80%' }}>
                    <div className="card-header py-3 d-flex justify-content-between align-items-center">
                        <Link to="/admin/kategori" className="btn btn-danger">
                            <i className="bi bi-arrow-bar-left"></i>
                            <span> Kembali</span>
                        </Link>
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={handleSubmit}
                            disabled={loading}>
                            <i className="bi bi-file-earmark-check"></i>
                            <span> Simpan</span>
                        </button>
                    </div>
                    <div className="card-body">
                        <form style={{ width: '100%' }}>
                        <div className="mb-3">
                            <label htmlFor="nama_kategori" className="form-label fw-bold">Nama Kategori</label>
                            <input
                                type="text"
                                id="nama_kategori"
                                name="nama_kategori"
                                onChange={handleChange}
                                value={formData.nama_kategori}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="keterangan" className="form-label fw-bold">Keterangan</label>
                            <input
                                type="text"
                                id="keterangan"
                                name="keterangan"
                                onChange={handleChange}
                                value={formData.keterangan}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="field_satu" className="form-label fw-bold">Field 1</label>
                            <input
                                type="text"
                                id="field_satu"
                                name="field_satu"
                                onChange={handleChange}
                                value={formData.field_satu}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="field_dua" className="form-label fw-bold">Field 2</label>
                            <input
                                type="text"
                                id="field_dua"
                                name="field_dua"
                                onChange={handleChange}
                                value={formData.field_dua}
                                className="form-control"
                                required
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    );
};

export default KategoriTambah;
