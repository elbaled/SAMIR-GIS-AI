const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Ahmed AI Backend is running 🚀"
    });
});

app.post("/api/chat", async (req, res) => {

    try {

        const { message } = req.body;

        if (!message || !message.trim()) {

            return res.status(400).json({
                success: false,
                error: "الرسالة فارغة"
            });
        }

        /*
         * في الخطوة التالية سنربط هنا
         * AI API الحقيقي.
         */

        res.json({
            success: true,
            reply: `تم استلام رسالتك بنجاح من Ahmed AI Backend:

"${message}"

جاهزين الآن لربط الـ AI الحقيقي 🤖`
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            error: "حدث خطأ في السيرفر"
        });
    }

});

app.listen(PORT, () => {

    console.log(
        `Ahmed AI Backend running on port ${PORT}`
    );

});
