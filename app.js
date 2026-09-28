/* =========================================
   اسأل أبو الريس AI - Main JavaScript
   Streaming AI Version
   Image Vision + Clickable Links
========================================= */

document.addEventListener("DOMContentLoaded", () => {

/* =========================================
   ELEMENTS
========================================= */

const sidebar =
    document.getElementById(
        "sidebar"
    );

const mobileMenuBtn =
    document.getElementById(
        "mobileMenuBtn"
    );

const menuItems =
    document.querySelectorAll(
        ".menu-item[data-section]"
    );

const sections =
    document.querySelectorAll(
        ".page-section"
    );

const pageTitle =
    document.getElementById(
        "pageTitle"
    );

const pageSubtitle =
    document.getElementById(
        "pageSubtitle"
    );

const newChatBtn =
    document.getElementById(
        "newChatBtn"
    );

const themeBtn =
    document.getElementById(
        "themeBtn"
    );

const darkModeToggle =
    document.getElementById(
        "darkModeToggle"
    );

const notification =
    document.getElementById(
        "notification"
    );

const notificationText =
    document.getElementById(
        "notificationText"
    );

const notificationIcon =
    document.getElementById(
        "notificationIcon"
    );

const chatMessages =
    document.getElementById(
        "chatMessages"
    );

const chatInput =
    document.getElementById(
        "chatInput"
    );

const chatSendBtn =
    document.getElementById(
        "chatSendBtn"
    );

const homeChatInput =
    document.getElementById(
        "homeChatInput"
    );

const homeSendBtn =
    document.getElementById(
        "homeSendBtn"
    );

const gisInput =
    document.getElementById(
        "gisInput"
    );

const gisSendBtn =
    document.getElementById(
        "gisSendBtn"
    );

const codeInput =
    document.getElementById(
        "codeInput"
    );

const codeSendBtn =
    document.getElementById(
        "codeSendBtn"
    );

const codeOutput =
    document.getElementById(
        "codeOutput"
    );

const copyCodeBtn =
    document.getElementById(
        "copyCodeBtn"
    );

const mainFileInput =
    document.getElementById(
        "mainFileInput"
    );

const studyFileInput =
    document.getElementById(
        "studyFileInput"
    );

const filesList =
    document.getElementById(
        "filesList"
    );

const createTestBtn =
    document.getElementById(
        "createTestBtn"
    );

const testContainer =
    document.getElementById(
        "testContainer"
    );

const saveChatsToggle =
    document.getElementById(
        "saveChatsToggle"
    );

const languageSelect =
    document.getElementById(
        "languageSelect"
    );

const webSearchBtn =
    document.getElementById(
        "webSearchBtn"
    );

const homeImageInput =
    document.getElementById(
        "homeImageInput"
    );

const homeFileInput =
    document.getElementById(
        "homeFileInput"
    );

const chatImageInput =
    document.getElementById(
        "chatImageInput"
    );

const chatFileInput =
    document.getElementById(
        "chatFileInput"
    );


/* =========================================
   CLOUDFLARE WORKER
========================================= */

const AI_API_URL =
    "https://late-mode-12d3.123456789012345678o01234567898.workers.dev/api/chat";


/* =========================================
   IMAGE STATE
========================================= */

/*
 * الصورة التي اختارها المستخدم
 * تظل موجودة هنا حتى يكتب السؤال
 * ثم يتم إرسالها مع السؤال إلى Worker.
 */

let pendingImage = null;


/*
 * الحد الأقصى للصورة:
 * 6MB
 */

const MAX_IMAGE_SIZE =
    6 * 1024 * 1024;


/* =========================================
   PAGE INFORMATION
========================================= */

const pageInfo = {

    home: {
        title: "الرئيسية",
        subtitle:
            "مساعدك الذكي للمذاكرة والعمل"
    },

    chat: {
        title: "AI Chat",
        subtitle:
            "تحدث مع اسأل أبو الريس AI"
    },

    study: {
        title: "المذاكرة",
        subtitle:
            "تعلم بطريقة أسهل وأسرع"
    },

    gis: {
        title: "مساعد GIS",
        subtitle:
            "GIS • Remote Sensing • Surveying"
    },

    coding: {
        title: "البرمجة",
        subtitle:
            "Python • ArcPy • JavaScript"
    },

    files: {
        title: "ملفاتي",
        subtitle:
            "ملفاتك المستخدمة في التعلم"
    },

    tests: {
        title: "الاختبارات",
        subtitle:
            "اختبر معلوماتك"
    },

    settings: {
        title: "الإعدادات",
        subtitle:
            "إعدادات اسأل أبو الريس AI"
    }

};


/* =========================================
   NAVIGATION
========================================= */

function openSection(sectionName) {

    sections.forEach(section => {

        section.classList.remove(
            "active"
        );

    });


    const target =
        document.getElementById(
            sectionName + "Section"
        );


    if (target) {

        target.classList.add(
            "active"
        );

    }


    menuItems.forEach(item => {

        item.classList.remove(
            "active"
        );


        if (
            item.dataset.section ===
            sectionName
        ) {

            item.classList.add(
                "active"
            );

        }

    });


    if (pageInfo[sectionName]) {

        pageTitle.textContent =
            pageInfo[
                sectionName
            ].title;

        pageSubtitle.textContent =
            pageInfo[
                sectionName
            ].subtitle;

    }


    if (
        window.innerWidth <= 768
    ) {

        sidebar.classList.remove(
            "open"
        );

    }


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


menuItems.forEach(item => {

    item.addEventListener(
        "click",
        () => {

            const section =
                item.dataset.section;

            openSection(
                section
            );

        }
    );

});


/* =========================================
   MOBILE SIDEBAR
========================================= */

if (mobileMenuBtn) {

    mobileMenuBtn.addEventListener(
        "click",
        () => {

            sidebar.classList.toggle(
                "open"
            );

        }
    );

}


document.addEventListener(
    "click",
    event => {

        if (
            window.innerWidth > 768
        ) {

            return;

        }


        if (
            sidebar.classList.contains(
                "open"
            ) &&
            !sidebar.contains(
                event.target
            ) &&
            mobileMenuBtn &&
            !mobileMenuBtn.contains(
                event.target
            )
        ) {

            sidebar.classList.remove(
                "open"
            );

        }

    }
);


/* =========================================
   NOTIFICATIONS
========================================= */

let notificationTimer = null;


function showNotification(
    message,
    type = "success"
) {

    if (!notificationText) {
        return;
    }


    notificationText.textContent =
        message;


    if (
        type === "error"
    ) {

        if (notificationIcon) {

            notificationIcon.textContent =
                "×";

            notificationIcon.style.color =
                "var(--danger)";

            notificationIcon.style.background =
                "rgba(239,68,68,0.1)";

        }

    } else {

        if (notificationIcon) {

            notificationIcon.textContent =
                "✓";

            notificationIcon.style.color =
                "var(--success)";

            notificationIcon.style.background =
                "rgba(34,197,94,0.1)";

        }

    }


    if (notification) {

        notification.classList.add(
            "show"
        );

    }


    clearTimeout(
        notificationTimer
    );


    notificationTimer =
        setTimeout(
            () => {

                if (notification) {

                    notification.classList.remove(
                        "show"
                    );

                }

            },
            3000
        );

}


/* =========================================
   LOADING
   تم إلغاء شاشة التحميل الكاملة.
   حالة الانتظار تظهر داخل رسالة AI.
========================================= */

function showLoading() {
    // لا يوجد Loading Overlay.
}


function hideLoading() {
    // لا يوجد Loading Overlay.
}


/* =========================================
   DARK MODE
========================================= */

function setDarkMode(
    enabled
) {

    document.body.classList.toggle(
        "dark",
        enabled
    );


    localStorage.setItem(
        "ahmedAI_darkMode",
        enabled
            ? "true"
            : "false"
    );


    if (darkModeToggle) {

        darkModeToggle.checked =
            enabled;

    }


    if (themeBtn) {

        themeBtn.textContent =
            enabled
                ? "☀️"
                : "🌙";


        themeBtn.title =
            enabled
                ? "الوضع النهاري"
                : "الوضع الليلي";

    }

}


const savedTheme =
    localStorage.getItem(
        "ahmedAI_darkMode"
    );


setDarkMode(
    savedTheme === "true"
);


if (themeBtn) {

    themeBtn.addEventListener(
        "click",
        () => {

            const enabled =
                !document.body.classList.contains(
                    "dark"
                );


            setDarkMode(
                enabled
            );

        }
    );

}


if (darkModeToggle) {

    darkModeToggle.addEventListener(
        "change",
        () => {

            setDarkMode(
                darkModeToggle.checked
            );

        }
    );

}


/* =========================================
   QUICK ACTIONS
========================================= */

document
    .querySelectorAll(
        ".quick-card"
    )
    .forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const action =
                    card.dataset.action;


                if (action) {

                    openSection(
                        action
                    );

                }

            }
        );

    });


/* =========================================
   TEXT + LINK FORMATTER
========================================= */

/*
 * يحول الروابط الموجودة في رد AI
 * إلى روابط قابلة للضغط.
 *
 * مثال:
 * https://geostepsacademy.com
 *
 * يصبح رابطًا أزرق قابلًا للضغط.
 */

function renderAIText(
    element,
    text
) {

    if (!element) {
        return;
    }


    element.innerHTML = "";


    const urlRegex =
        /(https?:\/\/[^\s<>"'`]+)/g;


    const parts =
        String(text || "").split(
            urlRegex
        );


    parts.forEach(
        (part, index) => {

            if (
                index % 2 === 1
            ) {

                let cleanUrl =
                    part.replace(
                        /[),.!؟؛:]+$/g,
                        ""
                    );


                const trailing =
                    part.substring(
                        cleanUrl.length
                    );


                const link =
                    document.createElement(
                        "a"
                    );


                link.href =
                    cleanUrl;

                link.textContent =
                    cleanUrl;

                link.target =
                    "_blank";

                link.rel =
                    "noopener noreferrer";

                link.style.color =
                    "#2563eb";

                link.style.textDecoration =
                    "underline";

                link.style.cursor =
                    "pointer";


                element.appendChild(
                    link
                );


                if (trailing) {

                    element.appendChild(
                        document.createTextNode(
                            trailing
                        )
                    );

                }

            } else {

                /*
                 * تحويل الأسطر إلى نص
                 * مع الحفاظ على التنسيق.
                 */

                const lines =
                    part.split(
                        "\n"
                    );


                lines.forEach(
                    (
                        line,
                        lineIndex
                    ) => {

                        element.appendChild(
                            document.createTextNode(
                                line
                            )
                        );


                        if (
                            lineIndex <
                            lines.length - 1
                        ) {

                            element.appendChild(
                                document.createElement(
                                    "br"
                                )
                            );

                        }

                    }
                );

            }

        }
    );

}


/* =========================================
   IMAGE PREVIEW STYLES
========================================= */

function injectImageStyles() {

    if (
        document.getElementById(
            "ahmedAIImageStyles"
        )
    ) {

        return;

    }


    const style =
        document.createElement(
            "style"
        );


    style.id =
        "ahmedAIImageStyles";


    style.textContent = `

        .ahmed-ai-image-wrapper {
            margin-top: 8px;
            max-width: 320px;
        }

        .ahmed-ai-image-preview {
            display: block;
            width: 100%;
            max-width: 320px;
            max-height: 320px;
            object-fit: contain;
            border-radius: 14px;
            border: 1px solid rgba(148,163,184,0.35);
            background: rgba(148,163,184,0.08);
        }

        .ahmed-ai-image-name {
            display: block;
            margin-top: 7px;
            font-size: 12px;
            opacity: 0.75;
            word-break: break-word;
        }

        .ahmed-ai-pending {
            position: relative;
        }

        .ahmed-ai-remove-image {
            border: none;
            cursor: pointer;
            margin-top: 8px;
            padding: 6px 10px;
            border-radius: 8px;
            background: rgba(239,68,68,0.12);
            color: #dc2626;
            font-family: inherit;
        }

        .ahmed-ai-remove-image:hover {
            background: rgba(239,68,68,0.2);
        }

        .message-bubble a {
            color: #2563eb;
        }

        .dark .message-bubble a {
            color: #60a5fa;
        }

    `;


    document.head.appendChild(
        style
    );

}


injectImageStyles();


/* =========================================
   NEW CHAT
========================================= */

function createNewChat() {

    if (!chatMessages) {
        return;
    }


    pendingImage = null;


    chatMessages.innerHTML = `

        <div class="empty-chat">

            <div class="empty-icon">
                🤖
            </div>

            <h2>
                اسأل أبو الريس AI
            </h2>

            <p>
                أنا جاهز أساعدك في المذاكرة
                وGIS والبرمجة.
            </p>

            <div class="suggestions">

                <button>
                    اشرحلي ArcGIS Pro
                </button>

                <button>
                    علمني Python
                </button>

                <button>
                    اشرحلي Remote Sensing
                </button>

            </div>

        </div>

    `;


    if (chatInput) {

        chatInput.value = "";

    }


    saveMessages();


    showNotification(
        "تم إنشاء محادثة جديدة"
    );


    openSection(
        "chat"
    );


    activateSuggestions();

}


if (newChatBtn) {

    newChatBtn.addEventListener(
        "click",
        createNewChat
    );

}


/* =========================================
   CHAT FUNCTIONS
========================================= */

function addMessage(
    message,
    sender = "user",
    imageData = null,
    imageName = ""
) {

    if (!chatMessages) {
        return;
    }


    const emptyChat =
        chatMessages.querySelector(
            ".empty-chat"
        );


    if (emptyChat) {

        emptyChat.remove();

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


    if (imageData) {

        const imageWrapper =
            document.createElement(
                "div"
            );


        imageWrapper.className =
            "ahmed-ai-image-wrapper";


        const image =
            document.createElement(
                "img"
            );


        image.className =
            "ahmed-ai-image-preview";


        image.src =
            imageData;


        image.alt =
            imageName ||
            "الصورة المرسلة إلى AI";


        imageWrapper.appendChild(
            image
        );


        if (imageName) {

            const name =
                document.createElement(
                    "span"
                );


            name.className =
                "ahmed-ai-image-name";


            name.textContent =
                `📷 ${imageName}`;


            imageWrapper.appendChild(
                name
            );

        }


        bubble.appendChild(
            imageWrapper
        );


        if (message) {

            const question =
                document.createElement(
                    "div"
                );


            question.style.marginTop =
                "10px";

            question.textContent =
                message;


            bubble.appendChild(
                question
            );

        }

    } else {

        if (
            sender === "ai"
        ) {

            renderAIText(
                bubble,
                message
            );

        } else {

            bubble.textContent =
                message;

        }

    }


    messageElement.appendChild(
        bubble
    );


    /*
     * لا نخزن الصور Base64 في localStorage
     * حتى لا يمتلئ التخزين بسرعة.
     */

    if (imageData) {

        messageElement.dataset.imageMessage =
            "true";

    }


    chatMessages.appendChild(
        messageElement
    );


    chatMessages.scrollTop =
        chatMessages.scrollHeight;


    saveMessages();

}


/* =========================================
   CREATE STREAMING MESSAGE
========================================= */

function createStreamingMessage() {

    if (!chatMessages) {
        return null;
    }


    const emptyChat =
        chatMessages.querySelector(
            ".empty-chat"
        );


    if (emptyChat) {

        emptyChat.remove();

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
        "";


    messageElement.appendChild(
        bubble
    );


    chatMessages.appendChild(
        messageElement
    );


    chatMessages.scrollTop =
        chatMessages.scrollHeight;


    return bubble;

}


/* =========================================
   IMAGE PREVIEW IN CHAT
========================================= */

function showPendingImage(
    imageData,
    fileName
) {

    if (!chatMessages) {
        return;
    }


    /*
     * حذف معاينة قديمة
     */

    const oldPreview =
        chatMessages.querySelector(
            ".ahmed-ai-pending"
        );


    if (oldPreview) {

        oldPreview.remove();

    }


    const messageElement =
        document.createElement(
            "div"
        );


    messageElement.className =
        "message user ahmed-ai-pending";


    const bubble =
        document.createElement(
            "div"
        );


    bubble.className =
        "message-bubble";


    const title =
        document.createElement(
            "div"
        );


    title.textContent =
        "📷 الصورة جاهزة للإرسال";


    title.style.marginBottom =
        "8px";


    title.style.fontWeight =
        "600";


    bubble.appendChild(
        title
    );


    const wrapper =
        document.createElement(
            "div"
        );


    wrapper.className =
        "ahmed-ai-image-wrapper";


    const image =
        document.createElement(
            "img"
        );


    image.className =
        "ahmed-ai-image-preview";


    image.src =
        imageData;


    image.alt =
        fileName;


    wrapper.appendChild(
        image
    );


    const name =
        document.createElement(
            "span"
        );


    name.className =
        "ahmed-ai-image-name";


    name.textContent =
        `📎 ${fileName}`;


    wrapper.appendChild(
        name
    );


    bubble.appendChild(
        wrapper
    );


    const removeButton =
        document.createElement(
            "button"
        );


    removeButton.type =
        "button";


    removeButton.className =
        "ahmed-ai-remove-image";


    removeButton.textContent =
        "🗑️ إزالة الصورة";


    removeButton.addEventListener(
        "click",
        () => {

            pendingImage =
                null;


            messageElement.remove();


            showNotification(
                "تمت إزالة الصورة"
            );

        }
    );


    bubble.appendChild(
        removeButton
    );


    messageElement.appendChild(
        bubble
    );


    chatMessages.appendChild(
        messageElement
    );


    chatMessages.scrollTop =
        chatMessages.scrollHeight;

}


/* =========================================
   READ IMAGE AS BASE64
========================================= */

function readImageAsBase64(
    file
) {

    return new Promise(
        (
            resolve,
            reject
        ) => {

            if (!file) {

                reject(
                    new Error(
                        "لم يتم اختيار صورة."
                    )
                );

                return;

            }


            if (
                !file.type.startsWith(
                    "image/"
                )
            ) {

                reject(
                    new Error(
                        "الملف المختار ليس صورة."
                    )
                );

                return;

            }


            if (
                file.size >
                MAX_IMAGE_SIZE
            ) {

                reject(
                    new Error(
                        "حجم الصورة كبير جدًا. الحد الأقصى 6MB."
                    )
                );

                return;

            }


            const reader =
                new FileReader();


            reader.onload = () => {

                resolve(
                    reader.result
                );

            };


            reader.onerror = () => {

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

}


/* =========================================
   PROCESS IMAGE SELECTION
========================================= */

async function handleImageSelection(
    file
) {

    if (!file) {
        return;
    }


    try {

        const imageData =
            await readImageAsBase64(
                file
            );


        pendingImage = {

            data:
                imageData,

            name:
                file.name,

            type:
                file.type,

            size:
                file.size

        };


        openSection(
            "chat"
        );


        showPendingImage(
            imageData,
            file.name
        );


        if (chatInput) {

            chatInput.focus();

        }


        showNotification(
            "تم اختيار الصورة. اكتب سؤالك ثم اضغط إرسال."
        );

    } catch (error) {

        console.error(
            "Image Error:",
            error
        );


        showNotification(
            error.message,
            "error"
        );

    }

}


/* =========================================
   AI PROMPTS
========================================= */

const AI_PROMPTS = {

    general: `

أنت اسأل أبو الريس AI، مساعد ذكي للمذاكرة والعمل.

ساعد المستخدم بطريقة واضحة ومنظمة وعملية.

إذا كتب المستخدم بالعربية فأجب بالعربية،
وإذا كتب بالإنجليزية فأجب بالإنجليزية.

يمكنك مساعدة المستخدم في:
GIS
ArcGIS Pro
QGIS
Remote Sensing
Surveying
AutoCAD
Civil 3D
Python
ArcPy
JavaScript
Geography
English
والمذاكرة بشكل عام.

اشرح للمستخدم خطوة بخطوة عندما يكون السؤال عمليًا.

لا تخترع معلومات غير متأكد منها.

إذا أرسل المستخدم صورة:
- حلل الصورة فعليًا.
- صف ما يظهر فيها عند الحاجة.
- إذا كانت صورة شاشة لبرنامج GIS فحدد الأدوات أو الخطأ الظاهر قدر الإمكان.
- إذا كانت صورة سؤال دراسي فحل السؤال واشرحه.
- لا تطلب من المستخدم إعادة إرسال الصورة إذا كانت الصورة موجودة في الطلب.
`,

    gis: `

أنت الآن اسأل أبو الريس AI - GIS Specialist.

تخصصك الأساسي هو:
GIS
ArcGIS Pro
QGIS
Remote Sensing
Surveying
AutoCAD
Civil 3D
Spatial Analysis
Network Analyst
Spatial Analyst
Geoprocessing
Raster
Vector
Geodatabase
Coordinate Systems
Projection
Cartography
Python for GIS
ArcPy
Landsat
Sentinel
Google Earth Engine

عندما يطرح المستخدم سؤال GIS:

1. اشرح الفكرة ببساطة.

2. أعطِ الخطوات العملية.

3. اذكر الأدوات المستخدمة في ArcGIS Pro عندما يكون ذلك مناسبًا.

4. اشرح المصطلحات الإنجليزية المهمة.

5. أعطِ مثالًا عمليًا عندما يكون ذلك مفيدًا.

6. إذا كان السؤال عن مشكلة، حاول تحديد سبب المشكلة والحل خطوة بخطوة.

إذا كتب المستخدم بالعربية فأجب بالعربية.

إذا أرسل المستخدم صورة من ArcGIS Pro أو QGIS:
حلل الصورة نفسها وحاول تحديد ما يظهر فيها من أدوات أو أخطاء أو إعدادات.
`,

    coding: `

أنت الآن اسأل أبو الريس AI - Coding Assistant.

تخصصك في:
Python
ArcPy
JavaScript
HTML
CSS
GIS Automation
Data Processing
Geospatial Programming

عندما يطلب المستخدم كودًا:

1. افهم المطلوب أولًا.

2. أعطِ كودًا كاملًا قابلًا للنسخ.

3. لا تضع كودًا ناقصًا إلا إذا كان المستخدم طلب جزءًا محددًا.

4. اشرح أين يضع المستخدم الكود.

5. اشرح طريقة تشغيله.

6. إذا كان الكود خاصًا بـGIS فاستخدم ArcPy عندما يكون مناسبًا.

7. إذا كان هناك خطأ محتمل، وضحه.

8. استخدم تعليقات داخل الكود عند الحاجة.

إذا كتب المستخدم بالعربية فأجب بالعربية.

إذا أرسل المستخدم صورة لكود أو خطأ برمجي:
حلل الصورة وحدد الخطأ الظاهر ثم اقترح الحل.
`,

    study: `

أنت الآن اسأل أبو الريس AI - Study Assistant.

مهمتك مساعدة المستخدم على الدراسة والفهم وليس مجرد إعطاء الإجابة.

عند شرح موضوع:

ابدأ بالفكرة الأساسية.

قسم الموضوع إلى أجزاء.

استخدم أمثلة بسيطة.

اشرح المصطلحات.

في النهاية أعطِ ملخصًا سريعًا.

إذا طلب المستخدم أسئلة، أنشئ أسئلة مناسبة للمستوى.

إذا طلب اختبارًا، اجعل الأسئلة واضحة ومتنوعة.

إذا طلب تلخيصًا، حافظ على أهم المعلومات بدون حشو.

المستخدم يدرس خصوصًا:

الجغرافيا
GIS
ArcGIS Pro
Remote Sensing
Surveying
Python
English

إذا كتب المستخدم بالعربية فأجب بالعربية.

إذا أرسل المستخدم صورة لصفحة أو سؤال:
اقرأ محتوى الصورة وحاول حل أو شرح ما فيها مباشرة.
`

};


/* =========================================
   STREAM DATA PARSER
========================================= */

function extractStreamText(
    rawData
) {

    if (!rawData) {
        return "";
    }


    let text = "";


    const lines =
        rawData.split("\n");


    for (
        const line of lines
    ) {

        const trimmed =
            line.trim();


        if (!trimmed) {
            continue;
        }


        if (
            trimmed ===
            "data: [DONE]"
        ) {

            continue;

        }


        if (
            trimmed.startsWith(
                "data:"
            )
        ) {

            const jsonText =
                trimmed
                    .substring(5)
                    .trim();


            if (!jsonText) {
                continue;
            }


            try {

                const parsed =
                    JSON.parse(
                        jsonText
                    );


                if (
                    typeof parsed.response ===
                    "string"
                ) {

                    text +=
                        parsed.response;

                } else if (
                    parsed.result &&
                    typeof parsed.result.response ===
                    "string"
                ) {

                    text +=
                        parsed.result.response;

                } else if (
                    typeof parsed.text ===
                    "string"
                ) {

                    text +=
                        parsed.text;

                }

            } catch (error) {

                /*
                 * أحيانًا قد يصل جزء
                 * غير مكتمل من JSON.
                 */

            }


        } else {

            try {

                const parsed =
                    JSON.parse(
                        trimmed
                    );


                if (
                    typeof parsed.response ===
                    "string"
                ) {

                    text +=
                        parsed.response;

                } else if (
                    parsed.result &&
                    typeof parsed.result.response ===
                    "string"
                ) {

                    text +=
                        parsed.result.response;

                }

            } catch (error) {

                /*
                 * ليس JSON مباشرًا.
                 */

            }

        }

    }


    return text;

}


/* =========================================
   REAL AI STREAMING REQUEST
========================================= */

async function askAIStream(
    userMessage,
    mode = "general",
    onChunk = null,
    imageData = null
) {

    if (
        !userMessage ||
        !userMessage.trim()
    ) {

        throw new Error(
            "Empty message"
        );

    }


    const cleanMessage =
        userMessage.trim();


    const selectedPrompt =
        AI_PROMPTS[mode] ||
        AI_PROMPTS.general;


    const finalMessage = `

${selectedPrompt}

رسالة المستخدم:

${cleanMessage}

أجب الآن بشكل مفيد ومنظم.
`;


    const requestBody = {

        message:
            finalMessage

    };


    /*
     * إذا كانت هناك صورة:
     * نرسل Base64 إلى Worker.
     */

    if (imageData) {

        requestBody.image =
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
                        requestBody
                    )

            }
        );


    if (!response.ok) {

        let errorText =
            "HTTP Error: " +
            response.status;


        try {

            const errorData =
                await response.json();


            if (
                errorData &&
                errorData.error
            ) {

                errorText =
                    errorData.error;

            }

        } catch (error) {

            // تجاهل خطأ قراءة JSON

        }


        throw new Error(
            errorText
        );

    }


    if (!response.body) {

        throw new Error(
            "المتصفح لم يستلم Stream من Worker."
        );

    }


    const reader =
        response.body.getReader();


    const decoder =
        new TextDecoder(
            "utf-8"
        );


    let buffer = "";

    let fullText = "";


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


        const parts =
            buffer.split(
                "\n"
            );


        buffer =
            parts.pop() || "";


        const completedData =
            parts.join("\n");


        const chunkText =
            extractStreamText(
                completedData
            );


        if (chunkText) {

            fullText +=
                chunkText;


            if (
                typeof onChunk ===
                "function"
            ) {

                onChunk(
                    chunkText,
                    fullText
                );

            }


            if (chatMessages) {

                chatMessages.scrollTop =
                    chatMessages.scrollHeight;

            }

        }

    }


    buffer +=
        decoder.decode();


    if (buffer.trim()) {

        const finalChunk =
            extractStreamText(
                buffer
            );


        if (finalChunk) {

            fullText +=
                finalChunk;


            if (
                typeof onChunk ===
                "function"
            ) {

                onChunk(
                    finalChunk,
                    fullText
                );

            }

        }

    }


    if (!fullText.trim()) {

        throw new Error(
            "لم يصل نص من نموذج الذكاء الاصطناعي."
        );

    }


    return fullText;

}


/* =========================================
   REAL AI CHAT WITH STREAMING
========================================= */

async function sendChatMessage(
    text,
    mode = "general",
    imageData = null,
    imageName = ""
) {

    /*
     * السماح بإرسال صورة حتى لو لم يكتب
     * المستخدم سؤالًا.
     */

    if (
        (!text || !text.trim()) &&
        !imageData
    ) {

        showNotification(
            "اكتب رسالتك أولاً",
            "error"
        );

        return;

    }


    const cleanText =
        text
            ? text.trim()
            : "حلل هذه الصورة واشرح لي ما يظهر فيها.";


    /*
     * إضافة رسالة المستخدم
     * مع الصورة.
     */

    addMessage(
        cleanText,
        "user",
        imageData,
        imageName
    );


    /*
     * إزالة معاينة الصورة المؤقتة.
     */

    const pendingPreview =
        chatMessages
            ? chatMessages.querySelector(
                ".ahmed-ai-pending"
            )
            : null;


    if (pendingPreview) {

        pendingPreview.remove();

    }


    const aiBubble =
        createStreamingMessage();


    if (!aiBubble) {

        return;

    }


    aiBubble.textContent =
        "🤖 جاري التفكير...";


    try {

        let hasReceivedText =
            false;


        await askAIStream(

            cleanText,

            mode,

            (
                chunk,
                fullText
            ) => {

                hasReceivedText =
                    true;


                /*
                 * عند وصول أول جزء
                 * نحذف رسالة التفكير.
                 */

                if (
                    fullText ===
                    chunk
                ) {

                    aiBubble.textContent =
                        "";

                }


                /*
                 * أثناء Streaming نعرض
                 * النص بشكل طبيعي.
                 */

                renderAIText(
                    aiBubble,
                    fullText
                );


                if (chatMessages) {

                    chatMessages.scrollTop =
                        chatMessages.scrollHeight;

                }

            },

            imageData

        );


        if (!hasReceivedText) {

            aiBubble.textContent =
                "تم استلام الرد.";

        }


        /*
         * حفظ المحادثة.
         */

        saveMessages();


    } catch (error) {

        console.error(
            "اسأل أبو الريس AI Error:",
            error
        );


        aiBubble.textContent =
            "تعذر الحصول على رد من اسأل أبو الريس AI.\n\n" +
            "الخطأ:\n" +
            error.message;


        showNotification(
            "حدث خطأ في الذكاء الاصطناعي",
            "error"
        );


        saveMessages();

    }

}


/* =========================================
   CHAT SEND BUTTON
========================================= */

if (chatSendBtn) {

    chatSendBtn.addEventListener(
        "click",
        () => {

            if (!chatInput) {
                return;
            }


            const text =
                chatInput.value;


            chatInput.value =
                "";


            /*
             * أخذ الصورة الحالية
             * قبل تصفيرها.
             */

            const imageToSend =
                pendingImage
                    ? pendingImage.data
                    : null;


            const imageNameToSend =
                pendingImage
                    ? pendingImage.name
                    : "";


            pendingImage =
                null;


            sendChatMessage(
                text,
                "general",
                imageToSend,
                imageNameToSend
            );

        }
    );

}


/* =========================================
   CHAT ENTER KEY
========================================= */

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


                if (chatSendBtn) {

                    chatSendBtn.click();

                }

            }

        }
    );

}


/* =========================================
   HOME CHAT
========================================= */

if (homeSendBtn) {

    homeSendBtn.addEventListener(
        "click",
        () => {

            if (!homeChatInput) {
                return;
            }


            const text =
                homeChatInput.value.trim();


            if (!text) {

                showNotification(
                    "اكتب سؤالك أولاً",
                    "error"
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


            homeChatInput.value =
                "";


            sendChatMessage(
                text,
                "general"
            );


            if (chatInput) {

                chatInput.value =
                    "";

            }

        }
    );

}


/* =========================================
   SUGGESTIONS
========================================= */

function activateSuggestions() {

    document
        .querySelectorAll(
            ".suggestions button"
        )
        .forEach(button => {

            button.onclick = () => {

                const text =
                    button.textContent.trim();


                openSection(
                    "chat"
                );


                if (chatInput) {

                    chatInput.value =
                        text;

                }


                sendChatMessage(
                    text,
                    "general"
                );


                if (chatInput) {

                    chatInput.value =
                        "";

                }

            };

        });

}


activateSuggestions();


/* =========================================
   SAVE CHAT
========================================= */

function saveMessages() {

    if (!chatMessages) {
        return;
    }


    if (
        saveChatsToggle &&
        !saveChatsToggle.checked
    ) {

        return;

    }


    /*
     * نعمل نسخة حتى لا نعدل
     * المحادثة الظاهرة للمستخدم.
     */

    const clone =
        chatMessages.cloneNode(
            true
        );


    /*
     * الصور المرسلة لا يتم حفظ
     * Base64 الخاص بها داخل localStorage.
     *
     * نستبدلها برسالة صغيرة بدلًا منها.
     */

    clone
        .querySelectorAll(
            '[data-image-message="true"]'
        )
        .forEach(
            message => {

                const bubble =
                    message.querySelector(
                        ".message-bubble"
                    );


                if (bubble) {

                    bubble.innerHTML =
                        `<div>📷 تم إرسال صورة</div>`;

                }

            }
        );


    /*
     * أيضًا لا نحفظ معاينة الصورة
     * التي لم تُرسل بعد.
     */

    clone
        .querySelectorAll(
            ".ahmed-ai-pending"
        )
        .forEach(
            item => item.remove()
        );


    localStorage.setItem(
        "ahmedAI_chatHTML",
        clone.innerHTML
    );

}


function loadMessages() {

    if (!chatMessages) {
        return;
    }


    const saved =
        localStorage.getItem(
            "ahmedAI_chatHTML"
        );


    if (
        saved &&
        saved.trim()
    ) {

        chatMessages.innerHTML =
            saved;


        activateSuggestions();

    }

}


loadMessages();


if (saveChatsToggle) {

    const saved =
        localStorage.getItem(
            "ahmedAI_saveChats"
        );


    if (saved !== null) {

        saveChatsToggle.checked =
            saved === "true";

    }


    saveChatsToggle.addEventListener(
        "change",
        () => {

            localStorage.setItem(
                "ahmedAI_saveChats",
                saveChatsToggle.checked
            );


            if (
                saveChatsToggle.checked
            ) {

                saveMessages();

            }


            showNotification(

                saveChatsToggle.checked

                    ? "تم تفعيل حفظ المحادثات"

                    : "تم إيقاف حفظ المحادثات"

            );

        }
    );

}


/* =========================================
   GIS SUBJECTS
========================================= */

document
    .querySelectorAll(
        ".subject-card"
    )
    .forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const topic =
                    card.dataset.topic;


                openSection(
                    "gis"
                );


                if (gisInput) {

                    gisInput.value =
                        `اشرحلي ${topic} في GIS بالتفصيل وبطريقة عملية`;

                    gisInput.focus();

                }

            }
        );

    });


/* =========================================
   GIS AI SEND
========================================= */

if (gisSendBtn) {

    gisSendBtn.addEventListener(
        "click",
        async () => {

            if (!gisInput) {
                return;
            }


            const question =
                gisInput.value.trim();


            if (!question) {

                showNotification(
                    "اكتب سؤالك أولاً",
                    "error"
                );

                return;

            }


            gisInput.value =
                "";


            openSection(
                "chat"
            );


            await sendChatMessage(
                question,
                "gis"
            );

        }
    );

}


/* =========================================
   GIS ENTER KEY
========================================= */

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


                if (gisSendBtn) {

                    gisSendBtn.click();

                }

            }

        }
    );

}


/* =========================================
   CODING LANGUAGES
========================================= */

document
    .querySelectorAll(
        ".language-card"
    )
    .forEach(card => {

        card.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".language-card"
                    )
                    .forEach(item => {

                        item.classList.remove(
                            "active"
                        );

                    });


                card.classList.add(
                    "active"
                );


                const language =
                    card.dataset.language;


                if (codeInput) {

                    codeInput.value =
                        `اكتبلي كود ${language} يقوم بـ`;

                    codeInput.focus();

                }

            }
        );

    });


/* =========================================
   REAL AI CODE GENERATOR
========================================= */

async function generateCodeWithAI(
    request
) {

    const prompt = `

اكتب لي كودًا برمجيًا كاملًا بناءً على الطلب التالي:

${request}

التزم بالتالي:

1. أعطني الكود كاملًا.

2. اجعله قابلًا للنسخ والتشغيل.

3. إذا كان Python استخدم Python الصحيح.

4. إذا كان GIS مناسبًا استخدم ArcPy.

5. لا تضع شرحًا طويلًا داخل الكود.

6. بعد الكود اكتب شرحًا مختصرًا لطريقة تشغيله.

7. إذا كان هناك متطلبات أو مكتبات، اذكرها.

8. لا تستخدم كودًا وهميًا إذا كان بالإمكان كتابة حل حقيقي.

`;

    return await askAIStream(
        prompt,
        "coding",
        null
    );

}


/* =========================================
   FULL AI REQUEST
========================================= */

async function askAIFull(
    userMessage,
    mode = "general"
) {

    if (
        !userMessage ||
        !userMessage.trim()
    ) {

        throw new Error(
            "Empty message"
        );

    }


    const cleanMessage =
        userMessage.trim();


    const selectedPrompt =
        AI_PROMPTS[mode] ||
        AI_PROMPTS.general;


    const finalMessage = `

${selectedPrompt}

رسالة المستخدم:

${cleanMessage}

أجب الآن بشكل مفيد ومنظم.
`;


    const response =
        await fetch(
            AI_API_URL,
            {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    message:
                        finalMessage

                })

            }
        );


    if (!response.ok) {

        throw new Error(
            "HTTP Error: " +
            response.status
        );

    }


    if (!response.body) {

        throw new Error(
            "لا يوجد Stream."
        );

    }


    const reader =
        response.body.getReader();


    const decoder =
        new TextDecoder(
            "utf-8"
        );


    let buffer = "";

    let fullText = "";


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


        const parts =
            buffer.split(
                "\n"
            );


        buffer =
            parts.pop() || "";


        fullText +=
            extractStreamText(
                parts.join("\n")
            );

    }


    buffer +=
        decoder.decode();


    if (buffer.trim()) {

        fullText +=
            extractStreamText(
                buffer
            );

    }


    if (!fullText.trim()) {

        throw new Error(
            "لم يصل رد من AI."
        );

    }


    return fullText;

}


/* =========================================
   CODE SEND BUTTON
========================================= */

if (codeSendBtn) {

    codeSendBtn.addEventListener(
        "click",
        async () => {

            if (!codeInput) {
                return;
            }


            const request =
                codeInput.value.trim();


            if (!request) {

                showNotification(
                    "اكتب المطلوب من AI",
                    "error"
                );

                return;

            }


            const originalText =
                codeSendBtn.textContent;


            codeSendBtn.disabled =
                true;


            codeSendBtn.textContent =
                "🤖 جاري إنشاء الكود...";


            if (codeOutput) {

                codeOutput.textContent =
                    "🤖 جاري التفكير وإنشاء الكود...";

            }


            try {

                const result =
                    await generateCodeWithAI(
                        request
                    );


                if (codeOutput) {

                    codeOutput.textContent =
                        result;

                }


                showNotification(
                    "تم إنشاء الكود بواسطة اسأل أبو الريس AI"
                );


            } catch (error) {

                console.error(
                    "Code AI Error:",
                    error
                );


                if (codeOutput) {

                    codeOutput.textContent =
                        "حدث خطأ:\n\n" +
                        error.message;

                }


                showNotification(
                    "تعذر إنشاء الكود",
                    "error"
                );

            } finally {

                codeSendBtn.disabled =
                    false;

                codeSendBtn.textContent =
                    originalText;

            }

        }
    );

}


/* =========================================
   CODE ENTER KEY
========================================= */

if (codeInput) {

    codeInput.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                    "Enter" &&
                event.ctrlKey
            ) {

                event.preventDefault();


                if (codeSendBtn) {

                    codeSendBtn.click();

                }

            }

        }
    );

}


/* =========================================
   COPY CODE
========================================= */

if (copyCodeBtn) {

    copyCodeBtn.addEventListener(
        "click",
        async () => {

            if (!codeOutput) {
                return;
            }


            const code =
                codeOutput.textContent;


            if (
                !code ||
                code ===
                    "سيظهر الكود هنا..."
            ) {

                showNotification(
                    "لا يوجد كود لنسخه",
                    "error"
                );

                return;

            }


            try {

                await navigator
                    .clipboard
                    .writeText(
                        code
                    );


                showNotification(
                    "تم نسخ الكود"
                );

            } catch (error) {

                showNotification(
                    "تعذر نسخ الكود",
                    "error"
                );

            }

        }
    );

}


/* =========================================
   FILE HANDLING
========================================= */

let uploadedFiles =
    JSON.parse(

        localStorage.getItem(
            "ahmedAI_files"
        ) || "[]"

    );


function formatFileSize(
    bytes
) {

    if (!bytes) {

        return "0 KB";

    }


    const kb =
        bytes / 1024;


    if (kb < 1024) {

        return (
            kb.toFixed(1) +
            " KB"
        );

    }


    return (

        kb / 1024
    ).toFixed(1) +
    " MB";

}


function renderFiles() {

    if (!filesList) {

        return;

    }


    if (
        uploadedFiles.length === 0
    ) {

        filesList.innerHTML = `

            <div class="empty-files">

                📂

                <p>
                    لا توجد ملفات حتى الآن
                </p>

            </div>

        `;

        return;

    }


    filesList.innerHTML =
        uploadedFiles
            .map(
                (
                    file,
                    index
                ) => `

                <div class="file-card">

                    <div class="file-card-icon">
                        📄
                    </div>

                    <div class="file-card-info">

                        <strong>
                            ${escapeHTML(
                                file.name
                            )}
                        </strong>

                        <small>
                            ${formatFileSize(
                                file.size
                            )}
                        </small>

                    </div>

                    <button
                        class="delete-file"
                        data-index="${index}">
                        🗑️
                    </button>

                </div>

            `
            )
            .join("");


    document
        .querySelectorAll(
            ".delete-file"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.index
                        );


                    uploadedFiles.splice(
                        index,
                        1
                    );


                    saveFiles();


                    renderFiles();


                    showNotification(
                        "تم حذف الملف"
                    );

                }
            );

        });

}


function saveFiles() {

    localStorage.setItem(
        "ahmedAI_files",
        JSON.stringify(
            uploadedFiles
        )
    );

}


function handleFile(
    file
) {

    if (!file) {

        return;

    }


    const exists =
        uploadedFiles.some(
            item =>

                item.name ===
                    file.name &&

                item.size ===
                    file.size

        );


    if (exists) {

        showNotification(
            "الملف موجود بالفعل",
            "error"
        );

        return;

    }


    uploadedFiles.push({

        name:
            file.name,

        size:
            file.size,

        type:
            file.type,

        date:
            new Date()
                .toISOString()

    });


    saveFiles();


    renderFiles();


    showNotification(
        `تم إضافة ${file.name}`
    );

}


function escapeHTML(
    value
) {

    return String(
        value
    )

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );

}


if (mainFileInput) {

    mainFileInput.addEventListener(
        "change",
        () => {

            Array
                .from(
                    mainFileInput.files
                )
                .forEach(
                    handleFile
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

            Array
                .from(
                    studyFileInput.files
                )
                .forEach(
                    file => {

                        handleFile(
                            file
                        );


                        showNotification(
                            "تم رفع الملف للمذاكرة"
                        );

                    }
                );


            studyFileInput.value =
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


            if (file) {

                handleFile(
                    file
                );


                openSection(
                    "files"
                );

            }


            homeFileInput.value =
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


            if (file) {

                handleFile(
                    file
                );


                addMessage(
                    `📎 تم اختيار الملف: ${file.name}`,
                    "user"
                );

            }


            chatFileInput.value =
                "";

        }
    );

}


/* =========================================
   HOME IMAGE INPUT
========================================= */

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


            homeImageInput.value =
                "";

        }
    );

}


/* =========================================
   CHAT IMAGE INPUT
========================================= */

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


            chatImageInput.value =
                "";

        }
    );

}


renderFiles();


/* =========================================
   WEB SEARCH BUTTON
========================================= */

if (webSearchBtn) {

    webSearchBtn.addEventListener(
        "click",
        () => {

            /*
             * ملاحظة:
             * الزر هنا يجهز البحث داخل المحادثة،
             * لكن البحث الحقيقي في الإنترنت يحتاج
             * Search API أو Cloudflare AI Search
             * داخل Worker.
             */

            openSection(
                "chat"
            );


            if (chatInput) {

                chatInput.value =
                    "ابحث على الإنترنت عن: ";


                chatInput.focus();

            }


            showNotification(
                "اكتب موضوع البحث ثم اضغط إرسال."
            );

        }
    );

}


/* =========================================
   STUDY ACTIONS
========================================= */

document
    .querySelectorAll(
        "[data-study-action]"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            async () => {

                const action =
                    button.dataset.studyAction;


                let message =
                    "";


                if (
                    action ===
                    "explain"
                ) {

                    message =
                        "اشرحلي هذا الدرس بطريقة بسيطة خطوة بخطوة.";

                }


                if (
                    action ===
                    "summary"
                ) {

                    message =
                        "لخصلي الدرس في نقاط مهمة ومنظمة.";

                }


                if (
                    action ===
                    "questions"
                ) {

                    message =
                        "أنشئ لي أسئلة تدريبية على هذا الدرس.";

                }


                if (
                    action ===
                    "exam"
                ) {

                    message =
                        "اعمل لي اختبار تدريبي على هذا الموضوع.";

                }


                if (!message) {

                    return;

                }


                openSection(
                    "chat"
                );


                await sendChatMessage(
                    message,
                    "study"
                );

            }
        );

    });


/* =========================================
   TEST SYSTEM
========================================= */

const testQuestions = {

    GIS: [

        {
            q:
                "ماذا يعني GIS؟",

            options: [

                "Geographic Information System",

                "Global Internet System",

                "Geology Information Software",

                "Graphic Image System"

            ],

            answer: 0
        },


        {
            q:
                "ما الذي يستخدم لتمثيل الظواهر المستمرة؟",

            options: [

                "Raster",

                "Vector فقط",

                "Table",

                "Text"

            ],

            answer: 0
        },


        {
            q:
                "ما أحد مكونات GIS؟",

            options: [

                "Data",

                "Keyboard فقط",

                "Printer فقط",

                "Browser فقط"

            ],

            answer: 0
        }

    ],


    "ArcGIS Pro": [

        {
            q:
                "ما وظيفة Buffer؟",

            options: [

                "إنشاء منطقة حول معلم بمسافة محددة",

                "حذف كل البيانات",

                "تغيير لغة البرنامج",

                "فتح الإنترنت"

            ],

            answer: 0
        },


        {
            q:
                "أي أداة تستخدم لقص طبقة باستخدام حدود طبقة أخرى؟",

            options: [

                "Clip",

                "Buffer",

                "Merge",

                "Dissolve"

            ],

            answer: 0
        }

    ],


    Python: [

        {
            q:
                "ما الكلمة المستخدمة لتعريف دالة في Python؟",

            options: [

                "def",

                "function",

                "func",

                "define"

            ],

            answer: 0
        },


        {
            q:
                "أي رمز يستخدم لكتابة تعليق في Python؟",

            options: [

                "#",

                "//",

                "<!--",

                "/*"

            ],

            answer: 0
        }

    ],


    "Remote Sensing": [

        {
            q:
                "أي قمر صناعي يستخدم Sentinel-2؟",

            options: [

                "Earth observation",

                "GPS فقط",

                "Communication فقط",

                "Weather فقط"

            ],

            answer: 0
        }

    ],


    AutoCAD: [

        {
            q:
                "ما وظيفة أمر LINE؟",

            options: [

                "رسم خط",

                "حذف طبقة",

                "نسخ ملف",

                "تغيير اللون فقط"

            ],

            answer: 0
        }

    ],


    Surveying: [

        {
            q:
                "ما الجهاز المستخدم لقياس المناسيب؟",

            options: [

                "Level",

                "Printer",

                "Scanner",

                "GPS فقط"

            ],

            answer: 0
        }

    ],


    Geography: [

        {
            q:
                "ما عاصمة مصر؟",

            options: [

                "القاهرة",

                "الإسكندرية",

                "المنيا",

                "أسوان"

            ],

            answer: 0
        }

    ],


    English: [

        {
            q:
                "ما معنى كلمة Map؟",

            options: [

                "خريطة",

                "كتاب",

                "طريق",

                "مدينة"

            ],

            answer: 0
        }

    ]

};


function createTest() {

    if (!testContainer) {
        return;
    }


    const subjectElement =
        document.getElementById(
            "testSubject"
        );


    const countElement =
        document.getElementById(
            "testCount"
        );


    if (
        !subjectElement ||
        !countElement
    ) {

        return;

    }


    const subject =
        subjectElement.value;


    const count =
        Number(
            countElement.value
        );


    let questions =
        testQuestions[
            subject
        ] || [];


    if (
        questions.length ===
        0
    ) {

        testContainer.innerHTML = `

            <div class="test-card">

                لا توجد أسئلة تجريبية لهذه المادة حاليًا.

            </div>

        `;


        return;

    }


    questions =
        [...questions]

            .sort(
                () =>
                    Math.random() -
                    0.5
            )

            .slice(
                0,
                Math.min(
                    count,
                    questions.length
                )
            );


    testContainer.innerHTML =
        questions

            .map(
                (
                    question,
                    index
                ) => `

                <div
                    class="test-card"
                    data-answer="${question.answer}"
                >

                    <div class="test-question">

                        ${index + 1}.
                        ${escapeHTML(
                            question.q
                        )}

                    </div>

                    <div class="test-options">

                        ${question.options

                            .map(
                                (
                                    option,
                                    optionIndex
                                ) => `

                                <button
                                    class="test-option"
                                    data-option="${optionIndex}">

                                    ${escapeHTML(
                                        option
                                    )}

                                </button>

                            `
                            )

                            .join("")}

                    </div>

                </div>

            `
            )

            .join("");


    activateTestOptions();


    showNotification(
        `تم إنشاء اختبار ${subject}`
    );

}


function activateTestOptions() {

    document
        .querySelectorAll(
            ".test-option"
        )
        .forEach(option => {

            option.addEventListener(
                "click",
                () => {

                    const card =
                        option.closest(
                            ".test-card"
                        );


                    if (!card) {
                        return;
                    }


                    const correct =
                        Number(
                            card.dataset.answer
                        );


                    const selected =
                        Number(
                            option.dataset.option
                        );


                    card
                        .querySelectorAll(
                            ".test-option"
                        )
                        .forEach(
                            btn => {

                                btn.disabled =
                                    true;

                            }
                        );


                    if (
                        selected ===
                        correct
                    ) {

                        option.classList.add(
                            "correct"
                        );


                        showNotification(
                            "إجابة صحيحة ✓"
                        );

                    } else {

                        option.classList.add(
                            "wrong"
                        );


                        const correctButton =
                            card.querySelector(
                                `[data-option="${correct}"]`
                            );


                        if (
                            correctButton
                        ) {

                            correctButton.classList.add(
                                "correct"
                            );

                        }


                        showNotification(
                            "إجابة غير صحيحة",
                            "error"
                        );

                    }

                }
            );

        });

}


if (createTestBtn) {

    createTestBtn.addEventListener(
        "click",
        createTest
    );

}


/* =========================================
   LANGUAGE
========================================= */

if (languageSelect) {

    const savedLanguage =
        localStorage.getItem(
            "ahmedAI_language"
        );


    if (savedLanguage) {

        languageSelect.value =
            savedLanguage;

    }


    languageSelect.addEventListener(
        "change",
        () => {

            localStorage.setItem(
                "ahmedAI_language",
                languageSelect.value
            );


            if (
                languageSelect.value ===
                "en"
            ) {

                showNotification(
                    "English interface will be added soon."
                );

            } else {

                showNotification(
                    "تم اختيار العربية"
                );

            }

        }
    );

}


/* =========================================
   GENERAL KEYBOARD SHORTCUT
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            (
                event.ctrlKey ||
                event.metaKey
            ) &&
            event.key ===
                "k"
        ) {

            event.preventDefault();


            openSection(
                "chat"
            );


            if (chatInput) {

                chatInput.focus();

            }

        }

    }
);


/* =========================================
   INITIAL STATE
========================================= */

openSection(
    "home"
);


console.log(
    "اسأل أبو الريس AI initialized successfully - Streaming + Vision + Clickable Links enabled."
);

});
