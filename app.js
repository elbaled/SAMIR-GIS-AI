/* =========================================
   Ahmed AI - Main JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ELEMENTS
    ========================================= */

    const sidebar = document.getElementById("sidebar");
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");

    const menuItems = document.querySelectorAll(".menu-item[data-section]");
    const sections = document.querySelectorAll(".page-section");

    const pageTitle = document.getElementById("pageTitle");
    const pageSubtitle = document.getElementById("pageSubtitle");

    const newChatBtn = document.getElementById("newChatBtn");

    const themeBtn = document.getElementById("themeBtn");
    const darkModeToggle = document.getElementById("darkModeToggle");

    const notification = document.getElementById("notification");
    const notificationText = document.getElementById("notificationText");
    const notificationIcon = document.getElementById("notificationIcon");

    const loadingOverlay = document.getElementById("loadingOverlay");

    const chatMessages = document.getElementById("chatMessages");
    const chatInput = document.getElementById("chatInput");
    const chatSendBtn = document.getElementById("chatSendBtn");

    const homeChatInput = document.getElementById("homeChatInput");
    const homeSendBtn = document.getElementById("homeSendBtn");

    const gisInput = document.getElementById("gisInput");
    const gisSendBtn = document.getElementById("gisSendBtn");

    const codeInput = document.getElementById("codeInput");
    const codeSendBtn = document.getElementById("codeSendBtn");
    const codeOutput = document.getElementById("codeOutput");
    const copyCodeBtn = document.getElementById("copyCodeBtn");

    const mainFileInput = document.getElementById("mainFileInput");
    const studyFileInput = document.getElementById("studyFileInput");

    const filesList = document.getElementById("filesList");

    const createTestBtn = document.getElementById("createTestBtn");
    const testContainer = document.getElementById("testContainer");

    const saveChatsToggle = document.getElementById("saveChatsToggle");

    const languageSelect = document.getElementById("languageSelect");

    const webSearchBtn = document.getElementById("webSearchBtn");

    const homeImageInput = document.getElementById("homeImageInput");
    const homeFileInput = document.getElementById("homeFileInput");

    const chatImageInput = document.getElementById("chatImageInput");
    const chatFileInput = document.getElementById("chatFileInput");


    /* =========================================
       PAGE INFORMATION
    ========================================= */

    const pageInfo = {

        home: {
            title: "الرئيسية",
            subtitle: "مساعدك الذكي للمذاكرة والعمل"
        },

        chat: {
            title: "AI Chat",
            subtitle: "تحدث مع Ahmed AI"
        },

        study: {
            title: "المذاكرة",
            subtitle: "تعلم بطريقة أسهل وأسرع"
        },

        gis: {
            title: "مساعد GIS",
            subtitle: "GIS • Remote Sensing • Surveying"
        },

        coding: {
            title: "البرمجة",
            subtitle: "Python • ArcPy • JavaScript"
        },

        files: {
            title: "ملفاتي",
            subtitle: "ملفاتك المستخدمة في التعلم"
        },

        tests: {
            title: "الاختبارات",
            subtitle: "اختبر معلوماتك"
        },

        settings: {
            title: "الإعدادات",
            subtitle: "إعدادات Ahmed AI"
        }

    };


    /* =========================================
       NAVIGATION
    ========================================= */

    function openSection(sectionName) {

        sections.forEach(section => {
            section.classList.remove("active");
        });

        const target = document.getElementById(
            sectionName + "Section"
        );

        if (target) {
            target.classList.add("active");
        }

        menuItems.forEach(item => {

            item.classList.remove("active");

            if (item.dataset.section === sectionName) {
                item.classList.add("active");
            }

        });

        if (pageInfo[sectionName]) {

            pageTitle.textContent =
                pageInfo[sectionName].title;

            pageSubtitle.textContent =
                pageInfo[sectionName].subtitle;
        }

        if (window.innerWidth <= 768) {
            sidebar.classList.remove("open");
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    menuItems.forEach(item => {

        item.addEventListener("click", () => {

            const section =
                item.dataset.section;

            openSection(section);

        });

    });


    /* =========================================
       MOBILE SIDEBAR
    ========================================= */

    if (mobileMenuBtn) {

        mobileMenuBtn.addEventListener("click", () => {

            sidebar.classList.toggle("open");

        });

    }


    document.addEventListener("click", event => {

        if (window.innerWidth > 768) {
            return;
        }

        if (
            sidebar.classList.contains("open") &&
            !sidebar.contains(event.target) &&
            !mobileMenuBtn.contains(event.target)
        ) {

            sidebar.classList.remove("open");

        }

    });


    /* =========================================
       NOTIFICATIONS
    ========================================= */

    let notificationTimer = null;

    function showNotification(
        message,
        type = "success"
    ) {

        notificationText.textContent = message;

        if (type === "error") {

            notificationIcon.textContent = "×";

            notificationIcon.style.color =
                "var(--danger)";

            notificationIcon.style.background =
                "rgba(239,68,68,0.1)";

        } else {

            notificationIcon.textContent = "✓";

            notificationIcon.style.color =
                "var(--success)";

            notificationIcon.style.background =
                "rgba(34,197,94,0.1)";
        }

        notification.classList.add("show");

        clearTimeout(notificationTimer);

        notificationTimer = setTimeout(() => {

            notification.classList.remove("show");

        }, 3000);
    }


    /* =========================================
       LOADING
    ========================================= */

    function showLoading() {

        loadingOverlay.classList.add("show");

    }

    function hideLoading() {

        loadingOverlay.classList.remove("show");

    }


    /* =========================================
       DARK MODE
    ========================================= */

    function setDarkMode(enabled) {

        document.body.classList.toggle(
            "dark",
            enabled
        );

        localStorage.setItem(
            "ahmedAI_darkMode",
            enabled ? "true" : "false"
        );

        if (darkModeToggle) {
            darkModeToggle.checked = enabled;
        }

        if (themeBtn) {

            themeBtn.textContent =
                enabled ? "☀️" : "🌙";

            themeBtn.title =
                enabled
                    ? "الوضع النهاري"
                    : "الوضع الليلي";
        }
    }


    const savedTheme =
        localStorage.getItem("ahmedAI_darkMode");

    setDarkMode(savedTheme === "true");


    if (themeBtn) {

        themeBtn.addEventListener("click", () => {

            const enabled =
                !document.body.classList.contains("dark");

            setDarkMode(enabled);

        });

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
        .querySelectorAll(".quick-card")
        .forEach(card => {

            card.addEventListener("click", () => {

                const action =
                    card.dataset.action;

                if (action) {
                    openSection(action);
                }

            });

        });


    /* =========================================
       NEW CHAT
    ========================================= */

    function createNewChat() {

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

        openSection("chat");

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

        const emptyChat =
            chatMessages.querySelector(
                ".empty-chat"
            );

        if (emptyChat) {
            emptyChat.remove();
        }

        const messageElement =
            document.createElement("div");

        messageElement.className =
            `message ${sender}`;

        const bubble =
            document.createElement("div");

        bubble.className =
            "message-bubble";

        bubble.textContent = message;

        messageElement.appendChild(bubble);

        chatMessages.appendChild(
            messageElement
        );

        chatMessages.scrollTop =
            chatMessages.scrollHeight;

        saveMessages();
    }


    function generateDemoResponse(message) {

        const text =
            message.toLowerCase();

        if (
            text.includes("arcgis") ||
            text.includes("أرك") ||
            text.includes("gis")
        ) {

            return `تمام يا أحمد 👌

Ahmed AI جاهز لمساعدتك في GIS.

ممكن تسألني عن:
• ArcGIS Pro
• Network Analyst
• Spatial Analyst
• Geoprocessing
• Raster
• Vector
• Coordinate Systems
• Geodatabase
• Remote Sensing

مثال:
"اشرحلي Network Analyst خطوة بخطوة"`;
        }


        if (
            text.includes("python") ||
            text.includes("بايثون")
        ) {

            return `تمام 🐍

نقدر نتعلم Python تدريجيًا، خصوصًا Python for GIS.

مثلاً:
• Variables
• Conditions
• Loops
• Functions
• Lists
• Files
• Pandas
• ArcPy

اكتبلي الموضوع اللي عايز تبدأ به.`;
        }


        if (
            text.includes("remote sensing") ||
            text.includes("استشعار")
        ) {

            return `🛰️ مساعد Remote Sensing جاهز.

ممكن نشتغل على:
• Landsat
• Sentinel-1
• Sentinel-2
• NDVI
• Classification
• Raster Analysis
• Image Processing

اكتب سؤالك بالتفصيل وأنا أرتبهولك.`;
        }


        if (
            text.includes("network analyst") ||
            text.includes("نيتورك")
        ) {

            return `🛣️ Network Analyst في ArcGIS Pro يسمح لك بتحليل الشبكات.

من أشهر التحليلات:
• Route
• Closest Facility
• Service Area
• OD Cost Matrix
• Location-Allocation

لو عندك بيانات الطرق، نقدر نمشي معًا خطوة بخطوة في عمل التحليل.`;
        }


        return `وصلتني رسالتك يا أحمد 👍

أنا حاليًا في وضع التشغيل التجريبي داخل الموقع.

الواجهة جاهزة، وبعد توصيل الموقع بواجهة AI حقيقية هنقدر نخلي Ahmed AI يجاوب على الأسئلة فعليًا بدل الردود التجريبية.

سؤالك كان:
"${message}"`;
    }


    function sendChatMessage(text) {

        if (!text || !text.trim()) {

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

        setTimeout(() => {

            hideLoading();

            const response =
                generateDemoResponse(
                    cleanText
                );

            addMessage(
                response,
                "ai"
            );

        }, 700);
    }


    if (chatSendBtn) {

        chatSendBtn.addEventListener(
            "click",
            () => {

                sendChatMessage(
                    chatInput.value
                );

                chatInput.value = "";

            }
        );

    }


    if (chatInput) {

        chatInput.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" &&
                    !event.shiftKey
                ) {

                    event.preventDefault();

                    chatSendBtn.click();
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

                const text =
                    homeChatInput.value.trim();

                if (!text) {

                    showNotification(
                        "اكتب سؤالك أولاً",
                        "error"
                    );

                    return;
                }

                openSection("chat");

                chatInput.value = text;

                homeChatInput.value = "";

                sendChatMessage(text);

                chatInput.value = "";

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

                    openSection("chat");

                    chatInput.value = text;

                    sendChatMessage(text);

                    chatInput.value = "";

                };

            });
    }

    activateSuggestions();


    /* =========================================
       SAVE CHAT
    ========================================= */

    function saveMessages() {

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

        const saved =
            localStorage.getItem(
                "ahmedAI_chatHTML"
            );

        if (saved && saved.trim()) {

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
        .querySelectorAll(".subject-card")
        .forEach(card => {

            card.addEventListener(
                "click",
                () => {

                    const topic =
                        card.dataset.topic;

                    openSection("gis");

                    gisInput.value =
                        `اشرحلي ${topic} في GIS بالتفصيل وبطريقة عملية`;

                    gisInput.focus();

                }
            );

        });


    if (gisSendBtn) {

        gisSendBtn.addEventListener(
            "click",
            () => {

                const question =
                    gisInput.value.trim();

                if (!question) {

                    showNotification(
                        "اكتب سؤالك أولاً",
                        "error"
                    );

                    return;
                }

                openSection("chat");

                chatInput.value =
                    question;

                gisInput.value = "";

                sendChatMessage(
                    question
                );

                chatInput.value = "";

            }
        );

    }


    /* =========================================
       CODING LANGUAGES
    ========================================= */

    document
        .querySelectorAll(".language-card")
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

                    codeInput.value =
                        `اكتبلي كود ${language} يقوم بـ`;

                    codeInput.focus();

                }
            );

        });


    /* =========================================
       CODE GENERATOR DEMO
    ========================================= */

    function generateCode(request) {

        const text =
            request.toLowerCase();

        if (
            text.includes("shapefile") ||
            text.includes("shapefiles")
        ) {

            return `import arcpy
import os

folder = r"C:\\GIS\\Data"

for file in os.listdir(folder):

    if file.lower().endswith(".shp"):

        path = os.path.join(
            folder,
            file
        )

        print(path)`;
        }


        if (
            text.includes("hello") ||
            text.includes("مرحبا")
        ) {

            return `print("Hello Ahmed!")`;
        }


        return `# Ahmed AI - Code Example

# طلبك:
# ${request}

# اكتب تفاصيل أكثر عن المطلوب
# وسنقوم بتوليد الكود المناسب.`;
    }


    if (codeSendBtn) {

        codeSendBtn.addEventListener(
            "click",
            () => {

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

                setTimeout(() => {

                    hideLoading();

                    codeOutput.textContent =
                        generateCode(
                            request
                        );

                    showNotification(
                        "تم إنشاء الكود"
                    );

                }, 500);

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

                const code =
                    codeOutput.textContent;

                if (
                    !code ||
                    code === "سيظهر الكود هنا..."
                ) {

                    showNotification(
                        "لا يوجد كود لنسخه",
                        "error"
                    );

                    return;
                }

                try {

                    await navigator.clipboard.writeText(
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


    function formatFileSize(bytes) {

        if (!bytes) {
            return "0 KB";
        }

        const kb =
            bytes / 1024;

        if (kb < 1024) {
            return kb.toFixed(1) + " KB";
        }

        return (
            kb / 1024
        ).toFixed(1) + " MB";
    }


    function renderFiles() {

        if (!filesList) {
            return;
        }

        if (uploadedFiles.length === 0) {

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
                    (file, index) => `

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


    function handleFile(file) {

        if (!file) {
            return;
        }

        const exists =
            uploadedFiles.some(
                item =>
                    item.name === file.name &&
                    item.size === file.size
            );

        if (exists) {

            showNotification(
                "الملف موجود بالفعل",
                "error"
            );

            return;
        }


        uploadedFiles.push({

            name: file.name,

            size: file.size,

            type: file.type,

            date: new Date().toISOString()

        });


        saveFiles();

        renderFiles();

        showNotification(
            `تم إضافة ${file.name}`
        );

    }


    function escapeHTML(value) {

        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }


    if (mainFileInput) {

        mainFileInput.addEventListener(
            "change",
            () => {

                Array
                    .from(mainFileInput.files)
                    .forEach(handleFile);

                mainFileInput.value = "";

            }
        );

    }


    if (studyFileInput) {

        studyFileInput.addEventListener(
            "change",
            () => {

                Array
                    .from(studyFileInput.files)
                    .forEach(file => {

                        handleFile(file);

                        showNotification(
                            "تم رفع الملف للمذاكرة"
                        );

                    });

                studyFileInput.value = "";

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

                    handleFile(file);

                    openSection("files");
                }

                homeFileInput.value = "";

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

                    handleFile(file);

                    addMessage(
                        `📎 تم اختيار الملف: ${file.name}`,
                        "user"
                    );

                }

                chatFileInput.value = "";

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

                    openSection("chat");

                    addMessage(
                        `📷 تم اختيار الصورة: ${file.name}`,
                        "user"
                    );

                }

                homeImageInput.value = "";

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

                chatImageInput.value = "";

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
                    "البحث على الإنترنت سيتم تفعيله عند ربط API"
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
                () => {

                    const action =
                        button.dataset.studyAction;

                    let message = "";

                    if (
                        action === "explain"
                    ) {
                        message =
                            "اشرحلي هذا الدرس بطريقة بسيطة خطوة بخطوة.";
                    }

                    if (
                        action === "summary"
                    ) {
                        message =
                            "لخصلي الدرس في نقاط مهمة ومنظمة.";
                    }

                    if (
                        action === "questions"
                    ) {
                        message =
                            "أنشئ لي أسئلة تدريبية على هذا الدرس.";
                    }

                    if (
                        action === "exam"
                    ) {
                        message =
                            "اعمل لي اختبار تدريبي على هذا الموضوع.";
                    }

                    openSection("chat");

                    chatInput.value =
                        message;

                    chatInput.focus();

                }
            );

        });


    /* =========================================
       TEST SYSTEM
    ========================================= */

    const testQuestions = {

        GIS: [
            {
                q: "ماذا يعني GIS؟",
                options: [
                    "Geographic Information System",
                    "Global Internet System",
                    "Geology Information Software",
                    "Graphic Image System"
                ],
                answer: 0
            },

            {
                q: "ما الذي يستخدم لتمثيل الظواهر المستمرة؟",
                options: [
                    "Raster",
                    "Vector فقط",
                    "Table",
                    "Text"
                ],
                answer: 0
            },

            {
                q: "ما أحد مكونات GIS؟",
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
                q: "ما وظيفة Buffer؟",
                options: [
                    "إنشاء منطقة حول معلم بمسافة محددة",
                    "حذف كل البيانات",
                    "تغيير لغة البرنامج",
                    "فتح الإنترنت"
                ],
                answer: 0
            },

            {
                q: "أي أداة تستخدم لقص طبقة باستخدام حدود طبقة أخرى؟",
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
                q: "ما الكلمة المستخدمة لتعريف دالة في Python؟",
                options: [
                    "def",
                    "function",
                    "func",
                    "define"
                ],
                answer: 0
            },

            {
                q: "أي رمز يستخدم لكتابة تعليق في Python؟",
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
                q: "أي قمر صناعي يستخدم Sentinel-2؟",
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
                q: "ما وظيفة أمر LINE؟",
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
                q: "ما الجهاز المستخدم لقياس المناسيب؟",
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
                q: "ما عاصمة مصر؟",
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
                q: "ما معنى كلمة Map؟",
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

        const subject =
            document.getElementById(
                "testSubject"
            ).value;

        const count =
            Number(
                document.getElementById(
                    "testCount"
                ).value
            );


        let questions =
            testQuestions[subject] || [];


        if (questions.length === 0) {

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
                    () => Math.random() - 0.5
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
                    (question, index) => `

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
                                    (option, optionIndex) => `

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
                            .forEach(btn => {
                                btn.disabled = true;
                            });


                        if (
                            selected === correct
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

                            if (correctButton) {

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
                    languageSelect.value === "en"
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
                (event.ctrlKey || event.metaKey) &&
                event.key === "k"
            ) {

                event.preventDefault();

                openSection("chat");

                chatInput.focus();

            }

        }
    );


    /* =========================================
       INITIAL STATE
    ========================================= */

    openSection("home");

    console.log(
        "Ahmed AI initialized successfully."
    );

});
