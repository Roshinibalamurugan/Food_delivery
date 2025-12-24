# TODO: Remove MongoDB and Switch to In-Memory Storage

- [x] Remove MongoDB connection from backend/db/db.js
- [x] Remove connectDB call from backend/server.js
- [x] Convert backend/models/User.js to in-memory array
- [x] Convert backend/models/Order.js to in-memory array
- [x] Convert backend/models/Food.js to in-memory array
- [x] Update backend/routes/authRoutes.js to use in-memory User data
- [x] Update backend/routes/orderRoutes.js to use in-memory Order data
- [x] Update backend/routes/foodRoutes.js to use in-memory Food data
- [x] Remove mongoose from backend/package.json
