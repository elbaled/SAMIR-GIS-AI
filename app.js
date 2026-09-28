/* =========================================

اسأل أبو الريس AI - Main JavaScript

Streaming AI + Image Vision + Clickable Links

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

الصورة التي يختارها المستخدم تبقى هنا

حتى يكتب السؤال ثم يضغط إرسال.


*/

let pendingImageData = null;

let pendingImageFile = null;

let pendingImageComposer = null;

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



    if (sidebar) {



        sidebar.classList.remove(

            "open"

        );



    }



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



        if (sidebar) {



            sidebar.classList.toggle(

                "open"

            );



        }



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

        sidebar &&

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

/*

 * لا يوجد Loading Overlay.

 * لا يتم حجب الصفحة أثناء انتظار رد AI.

 */

}

function hideLoading() {

/*

 * لا يوجد Loading Overlay.

 */

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





pendingImageData = null;



pendingImageFile = null;



pendingImageComposer = null;





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

ESCAPE HTML

========================================= */

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

/* =========================================

CLICKABLE LINKS

========================================= */

/*

يحول الروابط مثل:

https://geostepsacademy.com

إلى روابط قابلة للضغط.

يتم أولًا عمل Escape للنص،

ثم إضافة الروابط بطريقة آمنة.


*/

function linkifyText(

text

) {

if (!text) {

    return "";

}





const escaped =

    escapeHTML(text);





const urlRegex =

    /(https?:\/\/[^\s<]+|www\.[^\s<]+)/gi;





return escaped.replace(

    urlRegex,

    matchedUrl => {



        let url =

            matchedUrl;





        let trailing =

            "";





        /*

         * إزالة علامات الترقيم

         * الموجودة في نهاية الرابط.

         */



        while (

            /[.,،؛;!?؟)\]}>"']$/.test(

                url

            )

        ) {



            trailing =

                url.slice(-1) +

                trailing;



            url =

                url.slice(

                    0,

                    -1

                );



        }





        let href =

            url;





        if (

            href

                .toLowerCase()

                .startsWith(

                    "www."

                )

        ) {



            href =

                "https://" +

                href;



        }





        return (

            `<a href="${href}" ` +

            `target="_blank" ` +

            `rel="noopener noreferrer" ` +

            `class="ai-link">` +

            `${url}` +

            `</a>` +

            trailing

        );



    }

);

}

/* =========================================

RENDER AI TEXT

========================================= */

function renderAIText(

element,

text

) {

if (!element) {

    return;

}





element.innerHTML =

    linkifyText(

        text

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

ADD IMAGE MESSAGE

========================================= */

function addImageMessage(

imageData,

fileName = "",

question = ""

) {

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

    "message user";





const bubble =

    document.createElement(

        "div"

    );





bubble.className =

    "message-bubble image-message-bubble";





const image =

    document.createElement(

        "img"

    );





image.src =

    imageData;



image.alt =

    fileName

        ? `الصورة المرفوعة: ${fileName}`

        : "الصورة المرفوعة";



image.className =

    "chat-uploaded-image";





image.style.maxWidth =

    "100%";



image.style.width =

    "320px";



image.style.maxHeight =

    "320px";



image.style.objectFit =

    "contain";



image.style.borderRadius =

    "14px";



image.style.display =

    "block";



image.style.marginBottom =

    "10px";





bubble.appendChild(

    image

);





if (fileName) {



    const nameElement =

        document.createElement(

            "div"

        );





    nameElement.textContent =

        `📷 ${fileName}`;





    nameElement.style.fontSize =

        "12px";



    nameElement.style.opacity =

        "0.75";



    nameElement.style.marginTop =

        "5px";





    bubble.appendChild(

        nameElement

    );



}





if (question) {



    const questionElement =

        document.createElement(

            "div"

        );





    questionElement.textContent =

        question;





    questionElement.style.marginTop =

        "10px";





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





chatMessages.scrollTop =

    chatMessages.scrollHeight;





saveMessages();





return messageElement;

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

IMAGE PREVIEW STYLES

========================================= */

function injectImageStyles() {

if (

    document.getElementById(

        "ahmedAIExtraStyles"

    )

) {



    return;



}





const style =

    document.createElement(

        "style"

    );





style.id =

    "ahmedAIExtraStyles";





style.textContent = `



    .ai-link {

        color: #2563eb;

        text-decoration: underline;

        font-weight: 600;

        word-break: break-word;

    }



    .ai-link:hover {

        opacity: 0.8;

    }



    .image-upload-composer {

        margin: 12px 0;

        padding: 12px;

        border-radius: 18px;

        border: 1px solid rgba(100, 116, 139, 0.25);

        background: var(--card-bg, #ffffff);

        box-shadow: 0 5px 20px rgba(0,0,0,0.08);

    }



    .image-upload-preview {

        display: block;

        width: 100%;

        max-width: 360px;

        max-height: 300px;

        object-fit: contain;

        margin: 0 auto 12px;

        border-radius: 14px;

    }



    .image-upload-file-name {

        font-size: 12px;

        opacity: 0.7;

        margin-bottom: 10px;

        word-break: break-word;

    }



    .image-upload-question {

        width: 100%;

        min-height: 70px;

        resize: vertical;

        padding: 10px 12px;

        border-radius: 12px;

        border: 1px solid rgba(100, 116, 139, 0.3);

        background: transparent;

        color: inherit;

        font-family: inherit;

        box-sizing: border-box;

        outline: none;

    }



    .image-upload-question:focus {

        border-color: #2563eb;

    }



    .image-upload-actions {

        display: flex;

        gap: 8px;

        margin-top: 10px;

        flex-wrap: wrap;

    }



    .image-upload-send,

    .image-upload-cancel {

        border: none;

        border-radius: 10px;

        padding: 9px 15px;

        cursor: pointer;

        font-family: inherit;

        font-weight: 600;

    }



    .image-upload-send {

        background: #2563eb;

        color: white;

    }



    .image-upload-cancel {

        background: rgba(100,116,139,0.12);

        color: inherit;

    }



    .image-message-bubble {

        overflow: hidden;

    }



    .chat-uploaded-image {

        cursor: pointer;

    }



`;





document.head.appendChild(

    style

);

}

injectImageStyles();

/* =========================================

IMAGE PREVIEW COMPOSER

========================================= */

function showImagePreview(

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

        "الملف المختار ليس صورة",

        "error"

    );



    return;



}





const maxSize =

    10 * 1024 * 1024;





if (

    file.size >

    maxSize

) {



    showNotification(

        "حجم الصورة يجب ألا يتجاوز 10MB",

        "error"

    );



    return;



}





const reader =

    new FileReader();





reader.onload = event => {



    const imageData =

        event.target.result;





    pendingImageData =

        imageData;



    pendingImageFile =

        file;





    openSection(

        "chat"

    );





    removeImagePreview();





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





    const composer =

        document.createElement(

            "div"

        );





    composer.className =

        "image-upload-composer";





    const preview =

        document.createElement(

            "img"

        );





    preview.className =

        "image-upload-preview";



    preview.src =

        imageData;



    preview.alt =

        "معاينة الصورة";





    const fileName =

        document.createElement(

            "div"

        );





    fileName.className =

        "image-upload-file-name";





    fileName.textContent =

        `📷 ${file.name}`;





    const question =

        document.createElement(

            "textarea"

        );





    question.className =

        "image-upload-question";





    question.placeholder =

        "اكتب سؤالك عن الصورة هنا... مثال: اشرح لي ما الموجود في هذه الخريطة";





    const actions =

        document.createElement(

            "div"

        );





    actions.className =

        "image-upload-actions";





    const sendButton =

        document.createElement(

            "button"

        );





    sendButton.type =

        "button";



    sendButton.className =

        "image-upload-send";



    sendButton.textContent =

        "📤 إرسال الصورة والسؤال";





    const cancelButton =

        document.createElement(

            "button"

        );





    cancelButton.type =

        "button";



    cancelButton.className =

        "image-upload-cancel";



    cancelButton.textContent =

        "إلغاء";





    actions.appendChild(

        sendButton

    );



    actions.appendChild(

        cancelButton

    );





    composer.appendChild(

        preview

    );



    composer.appendChild(

        fileName

    );



    composer.appendChild(

        question

    );



    composer.appendChild(

        actions

    );





    chatMessages.appendChild(

        composer

    );





    chatMessages.scrollTop =

        chatMessages.scrollHeight;





    pendingImageComposer =

        composer;





    question.focus();





    sendButton.addEventListener(

        "click",

        async () => {



            const userQuestion =

                question.value.trim();





            if (

                !userQuestion

            ) {



                showNotification(

                    "اكتب سؤالك عن الصورة أولاً",

                    "error"

                );



                question.focus();



                return;



            }





            await sendImageMessage(

                imageData,

                file.name,

                userQuestion

            );



        }

    );





    cancelButton.addEventListener(

        "click",

        () => {



            removeImagePreview();



            showNotification(

                "تم إلغاء الصورة"

            );



        }

    );





    question.addEventListener(

        "keydown",

        event => {



            if (

                event.key ===

                    "Enter" &&

                !event.shiftKey

            ) {



                event.preventDefault();



                sendButton.click();



            }



        }

    );



};





reader.onerror = () => {



    showNotification(

        "تعذر قراءة الصورة",

        "error"

    );



};





reader.readAsDataURL(

    file

);

}

/* =========================================

REMOVE IMAGE PREVIEW

========================================= */

function removeImagePreview() {

if (

    pendingImageComposer &&

    pendingImageComposer.parentNode

) {



    pendingImageComposer.remove();



}





pendingImageComposer =

    null;



pendingImageData =

    null;



pendingImageFile =

    null;

}

/* =========================================

SEND IMAGE MESSAGE

========================================= */

async function sendImageMessage(

imageData,

fileName,

question

) {

if (

    !imageData ||

    !question ||

    !question.trim()

) {



    showNotification(

        "الصورة والسؤال مطلوبان",

        "error"

    );



    return;



}





const cleanQuestion =

    question.trim();





/*

 * نحذف واجهة اختيار الصورة

 * قبل إضافة الرسالة النهائية.

 */



removeImagePreview();





/*

 * إضافة الصورة والسؤال إلى المحادثة.

 */



addImageMessage(

    imageData,

    fileName,

    cleanQuestion

);





/*

 * إنشاء فقاعة AI.

 */



const aiBubble =

    createStreamingMessage();





if (!aiBubble) {

    return;

}





aiBubble.textContent =

    "🤖 جاري تحليل الصورة...";





try {



    let hasReceivedText =

        false;





    await askAIStream(

        cleanQuestion,

        "general",

        (

            chunk,

            fullText

        ) => {



            hasReceivedText =

                true;





            if (

                fullText ===

                chunk

            ) {



                aiBubble.innerHTML =

                    "";



            }





            /*

             * نعيد رسم النص

             * حتى تظهر الروابط

             * قابلة للضغط.

             */



            const currentText =

                fullText;





            renderAIText(

                aiBubble,

                currentText

            );





            if (chatMessages) {



                chatMessages.scrollTop =

                    chatMessages.scrollHeight;



            }



        },

        imageData

    );





    if (

        !hasReceivedText

    ) {



        aiBubble.textContent =

            "تم تحليل الصورة.";



    }





    saveMessages();





} catch (error) {



    console.error(

        "Image AI Error:",

        error

    );





    aiBubble.textContent =

        "تعذر تحليل الصورة.\n\n" +

        "الخطأ:\n" +

        error.message;





    showNotification(

        "حدث خطأ أثناء تحليل الصورة",

        "error"

    );





    saveMessages();



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

حلل الصورة نفسها.

لا تطلب منه إعادة إرسال الصورة إذا كانت الصورة موجودة في الطلب.

اشرح ما يظهر في الصورة قدر الإمكان.

إذا كانت الصورة خريطة أو واجهة برنامج أو خطأ برمجي، اربط الشرح بما يظهر فعليًا في الصورة.


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

             * نتركه للـbuffer التالي.

             */



        }





    } else {



        /*

         * دعم بعض أشكال الـstream

         * التي قد ترسل JSON مباشرة.

         */



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

             * نتجاهله هنا.

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

/*

 * تجهيز البيانات التي سيتم إرسالها

 * إلى Cloudflare Worker.

 */



const requestBody = {



    message:

        finalMessage



};





/*

 * إذا كانت هناك صورة،

 * يتم إرسالها مع الرسالة.

 */



if (

    imageData

) {



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



        /*

         * تجاهل خطأ قراءة JSON

         */



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





/*

 * لم نعد نستخدم شاشة تحميل

 * تغطي الصفحة بالكامل.

 */





const aiBubble =

    createStreamingMessage();





if (!aiBubble) {



    return;



}





/*

 * حالة الانتظار تظهر داخل

 * فقاعة AI فقط.

 */



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



                aiBubble.innerHTML =

                    "";



            }





            /*

             * إظهار الروابط

             * كروابط قابلة للضغط.

             */



            renderAIText(

                aiBubble,

                fullText

            );





            if (chatMessages) {



                chatMessages.scrollTop =

                    chatMessages.scrollHeight;



            }



        }



    );





    if (!hasReceivedText) {



        aiBubble.textContent =

            "تم استلام الرد.";



    }





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





/*

 * نحفظ HTML المحادثة كما كان في

 * النظام الأصلي.

 *

 * ملاحظة:

 * الصور الكبيرة قد تجعل localStorage

 * ممتلئًا إذا تم حفظها.

 */



try {



    localStorage.setItem(

        "ahmedAI_chatHTML",

        chatMessages.innerHTML

    );



} catch (error) {



    console.warn(

        "تعذر حفظ المحادثة:",

        error

    );



}

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





        /*

         * لم تعد هناك شاشة تحميل.

         * زر إنشاء الكود يظل في الصفحة

         * أثناء انتظار الرد.

         */



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

    () => {



        const file =

            homeImageInput.files[0];





        if (file) {



            showImagePreview(

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

    () => {



        const file =

            chatImageInput.files[0];





        if (file) {



            showImagePreview(

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

/*

مهم:

هذا الزر الآن يفتح بحثًا حقيقيًا على Google.

لكنه لا يدّعي أن نتائج Google دخلت إلى

نموذج AI.

لكي يصبح:

سؤال المستخدم

↓

Web Search API

↓

نتائج البحث

↓

AI

نحتاج إضافة Search API إلى Cloudflare Worker.

حاليًا الزر يوفر بحثًا مباشرًا للمستخدم.


*/

if (webSearchBtn) {

webSearchBtn.addEventListener(

    "click",

    () => {



        let query = "";





        if (

            chatInput &&

            chatInput.value.trim()

        ) {



            query =

                chatInput.value.trim();



        } else if (

            homeChatInput &&

            homeChatInput.value.trim()

        ) {



            query =

                homeChatInput.value.trim();



        }





        if (!query) {



            showNotification(

                "اكتب ما تريد البحث عنه أولًا",

                "error"

            );





            openSection(

                "chat"

            );





            if (chatInput) {



                chatInput.focus();



            }





            return;



        }





        const searchURL =

            "https://www.google.com/search?q=" +

            encodeURIComponent(

                query

            );





        window.open(

            searchURL,

            "_blank",

            "noopener,noreferrer"

        );





        showNotification(

            "تم فتح البحث على الإنترنت"

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

/* =========================================

CREATE TEST

========================================= */

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

/* =========================================

TEST OPTIONS

========================================= */

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

"اسأل أبو الريس AI initialized successfully - Streaming + Vision + Links enabled."

);

});