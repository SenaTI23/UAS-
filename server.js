const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { users, products, orders, orderItems } = require('./data');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'your_secret_key'; // Ganti dengan kunci rahasia Anda

app.use(bodyParser.json());

// Middleware untuk validasi JWT
const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

// Endpoint untuk login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ username: user.username }, SECRET_KEY);
        res.json({ token });
    } else {
        res.send('Username or password incorrect');
    }
});

// Users endpoints
app.post('/users', (req, res) => {
    const user = req.body;
    users.push(user);
    res.status(201).send(user);
});

app.get('/users', (req, res) => {
    res.send(users);
});

app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');
    res.send(user);
});

app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');
    Object.assign(user, req.body);
    res.send(user);
});

app.delete('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('User not found');
    users.splice(index, 1);
    res.status(204).send();
});

// Products endpoints
app.post('/products', (req, res) => {
    const product = req.body;
    products.push(product);
    res.status(201).send(product);
});

app.get('/products', (req, res) => {
    res.send(products);
});

app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found');
    res.send(product);
});

app.put('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found');
    Object.assign(product, req.body);
    res.send(product);
});

app.delete('/products/:id', (req, res) => {
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Product not found');
    products.splice(index, 1);
    res.status(204).send();
});

// Orders endpoints
app.post('/orders', (req, res) => {
    const order = req.body;
    orders.push(order);
    res.status(201).send(order);
});

app.get('/orders', (req, res) => {
    res.send(orders);
});

app.get('/orders/:id', (req, res) => {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    if (!order) return res.status(404).send('Order not found');
    res.send(order);
});

app.put('/orders/:id', (req, res) => {
    const order = orders.find(o => o.id === parseInt(req.params.id));
    if (!order) return res.status(404).send('Order not found');
    Object.assign(order, req.body);
    res.send(order);
});

app.delete('/orders/:id', (req, res) => {
    const index = orders.findIndex(o => o.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Order not found');
    orders.splice(index, 1);
    res.status(204).send();
});

// Order Items endpoints
app.post('/order-items', (req, res) => {
    const orderItem = req.body;
    orderItems.push(orderItem);
    res.status(201).send(orderItem);
});

app.get('/order-items', (req, res) => {
    res.send(orderItems);
});

app.get('/order-items/:id', (req, res) => {
    const orderItem = orderItems.find(oi => oi.id === parseInt(req.params.id));
    if (!orderItem) return res.status(404).send('Order item not found');
    res.send(orderItem);
});

app.put('/order-items/:id', (req, res) => {
    const orderItem = orderItems.find(oi => oi.id === parseInt(req.params.id));
    if (!orderItem) return res.status(404).send('Order item not found');
    Object.assign(orderItem, req.body);
    res.send(orderItem);
});

app.delete('/order-items/:id', (req, res) => {
    const index = orderItems.findIndex(oi => oi.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Order item not found');
    orderItems.splice(index, 1);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
