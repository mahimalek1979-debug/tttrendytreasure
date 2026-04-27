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
        fetch('/products.json').then(r => r.json()).then(setProducts);
        // Mock orders data for admin
        const mockOrders = [
            { id: 'order_1', totalAmount: 2500, status: 'Delivered' },
            { id: 'order_2', totalAmount: 1800, status: 'Shipped' },
            { id: 'order_3', totalAmount: 3200, status: 'Processing' }
        ];
        setOrders(mockOrders);
    }, [token, navigate]);

    const addProduct = async (e) => {
        e.preventDefault();
        // Mock product addition for demo
        const mockProduct = { 
            id: 'product_' + Date.now(), 
            ...newProduct, 
            price: Number(newProduct.price), 
            stock: Number(newProduct.stock) 
        };
        setProducts([...products, mockProduct]);
        setNewProduct({ name: '', description: '', price: '', category: '', imageUrl: '', stock: '' });
        alert('Product added successfully (demo mode)');
    };

    const deleteProduct = async (id) => {
        // Mock product deletion for demo
        setProducts(products.filter(p => p.id !== id));
        alert('Product deleted successfully (demo mode)');
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
