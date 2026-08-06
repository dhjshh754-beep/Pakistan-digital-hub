// ====== Language Data ======
const languages = {
    ur: {
        // Login Screen
        appTitle: 'میری چاٹ',
        loginSubtitle: 'اپنا نام اور نمبر درج کریں',
        namePlaceholder: '👤 اپنا نام لکھیں',
        phonePlaceholder: '📱 نمبر (مثال: 03001234567)',
        loginBtn: '🚀 چاٹ شروع کریں',
        loginError: '❌ براہ کرم نام اور نمبر درج کریں',
        
        // Chat Screen
        chatTitle: '💬 میری چاٹ',
        onlineCount: '🟢 {count} آن لائن',
        welcomeMsg: '👋 خوش آمدید!<br><small>یہاں میسج لکھیں</small>',
        messagePlaceholder: '✏️ میسج لکھیں...',
        
        // Sidebar
        onlineTitle: '👥 آن لائن',
        noUsers: 'کوئی آن لائن نہیں',
        
        // Messages
        systemWelcome: '💬 چاٹ شروع ہو گئی! میسج لکھیں۔',
        logoutConfirm: 'کیا آپ واقعی لاگ آؤٹ کرنا چاہتے ہیں؟',
        logoutMsg: '🚪 لاگ آؤٹ ہو گئے',
        newMessage: '📩 نیا میسج آیا!',
        
        // Auto Replies
        replySalam: 'وعلیکم السلام! 😊',
        replyHow: 'میں ٹھیک ہوں، آپ سنائیں؟ 😊',
        replyDefault: 'اچھا! 😊',
        
        // Buttons
        langUr: '🇵🇰 اردو',
        langEn: '🇬🇧 English'
    },
    
    en: {
        // Login Screen
        appTitle: 'My Chat',
        loginSubtitle: 'Enter your name and number',
        namePlaceholder: '👤 Your Name',
        phonePlaceholder: '📱 Phone (e.g. 03001234567)',
        loginBtn: '🚀 Start Chat',
        loginError: '❌ Please enter name and number',
        
        // Chat Screen
        chatTitle: '💬 My Chat',
        onlineCount: '🟢 {count} online',
        welcomeMsg: '👋 Welcome!<br><small>Start typing your message</small>',
        messagePlaceholder: '✏️ Type a message...',
        
        // Sidebar
        onlineTitle: '👥 Online',
        noUsers: 'No one online',
        
        // Messages
        systemWelcome: '💬 Chat started! Start typing.',
        logoutConfirm: 'Are you sure you want to logout?',
        logoutMsg: '🚪 Logged out',
        newMessage: '📩 New message received!',
        
        // Auto Replies
        replySalam: 'Wa Alaikum Salam! 😊',
        replyHow: 'I\'m fine, how are you? 😊',
        replyDefault: 'Okay! 😊',
        
        // Buttons
        langUr: '🇵🇰 اردو',
        langEn: '🇬🇧 English'
    }
};

// ====== Current Language ======
let currentLang = 'ur'; // Default: Urdu

// ====== Get Text Function ======
function getText(key) {
    return languages[currentLang][key] || key;
}

// ====== Set Language ======
function setLanguage(lang) {
    currentLang = lang;
    updateAllTexts();
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    if (lang === 'ur') {
        document.getElementById('langUr').classList.add('active');
    } else {
        document.getElementById('langEn').classList.add('active');
    }
}

// ====== Toggle Language ======
function toggleLanguage() {
    if (currentLang === 'ur') {
        setLanguage('en');
    } else {
        setLanguage('ur');
    }
}

// ====== Update All Texts on Screen ======
function updateAllTexts() {
    // Login Screen
    document.getElementById('appTitle').textContent = getText('appTitle');
    document.getElementById('loginSubtitle').textContent = getText('loginSubtitle');
    document.getElementById('username').placeholder = getText('namePlaceholder');
    document.getElementById('phoneNumber').placeholder = getText('phonePlaceholder');
    document.getElementById('loginBtn').textContent = getText('loginBtn');
    
    // Chat Screen
    document.getElementById('chatTitle').textContent = getText('chatTitle');
    document.getElementById('messageInput').placeholder = getText('messagePlaceholder');
    document.getElementById('welcomeMsg').innerHTML = getText('welcomeMsg');
    
    // Sidebar
    document.getElementById('onlineTitle').textContent = getText('onlineTitle');
    
    // Language Buttons
    document.getElementById('langUr').textContent = languages.ur.langUr;
    document.getElementById('langEn').textContent = languages.en.langEn;
    
    // Update online count
    updateOnlineCount();
}

// ====== Update Online Count ======
function updateOnlineCount() {
    const count = document.querySelectorAll('.user-item .dot:not(.offline)').length;
    const text = getText('onlineCount').replace('{count}', count);
    document.getElementById('onlineCount').textContent = text;
}

// ====== Language Buttons ======
document.addEventListener('DOMContentLoaded', function() {
    // Set default language
    setLanguage('ur');
    
    // Style language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.style.cssText = `
            padding: 8px 16px;
            border: 2px solid rgba(255,255,255,0.3);
            background: rgba(255,255,255,0.1);
            color: white;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.3s;
            margin: 4px;
        `;
    });
});
