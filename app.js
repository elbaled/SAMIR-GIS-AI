/* =========================================
   Ahmed AI - Main JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ELEMENTS
    ========================================= */

    const sidebar = document.getElementById("sidebar");
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");

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

    const loadingOverlay =
        document.getElementById(
            "loadingOverlay"
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
                "تحدث مع Ahmed AI"
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
                "إعدادات Ahmed AI"
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
    ========================================= */

    function showLoading() {

        if (loadingOverlay) {

            loadingOverlay.classList.add(
                "show"
            );

        }

    }


    function hideLoading() {

        if (loadingOverlay) {

            loadingOverlay.classList.remove(
                "show"
            );

        }

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
       NEW CHAT
    ========================================= */

    function createNewChat() {

        if (!chatMessages) {
            return;
        }


        chatMessages.innerHTML = `

            <div class="empty-chat">

                <div class="empty-icon">
                    🤖
                </div>

                <h2>
                    Ahmed AI
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
        sender = "user"
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


        bubble.textContent =
            message;


        messageElement.appendChild(
            bubble
        );


        chatMessages.appendChild(
            messageElement
        );


        chatMessages.scrollTop =
            chatMessages.scrollHeight;


        saveMessages();

    }


    /* =========================================
       AI PROMPTS
    ========================================= */

    const AI_PROMPTS = {

        general: `
أنت Ahmed AI، مساعد ذكي للمذاكرة والعمل.

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
`,

        gis: `
أنت الآن Ahmed AI - GIS Specialist.

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
`,

        coding: `
أنت الآن Ahmed AI - Coding Assistant.

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
`,

        study: `
أنت الآن Ahmed AI - Study Assistant.

مهمتك مساعدة المستخدم على الدراسة والفهم وليس مجرد إعطاء الإجابة.

عند شرح موضوع:
- ابدأ بالفكرة الأساسية.
- قسم الموضوع إلى أجزاء.
- استخدم أمثلة بسيطة.
- اشرح المصطلحات.
- في النهاية أعطِ ملخصًا سريعًا.
- إذا طلب المستخدم أسئلة، أنشئ أسئلة مناسبة للمستوى.
- إذا طلب اختبارًا، اجعل الأسئلة واضحة ومتنوعة.
- إذا طلب تلخيصًا، حافظ على أهم المعلومات بدون حشو.

المستخدم يدرس خصوصًا:
الجغرافيا
GIS
ArcGIS Pro
Remote Sensing
Surveying
Python
English

إذا كتب المستخدم بالعربية فأجب بالعربية.
`

    };


    /* =========================================
       REAL AI REQUEST
    ========================================= */

    async function askAI(
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


        const data =
            await response.json();


        if (
            data &&
            data.success &&
            data.reply
        ) {

            return data.reply;

        }


        if (
            data &&
            data.error
        ) {

            throw new Error(
                data.error
            );

        }


        throw new Error(
            "لم يصل رد صحيح من Ahmed AI."
        );

    }


    /* =========================================
       REAL AI CHAT
    ========================================= */

    async function sendChatMessage(
        text,
        mode = "general"
    ) {

        if (
            !text ||
            !text.trim()
        ) {

            showNotification(
                "اكتب رسالتك أولاً",
                "error"
            );

            return;

        }


        const cleanText =
            text.trim();


        addMessage(
            cleanText,
            "user"
        );


        showLoading();


        try {

            const reply =
                await askAI(
                    cleanText,
                    mode
                );


            hideLoading();


            addMessage(
                reply,
                "ai"
            );


        } catch (error) {

            hideLoading();


            console.error(
                "Ahmed AI Error:",
                error
            );


            addMessage(

                "تعذر الحصول على رد من Ahmed AI.\n\n" +
                "الخطأ:\n" +
                error.message,

                "ai"

            );


            showNotification(
                "حدث خطأ في الذكاء الاصطناعي",
                "error"
            );

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


                sendChatMessage(
                    text,
                    "general"
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


        localStorage.setItem(
            "ahmedAI_chatHTML",
            chatMessages.innerHTML
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


        return await askAI(
            prompt,
            "coding"
        );

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


                showLoading();


                try {

                    const result =
                        await generateCodeWithAI(
                            request
                        );


                    hideLoading();


                    if (codeOutput) {

                        codeOutput.textContent =
                            result;

                    }


                    showNotification(
                        "تم إنشاء الكود بواسطة Ahmed AI"
                    );


                } catch (error) {

                    hideLoading();


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


    if (homeImageInput) {

        homeImageInput.addEventListener(
            "change",
            () => {

                const file =
                    homeImageInput.files[0];


                if (file) {

                    openSection(
                        "chat"
                    );


                    addMessage(
                        `📷 تم اختيار الصورة: ${file.name}`,
                        "user"
                    );

                }


                homeImageInput.value =
                    "";

            }
        );

    }


    if (chatImageInput) {

        chatImageInput.addEventListener(
            "change",
            () => {

                const file =
                    chatImageInput.files[0];


                if (file) {

                    addMessage(
                        `📷 تم اختيار الصورة: ${file.name}`,
                        "user"
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

                showNotification(
                    "البحث على الإنترنت سيتم تفعيله لاحقًا"
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
        "Ahmed AI initialized successfully."
    );

});
