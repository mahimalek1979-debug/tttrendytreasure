import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Admin.css';

const Admin = () => {
    const { token, user } = useAuth();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', category: '', imageUrl: '', stock: '' });

    useEffect(() => {
        if (!token) navigate('/login');
        fetch('http://localhost:5000/products').then(r => r.json()).then(setProducts);
        fetch('http://localhost:5000/orders', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()).then(setOrders).catch(() => {});
    }, [token, navigate]);

    const addProduct = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:5000/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ ...newProduct, price: Number(newProduct.price), stock: Number(newProduct.stock) })
        });
        if (res.ok) {
            const product = await res.json();
            setProducts([...products, product]);
            setNewProduct({ name: '', description: '', price: '', category: '', imageUrl: '', stock: '' });
        }
    };

    const deleteProduct = async (id) => {
        const res = await fetch(`http://localhost:5000/products/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) setProducts(products.filter(p => p.id !== id));
    };

    return (
        <div className="admin-container section-padding">
            <div className="container">
                <h2 className="section-title">Admin Panel</h2>
                <div className="admin-grid">
                    <div className="admin-section">
                        <h3>Add Product</h3>
                        <form onSubmit={addProduct}>
                            <input type="text" placeholder="Name" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} required />
                            <textarea placeholder="Description" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} required />
                            <input type="number" placeholder="Price" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} required />
                            <input type="text" placeholder="Category" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} required />
                            <input type="url" placeholder="Image URL" value={newProduct.imageUrl} onChange={e => setNewProduct({...newProduct, imageUrl: e.target.value})} required />
                            <input type="number" placeholder="Stock" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})} required />
                            <button type="submit" className="btn-primary">Add Product</button>
                        </form>
                    </div>
                    <div className="admin-section">
                        <h3>Products ({products.length})</h3>
                        <div className="admin-list">
                            {products.map(p => (
                                <div key={p.id} className="admin-item">
                                    <span>{p.name} - ₹{p.price}</span>
                                    <button onClick={() => deleteProduct(p.id)} className="btn-delete">Delete</button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="admin-section">
                        <h3>Orders ({orders.length})</h3>
                        <div className="admin-list">
                            {orders.map(o => (
                                <div key={o.id} className="admin-item">
                                    <span>Order #{o.id.slice(0, 8)} - ₹{o.totalAmount}</span>
                                    <span className="status">{o.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
