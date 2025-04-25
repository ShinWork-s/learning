// DOMが完全に読み込まれた後に実行
document.addEventListener('DOMContentLoaded', function() {
    // ヘッダーのスクロール効果
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // よくある質問のアコーディオン機能
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            // 現在アクティブなアイテムを閉じる
            const currentActive = document.querySelector('.faq-item.active');
            if (currentActive && currentActive !== item) {
                currentActive.classList.remove('active');
            }
            
            // クリックされたアイテムの状態を切り替える
            item.classList.toggle('active');
        });
    });

    // スムーススクロール
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // ヘッダーの高さを考慮したスクロール位置の計算
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // フォームステップ機能
    const formSteps = document.querySelectorAll('.form-step');
    const progressBar = document.querySelector('.progress-bar');
    const progressSteps = document.querySelectorAll('.progress-step');
    let currentStep = 0;
    
    // 次へボタンのイベントリスナー
    const nextButtons = document.querySelectorAll('.btn-next');
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 現在のステップのバリデーション
            const currentFormStep = formSteps[currentStep];
            const requiredFields = currentFormStep.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (!isValid) return;
            
            // 次のステップに進む
            if (currentStep < formSteps.length - 1) {
                formSteps[currentStep].classList.remove('active');
                currentStep++;
                formSteps[currentStep].classList.add('active');
                
                // プログレスバーの更新
                updateProgress();
            }
        });
    });
    
    // 戻るボタンのイベントリスナー
    const prevButtons = document.querySelectorAll('.btn-prev');
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (currentStep > 0) {
                formSteps[currentStep].classList.remove('active');
                currentStep--;
                formSteps[currentStep].classList.add('active');
                
                // プログレスバーの更新
                updateProgress();
            }
        });
    });
    
    // プログレスバーの更新関数
    function updateProgress() {
        // プログレスステップのアクティブ状態を更新
        progressSteps.forEach((step, index) => {
            if (index <= currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        // プログレスバーの幅を更新
        const percent = ((currentStep) / (progressSteps.length - 1)) * 100;
        progressBar.style.width = `${percent}%`;
    }
    
    // 初期状態のプログレス表示
    updateProgress();

    // カウントダウンタイマー設定
    function setupCountdown() {
        const countdownElement = document.getElementById('campaign-countdown');
        if (!countdownElement) return;
        
        // 現在の日付から5日後を終了日とする
        const now = new Date();
        const endDate = new Date(now);
        endDate.setDate(now.getDate() + 5);
        endDate.setHours(23, 59, 59, 0);
        
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = endDate - now;
            
            // タイマー終了
            if (distance < 0) {
                countdownElement.innerHTML = "キャンペーン終了";
                return;
            }
            
            // 残り時間の計算
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // カウントダウン表示の更新
            countdownElement.innerHTML = `${days}日 ${hours}時間 ${minutes}分 ${seconds}秒 残り`;
        }
        
        // 初回実行
        updateCountdown();
        
        // 1秒ごとにカウントダウンを更新
        setInterval(updateCountdown, 1000);
    }
    
    // カウントダウン実行
    setupCountdown();

    // 講師紹介スライダー
    const teacherProfiles = document.querySelectorAll('.teacher-profile');
    const navDots = document.querySelectorAll('.nav-dot');
    
    // 自動スライド切り替え機能
    let currentSlide = 0;
    const slideInterval = 5000; // 5秒ごとに切り替え
    
    function showSlide(index) {
        // スライドを表示
        teacherProfiles.forEach((profile, i) => {
            if (i === index) {
                profile.style.opacity = '1';
                profile.style.transform = 'translateX(0) scale(1)';
            } else {
                profile.style.opacity = '0.5';
                profile.style.transform = 'translateX(0) scale(0.9)';
            }
        });
        
        // ドットのアクティブ状態を更新
        navDots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        currentSlide = index;
    }
    
    // ドットクリックでスライド切り替え
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // 自動スライド切り替え
    function autoSlide() {
        currentSlide = (currentSlide + 1) % teacherProfiles.length;
        showSlide(currentSlide);
    }
    
    if (teacherProfiles.length > 0) {
        // 初期表示
        showSlide(0);
        
        // 自動スライド開始
        setInterval(autoSlide, slideInterval);
    }

    // 要素が画面内に入ったら表示するアニメーション
    const animateOnScroll = () => {
        // アニメーション対象の要素
        const animElements = document.querySelectorAll('.feature-card, .audience-group, .story-card, .teacher-profile');
        
        // 各要素をチェック
        animElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenHeight = window.innerHeight;
            
            // 要素が画面内に入ったらアニメーションクラスを追加
            if (elementPosition < screenHeight * 0.85) {
                element.classList.add('animate-in');
            }
        });
    }
    
    // スタイルを動的に追加
    function addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .feature-card, .audience-group, .story-card, .teacher-profile {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.8s ease, transform 0.8s ease;
            }
            
            .animate-in {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }
    
    // アニメーションスタイルを追加
    addAnimationStyles();
    
    // 初回実行とスクロール時に実行
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    // エラー表示のスタイルを追加
    const addErrorStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            .error {
                border-color: #ff3366 !important;
            }
            
            .form-message {
                padding: 15px;
                border-radius: 5px;
                margin-bottom: 20px;
                font-weight: 700;
            }
            
            .form-message.success {
                background-color: #e6ffec;
                color: #28a745;
                border: 1px solid #b7dfc6;
            }
            
            .form-message.error {
                background-color: #fff0f3;
                color: #ff3366;
                border: 1px solid #ffccd5;
            }
            
            .hidden {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    addErrorStyles();
});