/* =========================================================
   اسأل أبو الريس AI
   app.js
   ========================================================= */


/* =========================================================
   إعدادات التطبيق
   ========================================================= */

const AI_API_URL =
    "https://late-mode-12d3.123456789012345678o01234567898.workers.dev/api/chat";

const CHAT_STORAGE_KEY =
    "ahmed_ai_chat_history";

const DARK_MODE_KEY =
    "ahmed_ai_dark_mode";

const SAVE_CHATS_KEY =
    "ahmed_ai_save_chats";

const LANGUAGE_KEY =
    "ahmed_ai_language";


/* =========================================================
   عناصر الصفحة
   ========================================================= */

const sidebar =
    document.getElementById("sidebar");

const menuBtn =
    document.getElementById("menuBtn");

const closeSidebarBtn =
    document.getElementById("closeSidebarBtn");

const notification =
    document.getElementById("notification");


/* =========================================================
   أقسام الموقع
   ========================================================= */

const sections = document.querySelectorAll(
    ".section"
);

const navItems = document.querySelectorAll(
    "[data-section]"
);


/* =========================================================
   الشات
   ========================================================= */

const chatMessages =
    document.getElementById("chatMessages");

const chatInput =
    document.getElementById("chatInput");

const chatSendBtn =
    document.getElementById("chatSendBtn");

const chatImageInput =
    document.getElementById("chatImageInput");

const chatFileInput =
    document.getElementById("chatFileInput");

const webSearchBtn =
    document.getElementById("webSearchBtn");


/* =========================================================
   الصفحة الرئيسية
   ========================================================= */

const homeChatInput =
    document.getElementById("homeChatInput");

const homeSendBtn =
    document.getElementById("homeSendBtn");

const homeImageInput =
    document.getElementById("homeImageInput");

const homeFileInput =
    document.getElementById("homeFileInput");


/* =========================================================
   GIS
   ========================================================= */

const gisInput =
    document.getElementById("gisInput");

const gisSendBtn =
    document.getElementById("gisSendBtn");


/* =========================================================
   البرمجة
   ========================================================= */

const codeInput =
    document.getElementById("codeInput");

const codeSendBtn =
    document.getElementById("codeSendBtn");

const codeOutput =
    document.getElementById("codeOutput");

const copyCodeBtn =
    document.getElementById("copyCodeBtn");


/* =========================================================
   الملفات
   ========================================================= */

const mainFileInput =
    document.getElementById("mainFileInput");

const filesList =
    document.getElementById("filesList");

const studyFileInput =
    document.getElementById("studyFileInput");


/* =========================================================
   الاختبارات
   ========================================================= */

const testSubject =
    document.getElementById("testSubject");

const testCount =
    document.getElementById("testCount");

const createTestBtn =
    document.getElementById("createTestBtn");

const testContainer =
    document.getElementById("testContainer");


/* =========================================================
   الإعدادات
   ========================================================= */

const darkModeToggle =
    document.getElementById("darkModeToggle");

const saveChatsToggle =
    document.getElementById("saveChatsToggle");

const languageSelect =
    document.getElementById("languageSelect");


/* =========================================================
   حالة التطبيق
   ========================================================= */

let selectedImageData = null;

let selectedImageName = "";

let selectedImageMimeType = "";

let isStreaming = false;

let currentAbortController = null;


/* =========================================================
   إنشاء منطقة معاينة الصورة
   ========================================================= */

function createImagePreviewArea() {

    let area =
        document.getElementById(
            "imagePreviewArea"
        );

    if (area) {
        return area;
    }

    const chatBox =
        document.querySelector(".chat-box");

    if (!chatBox) {
        return null;
    }

    area =
        document.createElement("div");

    area.id =
        "imagePreviewArea";

    area.className =
        "image-preview-area";

    chatBox.insertBefore(
        area,
        chatInput || chatBox.firstChild
    );

    return area;
}


/* =========================================================
   تنسيق معاينة الصورة
   ========================================================= */

function injectImagePreviewStyles() {

    if (
        document.getElementById(
            "ahmedAIImageStyles"
        )
    ) {
        return;
    }

    const style =
        document.createElement("style");

    style.id =
        "ahmedAIImageStyles";

    style.textContent = `

        .image-preview-area {
            display: none;
            margin: 10px 0;
            padding: 10px;
            border: 1px solid #d9dee8;
            border-radius: 16px;
            background: #f8fafc;
        }

        .image-preview-area.active {
            display: block;
        }

        .image-preview-wrapper {
            position: relative;
            display: inline-block;
            max-width: 100%;
        }

        .image-preview-wrapper img {
            display: block;
            width: auto;
            max-width: 280px;
            max-height: 240px;
            border-radius: 14px;
            object-fit: contain;
            border: 1px solid #d9dee8;
            background: white;
        }

        .remove-image-btn {
            position: absolute;
            top: 7px;
            right: 7px;
            width: 30px;
            height: 30px;
            border: none;
            border-radius: 50%;
            background: #ef4444;
            color: white;
            cursor: pointer;
            font-size: 17px;
            font-weight: bold;
        }

        .image-preview-name {
            margin-top: 7px;
            font-size: 13px;
            color: #64748b;
            word-break: break-word;
        }

        .message-bubble a {
            color: #2563eb !important;
            text-decoration: underline !important;
            cursor: pointer;
            word-break: break-word;
        }

        .message-bubble a:hover {
            opacity: .8;
        }

        .image-message {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .image-message img {
            max-width: 260px;
            max-height: 260px;
            border-radius: 14px;
            display: block;
            object-fit: contain;
        }

        .image-message-question {
            white-space: pre-wrap;
        }

        .thinking-message {
            opacity: .75;
            font-style: italic;
        }

        @media (max-width: 600px) {

            .image-preview-wrapper img {
                max-width: 220px;
                max-height: 200px;
            }

            .image-message img {
                max-width: 220px;
                max-height: 220px;
            }
        }
    `;

    document.head.appendChild(style);
}


/* =========================================================
   إشعار
   ========================================================= */

function showNotification(
    message,
    type = "info"
) {

    if (!notification) {
        alert(message);
        return;
    }

    notification.textContent =
        message;

    notification.className =
        "notification show";

    notification.classList.add(
        type
    );

    setTimeout(() => {

        notification.classList.remove(
            "show"
        );

    }, 3500);
}


/* =========================================================
   فتح قسم
   ========================================================= */

function openSection(sectionName) {

    sections.forEach(section => {

        section.classList.remove(
            "active"
        );

    });

    navItems.forEach(item => {

        item.classList.remove(
            "active"
        );

    });

    const target =
        document.getElementById(
            sectionName
        );

    if (target) {

        target.classList.add(
            "active"
        );

    }

    const nav =
        document.querySelector(
            `[data-section="${sectionName}"]`
        );

    if (nav) {

        nav.classList.add(
            "active"
        );

    }

    if (
        window.innerWidth <= 900 &&
        sidebar
    ) {

        sidebar.classList.remove(
            "open"
        );

    }
}


/* =========================================================
   التنقل
   ========================================================= */

navItems.forEach(item => {

    item.addEventListener(
        "click",
        () => {

            const section =
                item.dataset.section;

            if (section) {
                openSection(section);
            }

        }
    );

});


/* =========================================================
   القائمة الجانبية للموبايل
   ========================================================= */

if (menuBtn) {

    menuBtn.addEventListener(
        "click",
        () => {

            if (sidebar) {

                sidebar.classList.toggle(
                    "open"
                );

            }

        }
    );

}


if (closeSidebarBtn) {

    closeSidebarBtn.addEventListener(
        "click",
        () => {

            if (sidebar) {

                sidebar.classList.remove(
                    "open"
                );

            }

        }
    );

}


/* =========================================================
   الوضع الليلي
   ========================================================= */

function applyDarkMode(enabled) {

    document.body.classList.toggle(
        "dark-mode",
        enabled
    );

    if (darkModeToggle) {

        darkModeToggle.checked =
            enabled;

    }

    localStorage.setItem(
        DARK_MODE_KEY,
        enabled
            ? "true"
            : "false"
    );
}


const savedDarkMode =
    localStorage.getItem(
        DARK_MODE_KEY
    );

if (savedDarkMode === "true") {

    applyDarkMode(true);

}


if (darkModeToggle) {

    darkModeToggle.addEventListener(
        "change",
        () => {

            applyDarkMode(
                darkModeToggle.checked
            );

        }
    );

}


/* =========================================================
   حفظ المحادثات
   ========================================================= */

function shouldSaveChats() {

    const value =
        localStorage.getItem(
            SAVE_CHATS_KEY
        );

    if (value === null) {
        return true;
    }

    return value === "true";
}


if (saveChatsToggle) {

    saveChatsToggle.checked =
        shouldSaveChats();

    saveChatsToggle.addEventListener(
        "change",
        () => {

            localStorage.setItem(
                SAVE_CHATS_KEY,
                saveChatsToggle.checked
                    ? "true"
                    : "false"
            );

        }
    );

}


/* =========================================================
   الهروب من HTML
   ========================================================= */

function escapeHTML(value) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent =
        String(value ?? "");

    return div.innerHTML;
}


/* =========================================================
   تحويل الروابط إلى روابط قابلة للضغط
   ========================================================= */

function linkifyText(text) {

    let safe =
        escapeHTML(text);

    const urlRegex =
        /(https?:\/\/[^\s<]+)/gi;

    safe =
        safe.replace(
            urlRegex,
            function(match) {

                let url =
                    match;

                let ending = "";

                while (
                    /[.,،؛!?؟)\]}]+$/.test(
                        url
                    )
                ) {

                    ending =
                        url.slice(-1) +
                        ending;

                    url =
                        url.slice(
                            0,
                            -1
                        );

                }

                return (
                    `<a href="${url}" ` +
                    `target="_blank" ` +
                    `rel="noopener noreferrer">` +
                    `${url}` +
                    `</a>` +
                    ending
                );

            }
        );

    return safe.replace(
        /\n/g,
        "<br>"
    );
}


/* =========================================================
   عرض رسالة AI
   ========================================================= */

function renderAIMessage(
    element,
    text
) {

    if (!element) {
        return;
    }

    element.innerHTML =
        linkifyText(text);

}


/* =========================================================
   إضافة رسالة عادية
   ========================================================= */

function addMessage(
    message,
    sender = "user"
) {

    if (!chatMessages) {
        return null;
    }

    const messageElement =
        document.createElement(
            "div"
        );

    messageElement.className =
        `message ${sender}`;

    const bubble =
        document.createElement(
            "div"
        );

    bubble.className =
        "message-bubble";

    if (sender === "ai") {

        renderAIMessage(
            bubble,
            message
        );

    } else {

        bubble.textContent =
            message;

    }

    messageElement.appendChild(
        bubble
    );

    chatMessages.appendChild(
        messageElement
    );

    scrollChatToBottom();

    return bubble;
}


/* =========================================================
   إضافة رسالة صورة + سؤال
   ========================================================= */

function addImageMessage(
    imageData,
    question
) {

    if (!chatMessages) {
        return null;
    }

    const messageElement =
        document.createElement(
            "div"
        );

    messageElement.className =
        "message user";

    const bubble =
        document.createElement(
            "div"
        );

    bubble.className =
        "message-bubble image-message";

    const img =
        document.createElement(
            "img"
        );

    img.src =
        imageData;

    img.alt =
        "الصورة المرسلة";

    bubble.appendChild(
        img
    );

    if (question) {

        const questionElement =
            document.createElement(
                "div"
            );

        questionElement.className =
            "image-message-question";

        questionElement.textContent =
            question;

        bubble.appendChild(
            questionElement
        );

    }

    messageElement.appendChild(
        bubble
    );

    chatMessages.appendChild(
        messageElement
    );

    scrollChatToBottom();

    return bubble;
}


/* =========================================================
   إنشاء رسالة AI Streaming
   ========================================================= */

function createStreamingMessage() {

    if (!chatMessages) {
        return null;
    }

    const messageElement =
        document.createElement(
            "div"
        );

    messageElement.className =
        "message ai";

    const bubble =
        document.createElement(
            "div"
        );

    bubble.className =
        "message-bubble";

    bubble.textContent =
        "🤖 جاري التفكير...";

    bubble.classList.add(
        "thinking-message"
    );

    messageElement.appendChild(
        bubble
    );

    chatMessages.appendChild(
        messageElement
    );

    scrollChatToBottom();

    return bubble;
}


/* =========================================================
   النزول لآخر الشات
   ========================================================= */

function scrollChatToBottom() {

    if (!chatMessages) {
        return;
    }

    chatMessages.scrollTop =
        chatMessages.scrollHeight;

}


/* =========================================================
   Loading
   ========================================================= */

function showLoading() {
    // لا يوجد Loading Overlay.
    // الصفحة تظل قابلة للاستخدام.
}


function hideLoading() {
    // لا يوجد Loading Overlay.
}


/* =========================================================
   قراءة Streaming Response
   ========================================================= */

async function readStreamingResponse(
    response,
    onChunk
) {

    if (!response.body) {

        const text =
            await response.text();

        if (text) {
            onChunk(text);
        }

        return;
    }

    const reader =
        response.body.getReader();

    const decoder =
        new TextDecoder(
            "utf-8"
        );

    let buffer = "";

    while (true) {

        const {
            value,
            done
        } =
            await reader.read();

        if (done) {
            break;
        }

        buffer +=
            decoder.decode(
                value,
                {
                    stream: true
                }
            );

        const lines =
            buffer.split("\n");

        buffer =
            lines.pop() || "";

        for (
            const rawLine
            of lines
        ) {

            const line =
                rawLine.trim();

            if (!line) {
                continue;
            }

            if (
                line.startsWith(
                    "data:"
                )
            ) {

                const data =
                    line
                        .slice(5)
                        .trim();

                if (
                    !data ||
                    data === "[DONE]"
                ) {
                    continue;
                }

                try {

                    const parsed =
                        JSON.parse(
                            data
                        );

                    let text = "";

                    if (
                        typeof parsed ===
                        "string"
                    ) {

                        text =
                            parsed;

                    } else if (
                        parsed.response
                    ) {

                        text =
                            parsed.response;

                    } else if (
                        parsed.text
                    ) {

                        text =
                            parsed.text;

                    } else if (
                        parsed.result &&
                        typeof parsed.result ===
                        "string"
                    ) {

                        text =
                            parsed.result;

                    }

                    if (text) {
                        onChunk(text);
                    }

                } catch {

                    if (data) {
                        onChunk(data);
                    }

                }

            }

        }

    }

    const finalText =
        decoder.decode();

    if (finalText) {
        onChunk(finalText);
    }
}


/* =========================================================
   طلب AI
   ========================================================= */

async function askAIStream(
    userMessage,
    mode = "general",
    onChunk = () => {},
    imageData = null
) {

    if (currentAbortController) {

        currentAbortController.abort();

    }

    currentAbortController =
        new AbortController();

    const controller =
        currentAbortController;

    let finalMessage =
        String(
            userMessage || ""
        ).trim();


    /* -----------------------------------------
       إضافة سياق الوضع
    ----------------------------------------- */

    if (mode === "gis") {

        finalMessage =
            `أنت مساعد متخصص في GIS والجغرافيا والاستشعار عن بعد والمساحة وArcGIS Pro.

أجب باللغة العربية وبشرح عملي واضح.

سؤال المستخدم:
${finalMessage}`;

    }


    if (mode === "coding") {

        finalMessage =
            `أنت مساعد برمجة.

اكتب كودًا صحيحًا وقابلًا للتشغيل، واشرحه بالعربية عند الحاجة.

سؤال المستخدم:
${finalMessage}`;

    }


    if (mode === "study") {

        finalMessage =
            `أنت مساعد دراسي.

اشرح للمستخدم بطريقة بسيطة ومنظمة، مع أمثلة عند الحاجة.

سؤال المستخدم:
${finalMessage}`;

    }


    if (
        !finalMessage &&
        !imageData
    ) {

        throw new Error(
            "اكتب سؤالك أولًا."
        );

    }


    const payload = {

        message:
            finalMessage,

        mode:
            mode

    };


    /* -----------------------------------------
       إرسال الصورة
    ----------------------------------------- */

    if (imageData) {

        payload.image =
            imageData;

    }


    const response =
        await fetch(
            AI_API_URL,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify(
                        payload
                    ),

                signal:
                    controller.signal
            }
        );


    if (!response.ok) {

        let errorText = "";

        try {

            errorText =
                await response.text();

        } catch {

            errorText =
                "حدث خطأ غير معروف.";

        }

        throw new Error(
            `خطأ ${response.status}: ${errorText}`
        );

    }


    await readStreamingResponse(
        response,
        onChunk
    );

}


/* =========================================================
   إرسال رسالة الشات
   ========================================================= */

async function sendChatMessage(
    text,
    mode = "general"
) {

    if (isStreaming) {
        return;
    }

    const cleanText =
        String(
            text || ""
        ).trim();

    const hasImage =
        Boolean(
            selectedImageData
        );

    if (
        !cleanText &&
        !hasImage
    ) {

        showNotification(
            "اكتب رسالتك أو اختر صورة أولًا.",
            "warning"
        );

        return;

    }


    isStreaming = true;


    /* -----------------------------------------
       حفظ بيانات الصورة قبل تنظيف الحالة
    ----------------------------------------- */

    const imageToSend =
        selectedImageData;

    const imageNameToSend =
        selectedImageName;


    /* -----------------------------------------
       عرض رسالة المستخدم
    ----------------------------------------- */

    if (imageToSend) {

        addImageMessage(
            imageToSend,
            cleanText
        );

    } else {

        addMessage(
            cleanText,
            "user"
        );

    }


    /* -----------------------------------------
       تنظيف المدخل
    ----------------------------------------- */

    if (chatInput) {

        chatInput.value = "";

    }


    clearImageSelection();


    /* -----------------------------------------
       إنشاء رسالة AI
    ----------------------------------------- */

    const aiBubble =
        createStreamingMessage();

    let fullResponse =
        "";

    let firstChunkReceived =
        false;


    try {

        await askAIStream(
            cleanText,
            mode,
            chunk => {

                if (!firstChunkReceived) {

                    firstChunkReceived =
                        true;

                    aiBubble.classList.remove(
                        "thinking-message"
                    );

                    aiBubble.textContent =
                        "";

                }

                fullResponse +=
                    chunk;

                /*
                 * أثناء Streaming نعرض النص
                 * مباشرة.
                 */
                aiBubble.textContent =
                    fullResponse;

                scrollChatToBottom();

            },
            imageToSend
        );


        /*
         * بعد انتهاء Streaming
         * نحول الروابط إلى روابط قابلة للضغط.
         */
        renderAIMessage(
            aiBubble,
            fullResponse
        );


        /*
         * حفظ المحادثة
         */
        saveMessages();


    } catch (error) {

        console.error(
            "AI Error:",
            error
        );

        if (
            error.name ===
            "AbortError"
        ) {

            aiBubble.textContent =
                "تم إيقاف الطلب.";

        } else {

            aiBubble.textContent =
                "❌ حدث خطأ أثناء الاتصال بالذكاء الاصطناعي.\n\n" +
                error.message;

        }

    } finally {

        isStreaming =
            false;

        currentAbortController =
            null;

    }

}


/* =========================================================
   إرسال الشات
   ========================================================= */

if (chatSendBtn) {

    chatSendBtn.addEventListener(
        "click",
        () => {

            sendChatMessage(
                chatInput
                    ? chatInput.value
                    : "",
                "general"
            );

        }
    );

}


if (chatInput) {

    chatInput.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();

                sendChatMessage(
                    chatInput.value,
                    "general"
                );

            }

        }
    );

}


/* =========================================================
   إرسال من الصفحة الرئيسية
   ========================================================= */

if (homeSendBtn) {

    homeSendBtn.addEventListener(
        "click",
        () => {

            const text =
                homeChatInput
                    ? homeChatInput.value
                    : "";

            openSection("chat");

            if (chatInput) {
                chatInput.value =
                    text;
            }

            if (
                homeChatInput
            ) {
                homeChatInput.value =
                    "";
            }

            sendChatMessage(
                text,
                "general"
            );

        }
    );

}


if (homeChatInput) {

    homeChatInput.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();

                if (homeSendBtn) {
                    homeSendBtn.click();
                }

            }

        }
    );

}


/* =========================================================
   عرض معاينة الصورة
   ========================================================= */

function showImagePreview(
    imageData,
    fileName
) {

    const area =
        createImagePreviewArea();

    if (!area) {
        return;
    }

    area.innerHTML = "";

    const wrapper =
        document.createElement(
            "div"
        );

    wrapper.className =
        "image-preview-wrapper";


    const img =
        document.createElement(
            "img"
        );

    img.src =
        imageData;

    img.alt =
        "معاينة الصورة";


    const removeBtn =
        document.createElement(
            "button"
        );

    removeBtn.type =
        "button";

    removeBtn.className =
        "remove-image-btn";

    removeBtn.textContent =
        "×";

    removeBtn.title =
        "إزالة الصورة";


    removeBtn.addEventListener(
        "click",
        clearImageSelection
    );


    wrapper.appendChild(
        img
    );

    wrapper.appendChild(
        removeBtn
    );


    const name =
        document.createElement(
            "div"
        );

    name.className =
        "image-preview-name";

    name.textContent =
        `📷 ${fileName}`;


    area.appendChild(
        wrapper
    );

    area.appendChild(
        name
    );

    area.classList.add(
        "active"
    );


    /*
     * بعد اختيار الصورة،
     * نضع المؤشر في خانة السؤال.
     */
    setTimeout(() => {

        if (chatInput) {
            chatInput.focus();
        }

    }, 100);

}


/* =========================================================
   اختيار الصورة
   ========================================================= */

async function handleImageSelection(
    file
) {

    if (!file) {
        return;
    }


    if (
        !file.type.startsWith(
            "image/"
        )
    ) {

        showNotification(
            "الملف المختار ليس صورة.",
            "warning"
        );

        return;

    }


    /*
     * حد أقصى 5MB
     */
    const maxSize =
        5 * 1024 * 1024;

    if (file.size > maxSize) {

        showNotification(
            "حجم الصورة كبير. الحد الأقصى 5MB.",
            "warning"
        );

        return;

    }


    try {

        const reader =
            new FileReader();


        const imageData =
            await new Promise(
                (
                    resolve,
                    reject
                ) => {

                    reader.onload =
                        () => {

                            resolve(
                                reader.result
                            );

                        };

                    reader.onerror =
                        () => {

                            reject(
                                new Error(
                                    "تعذر قراءة الصورة."
                                )
                            );

                        };

                    reader.readAsDataURL(
                        file
                    );

                }
            );


        selectedImageData =
            imageData;

        selectedImageName =
            file.name;

        selectedImageMimeType =
            file.type;


        openSection(
            "chat"
        );


        showImagePreview(
            imageData,
            file.name
        );


        showNotification(
            "تم اختيار الصورة. اكتب سؤالك أسفلها ثم اضغط إرسال.",
            "success"
        );


    } catch (error) {

        console.error(
            error
        );

        showNotification(
            "حدث خطأ أثناء قراءة الصورة.",
            "error"
        );

    }

}


/* =========================================================
   إزالة الصورة
   ========================================================= */

function clearImageSelection() {

    selectedImageData =
        null;

    selectedImageName =
        "";

    selectedImageMimeType =
        "";


    const area =
        document.getElementById(
            "imagePreviewArea"
        );

    if (area) {

        area.innerHTML =
            "";

        area.classList.remove(
            "active"
        );

    }


    if (chatImageInput) {

        chatImageInput.value =
            "";

    }


    if (homeImageInput) {

        homeImageInput.value =
            "";

    }

}


/* =========================================================
   صورة الصفحة الرئيسية
   ========================================================= */

if (homeImageInput) {

    homeImageInput.addEventListener(
        "change",
        async () => {

            const file =
                homeImageInput.files[0];

            if (file) {

                await handleImageSelection(
                    file
                );

            }

        }
    );

}


/* =========================================================
   صورة الشات
   ========================================================= */

if (chatImageInput) {

    chatImageInput.addEventListener(
        "change",
        async () => {

            const file =
                chatImageInput.files[0];

            if (file) {

                await handleImageSelection(
                    file
                );

            }

        }
    );

}


/* =========================================================
   الملفات
   ========================================================= */

let uploadedFiles = [];


function renderFiles() {

    if (!filesList) {
        return;
    }

    filesList.innerHTML =
        "";

    if (
        uploadedFiles.length === 0
    ) {

        filesList.innerHTML =
            `<div class="empty-state">
                لا توجد ملفات مضافة حاليًا.
            </div>`;

        return;

    }


    uploadedFiles.forEach(
        (
            file,
            index
        ) => {

            const item =
                document.createElement(
                    "div"
                );

            item.className =
                "file-item";


            item.innerHTML =
                `
                <div>
                    <strong>
                        ${escapeHTML(file.name)}
                    </strong>
                    <small>
                        ${escapeHTML(file.type || "ملف")}
                    </small>
                </div>

                <button
                    type="button"
                    data-file-index="${index}"
                >
                    حذف
                </button>
                `;


            const deleteBtn =
                item.querySelector(
                    "[data-file-index]"
                );


            deleteBtn.addEventListener(
                "click",
                () => {

                    uploadedFiles.splice(
                        index,
                        1
                    );

                    renderFiles();

                }
            );


            filesList.appendChild(
                item
            );

        }
    );

}


function handleFiles(
    fileList
) {

    if (!fileList) {
        return;
    }

    Array.from(
        fileList
    ).forEach(
        file => {

            uploadedFiles.push(
                {
                    name:
                        file.name,

                    type:
                        file.type,

                    size:
                        file.size
                }
            );

        }
    );

    renderFiles();

}


if (mainFileInput) {

    mainFileInput.addEventListener(
        "change",
        () => {

            handleFiles(
                mainFileInput.files
            );

            mainFileInput.value =
                "";

        }
    );

}


if (studyFileInput) {

    studyFileInput.addEventListener(
        "change",
        () => {

            handleFiles(
                studyFileInput.files
            );

            studyFileInput.value =
                "";

        }
    );

}


if (chatFileInput) {

    chatFileInput.addEventListener(
        "change",
        () => {

            const file =
                chatFileInput.files[0];

            if (!file) {
                return;
            }

            addMessage(
                `📎 تم اختيار الملف: ${file.name}`,
                "user"
            );

            showNotification(
                "تم اختيار الملف.",
                "success"
            );

            chatFileInput.value =
                "";

        }
    );

}


if (homeFileInput) {

    homeFileInput.addEventListener(
        "change",
        () => {

            const file =
                homeFileInput.files[0];

            if (!file) {
                return;
            }

            openSection(
                "chat"
            );

            addMessage(
                `📎 تم اختيار الملف: ${file.name}`,
                "user"
            );

            showNotification(
                "تم اختيار الملف.",
                "success"
            );

            homeFileInput.value =
                "";

        }
    );

}


/* =========================================================
   البحث على الإنترنت
   ========================================================= */

if (webSearchBtn) {

    webSearchBtn.addEventListener(
        "click",
        () => {

            showNotification(
                "البحث المباشر على الإنترنت يحتاج ربط خدمة Web Search بالـWorker. زر البحث جاهز في الواجهة.",
                "info"
            );

        }
    );

}


/* =========================================================
   GIS
   ========================================================= */

async function sendGISQuestion() {

    const text =
        gisInput
            ? gisInput.value.trim()
            : "";

    if (!text) {

        showNotification(
            "اكتب سؤال GIS أولًا.",
            "warning"
        );

        return;

    }


    openSection(
        "chat"
    );


    if (chatInput) {

        chatInput.value =
            text;

    }


    if (gisInput) {

        gisInput.value =
            "";

    }


    await sendChatMessage(
        text,
        "gis"
    );

}


if (gisSendBtn) {

    gisSendBtn.addEventListener(
        "click",
        sendGISQuestion
    );

}


if (gisInput) {

    gisInput.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();

                sendGISQuestion();

            }

        }
    );

}


/* =========================================================
   البرمجة
   ========================================================= */

async function generateCode() {

    const text =
        codeInput
            ? codeInput.value.trim()
            : "";

    if (!text) {

        showNotification(
            "اكتب ما تريد برمجته.",
            "warning"
        );

        return;

    }


    if (codeOutput) {

        codeOutput.textContent =
            "🤖 جاري كتابة الكود...";

    }


    try {

        let responseText =
            "";


        await askAIStream(
            `
أنت مساعد برمجة متخصص.

المطلوب:
${text}

اكتب الكود كاملًا من أول سطر لآخر سطر.
إذا كان هناك أكثر من ملف، وضح اسم كل ملف.
لا تختصر الكود.
            `,
            "coding",
            chunk => {

                responseText +=
                    chunk;

                if (codeOutput) {

                    codeOutput.textContent =
                        responseText;

                }

            }
        );


    } catch (error) {

        if (codeOutput) {

            codeOutput.textContent =
                `❌ ${error.message}`;

        }

    }

}


if (codeSendBtn) {

    codeSendBtn.addEventListener(
        "click",
        generateCode
    );

}


if (codeInput) {

    codeInput.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();

                generateCode();

            }

        }
    );

}


if (copyCodeBtn) {

    copyCodeBtn.addEventListener(
        "click",
        async () => {

            if (!codeOutput) {
                return;
            }

            const text =
                codeOutput.textContent;

            try {

                await navigator.clipboard.writeText(
                    text
                );

                showNotification(
                    "✅ تم نسخ الكود.",
                    "success"
                );

            } catch {

                showNotification(
                    "تعذر نسخ الكود.",
                    "error"
                );

            }

        }
    );

}


/* =========================================================
   حفظ الشات
   ========================================================= */

function saveMessages() {

    if (!chatMessages) {
        return;
    }

    if (!shouldSaveChats()) {
        return;
    }


    /*
     * نأخذ نسخة من HTML.
     *
     * الصور الكبيرة لا يتم حفظها
     * في LocalStorage حتى لا تمتلئ المساحة.
     */

    const clone =
        chatMessages.cloneNode(
            true
        );


    clone
        .querySelectorAll(
            ".image-message img"
        )
        .forEach(
            img => {

                img.remove();

            }
        );


    localStorage.setItem(
        CHAT_STORAGE_KEY,
        clone.innerHTML
    );

}


/* =========================================================
   تحميل الشات
   ========================================================= */

function loadMessages() {

    if (!chatMessages) {
        return;
    }

    if (!shouldSaveChats()) {
        return;
    }


    const saved =
        localStorage.getItem(
            CHAT_STORAGE_KEY
        );


    if (!saved) {
        return;
    }


    try {

        chatMessages.innerHTML =
            saved;

        scrollChatToBottom();

    } catch (error) {

        console.error(
            "Load chat error:",
            error
        );

    }

}


/* =========================================================
   محادثة جديدة
   ========================================================= */

function newChat() {

    if (!chatMessages) {
        return;
    }


    const confirmed =
        confirm(
            "هل تريد بدء محادثة جديدة؟"
        );


    if (!confirmed) {
        return;
    }


    chatMessages.innerHTML =
        "";

    clearImageSelection();


    localStorage.removeItem(
        CHAT_STORAGE_KEY
    );


    addMessage(
        "أهلًا بك 👋 أنا اسأل أبو الريس AI. كيف أساعدك؟",
        "ai"
    );

}


document
    .querySelectorAll(
        "[data-new-chat]"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                newChat
            );

        }
    );


/* =========================================================
   الاقتراحات السريعة
   ========================================================= */

document
    .querySelectorAll(
        "[data-prompt]"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const prompt =
                        button.dataset.prompt ||
                        button.textContent.trim();

                    openSection(
                        "chat"
                    );

                    if (chatInput) {

                        chatInput.value =
                            prompt;

                        chatInput.focus();

                    }

                }
            );

        }
    );


/* =========================================================
   إنشاء اختبار
   ========================================================= */

async function createTest() {

    const subject =
        testSubject
            ? testSubject.value.trim()
            : "";

    const count =
        testCount
            ? Number(
                testCount.value
            )
            : 5;


    if (!subject) {

        showNotification(
            "اكتب المادة أولًا.",
            "warning"
        );

        return;

    }


    if (testContainer) {

        testContainer.innerHTML =
            "🤖 جاري إنشاء الاختبار...";

    }


    let responseText =
        "";


    try {

        await askAIStream(
            `
أنشئ اختبارًا في مادة:
${subject}

عدد الأسئلة:
${count}

اجعل الأسئلة متنوعة.
اكتب رقم السؤال والاختيارات.
ثم ضع الإجابة الصحيحة في نهاية كل سؤال.
            `,
            "study",
            chunk => {

                responseText +=
                    chunk;

                if (testContainer) {

                    testContainer.textContent =
                        responseText;

                }

            }
        );


    } catch (error) {

        if (testContainer) {

            testContainer.textContent =
                `❌ ${error.message}`;

        }

    }

}


if (createTestBtn) {

    createTestBtn.addEventListener(
        "click",
        createTest
    );

}


/* =========================================================
   اللغة
   ========================================================= */

if (languageSelect) {

    const savedLanguage =
        localStorage.getItem(
            LANGUAGE_KEY
        );

    if (savedLanguage) {

        languageSelect.value =
            savedLanguage;

    }


    languageSelect.addEventListener(
        "change",
        () => {

            localStorage.setItem(
                LANGUAGE_KEY,
                languageSelect.value
            );

            showNotification(
                "تم حفظ إعداد اللغة.",
                "success"
            );

        }
    );

}


/* =========================================================
   اختصار Ctrl + Enter
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.ctrlKey &&
            event.key ===
            "Enter"
        ) {

            if (
                document.activeElement ===
                chatInput
            ) {

                sendChatMessage(
                    chatInput.value,
                    "general"
                );

            }

        }

    }
);


/* =========================================================
   منع إرسال النموذج عند الضغط Enter
   ========================================================= */

document
    .querySelectorAll(
        "form"
    )
    .forEach(
        form => {

            form.addEventListener(
                "submit",
                event => {

                    event.preventDefault();

                }
            );

        }
    );


/* =========================================================
   تشغيل التطبيق
   ========================================================= */

function initializeApp() {

    injectImagePreviewStyles();

    createImagePreviewArea();

    renderFiles();

    loadMessages();


    /*
     * إذا لم توجد أي رسائل،
     * نضع رسالة ترحيب.
     */

    if (
        chatMessages &&
        chatMessages.children.length === 0
    ) {

        addMessage(
            "أهلًا بك 👋\nأنا اسأل أبو الريس AI.\n\nأقدر أساعدك في GIS، ArcGIS Pro، الاستشعار عن بعد، البرمجة، المذاكرة والكثير من المهام.",
            "ai"
        );

    }


    /*
     * القسم الافتراضي
     */

    const activeSection =
        document.querySelector(
            ".section.active"
        );

    if (!activeSection) {

        openSection(
            "home"
        );

    }

}


initializeApp();


/* =========================================================
   حماية من أخطاء غير متوقعة
   ========================================================= */

window.addEventListener(
    "error",
    event => {

        console.error(
            "Application Error:",
            event.error
        );

    }
);


window.addEventListener(
    "unhandledrejection",
    event => {

        console.error(
            "Unhandled Promise:",
            event.reason
        );

    }
);


/* =========================================================
   نهاية app.js
   ========================================================= */
