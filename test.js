import express from "express";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();







const PORT = 3000;







app.get('/image', (req, res) => {
    // Đường dẫn tới file hình ảnh
    const imagePath =  `${__dirname}/img/piano.jpg` // Thay thế 'path/to/your/image.jpg' với đường dẫn thực tế
    // Gửi file hình ảnh như là response
    console.log(__dirname);
    res.json(imagePath)
    // res.sendFile(imagePath);
});



app.listen(PORT, () => {


    console.log(`Server is running on http://localhost:${PORT}`);
});

