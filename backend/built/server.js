"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const db_js_1 = __importDefault(require("./config/db.js"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errorMiddleware_js_1 = require("./middleware/errorMiddleware.js");
const userRoutes_js_1 = __importDefault(require("./routes/userRoutes.js"));
const appointmentRoutes_js_1 = __importDefault(require("./routes/appointmentRoutes.js"));
const checkupRoutes_js_1 = __importDefault(require("./routes/checkupRoutes.js"));
const port = process.env.PORT || 5000;
(0, db_js_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json({ limit: '50mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
app.use('/api/users', userRoutes_js_1.default);
// app.use('/api/doctors', doctorRoutes);
// app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes_js_1.default);
app.use('/api/checkups', checkupRoutes_js_1.default);
if (process.env.NODE_ENV === 'production') {
    const __dirname = path_1.default.resolve();
    app.use(express_1.default.static(path_1.default.join(__dirname, '/frontend/dist')));
    app.get('*', (req, res) => res.sendFile(path_1.default.resolve(__dirname, 'frontend', 'dist', 'index.html')));
}
else {
    app.get('/', (req, res) => {
        res.send('API is running....');
    });
}
app.use(errorMiddleware_js_1.notFound);
app.use(errorMiddleware_js_1.errorHandler);
app.listen(port, () => console.log(`Server started on port ${port}`));
