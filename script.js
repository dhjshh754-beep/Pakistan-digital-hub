// ====== DOM References ======
const loginScreen = document.getElementById('loginScreen');
const chatScreen = document.getElementById('chatScreen');
const messagesContainer = document.getElementById('messagesContainer');
const messageInput = document.getElementById('messageInput');
const usernameInput = document.getElementById('username');
const phoneInput = document.getElementById('phoneNumber');
const loginError = document.getElementById('loginError');
const onlineCount = document.getElementById('onlineCount');
const usersList = document.getElementById('usersList');

// ====== متغیرات ======
let currentUser = {
    id: 'user_1',
    name: '',
    phone: ''
};

let messages = [];
let users = [
    { id: 'user_1', name: 'You', online: true },
    { id: 'user_2', name: 'Ali', online: true },
    { id: 'user_3', name: 'Sarah', online: false },
    { id: 'user_4', name: 'Ahmed', online: true }
];

// ====== Sidebar Toggle ======
function toggleSidebar() {
    const sidebar = document.getElementById('usersSidebar');
    sidebar.classList.toggle('open');
}

// ====== لاگن ======
function login() {
    const username = usernameInput.value.trim();
    const phone = phoneInput.value.trim();
    
    if (!username || !phone) {
        loginError.textContent = getText('loginError');
        return;
    }
    
    currentUser.name = username;
    currentUser.phone = phone;
    
    // Screen بدلیں
    loginScreen.classList.remove('active');
    chatScreen.classList.add('active');
    
    // خوش آمدید پیغام
    showNotification('👋 ' + getText('welcomeMsg').replace('<br><small>...</small>', '') + ' ' + username + '!');
    
    // ڈیمو میسج
    addMessage({
        senderId: 'system',
        senderName: 'System',
        text: getText('systemWelcome'),
        timestamp: Date.now()
    });
    
    // آن لائن یوزرز دکھائیں
    updateUsers();
}

// ====== لاگ آؤٹ ======
function logout() {
    if (confirm(getText('logoutConfirm'))) {
        loginScreen.classList.add('active');
        chatScreen.classList.remove('active');
        messagesContainer.innerHTML = '';
        usernameInput.value = '';
        phoneInput.value = '';
        showNotification(getText('logoutMsg'));
    }
}

// ====== میسج بھیجیں ======
function sendMessage() {
    const text = messageInput.value.trim();
    if (!text) return;
    
    const message = {
        senderId: currentUser.id,
        senderName: currentUser.name,
        text: text,
        timestamp: Date.now()
    };
    
    messages.push(message);
    displayMessage(message);
    messageInput.value = '';
    
    // ====== Language Detection & Auto Reply ======
    const lowerText = text.toLowerCase();
    const isUrdu = /[\u0600-\u06FF]/.test(text);
    
    let replyText = '';
    
    // Detect language and reply accordingly
    if (isUrdu) {
        // Urdu detection
        if (lowerText.includes('سلام') || lowerText.includes('السلام')) {
            replyText = getText('replySalam');
        } else if (lowerText.includes('کیسے') || lowerText.includes('حال')) {
            replyText = getText('replyHow');
        } else {
            replyText = getText('replyDefault');
        }
    } else {
        // English detection
        if (lowerText.includes('salam') || lowerText.includes('salam') || lowerText.includes('hi') || lowerText.includes('hello')) {
            replyText = getText('replySalam');
        } else if (lowerText.includes('how') || lowerText.includes('fine')) {
            replyText = getText('replyHow');
        } else {
            replyText = getText('replyDefault');
        }
    }
    
    // Send auto reply
    setTimeout(() => {
        const reply = {
            senderId: 'user_2',
            senderName: currentLang === 'ur' ? 'علی' : 'Ali',
            text: replyText,
            timestamp: Date.now()
        };
        messages.push(reply);
        displayMessage(reply);
        showNotification(getText('newMessage'));
    }, 1500);
}

// ====== میسج دکھائیں ======
function displayMessage(message) {
    // خوش آمدید پیغام ہٹائیں
    const welcome = messagesContainer.querySelector('.welcome-message');
    if (welcome) welcome.remove();
    
    const div = document.createElement('div');
    div.className = 'message';
    
    if (message.senderId === currentUser.id || message.senderId === 'system') {
        div.classList.add('message-sent');
    } else {
        div.classList.add('message-received');
    }
    
    // سینڈر کا نام (صرف دوسروں کے میسج کے لیے)
    if (message.senderId !== currentUser.id && message.senderId !== 'system') {
        const sender = document.createElement('div');
        sender.className = 'sender';
        sender.textContent = message.senderName;
        div.appendChild(sender);
    }
    
    // متن
    const text = document.createElement('div');
    text.className = 'text';
    text.textContent = message.text;
    div.appendChild(text);
    
    // وقت
    const time = document.createElement('span');
    time.className = 'time';
    const date = new Date(message.timestamp);
    time.textContent = date.getHours().toString().padStart(2, '0') + ':' + 
                       date.getMinutes().toString().padStart(2, '0');
    div.appendChild(time);
    
    messagesContainer.appendChild(div);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// ====== ڈیمو میسج Add کریں ======
function addMessage(message) {
    displayMessage(message);
}

// ====== آن لائن یوزرز اپ ڈیٹ ======
function updateUsers() {
    let count = 0;
    let html = '';
    
    for (let user of users) {
        if (user.online) {
            count++;
            html += `<div class="user-item">
                <span class="dot"></span>
                ${user.name}
            </div>`;
        }
    }
    
    const onlineText = getText('onlineCount').replace('{count}', count);
    document.getElementById('onlineCount').textContent = onlineText;
    
    usersList.innerHTML = html || `<div style="color:#999;padding:10px;">${getText('noUsers')}</div>`;
}

// ====== نوٹیفکیشن ======
function showNotification(message) {
    const notif = document.createElement('div');
    notif.className = 'notification';
    notif.textContent = message;
    notif.style.display = 'block';
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.style.display = 'none';
        notif.remove();
    }, 3000);
}

// ====== Enter Key ======
document.addEventListener('DOMContentLoaded', function() {
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});

// ====== Sidebar بند کریں ======
document.addEventListener('click', function(e) {
    const sidebar = document.getElementById('usersSidebar');
    const toggle = document.querySelector('.sidebar-toggle');
    if (sidebar.classList.contains('open') && 
        !sidebar.contains(e.target) && 
        !toggle.contains(e.target)) {
        sidebar.classList.remove('open');
    }
});

// ====== Language Toggle on Chat Screen ======
function toggleLanguage() {
    if (currentLang === 'ur') {
        setLanguage('en');
    } else {
        setLanguage('ur');
    }
    updateUsers();
}

// ====== کنسول ======
console.log('🚀 My Chat App is Ready!');
console.log('🌐 Current Language:', currentLang);
console.log('👤 Current User:', currentUser.name || 'Not logged in');
