/* script.js - Ver 2.0 (Typewriter Effect) */

// [데이터베이스] 여기에 진짜 설정을 채워 넣으시면 됩니다.
const database = {
    'concept': `<h2>01. 핵심개념</h2><br><p><strong>[시스템 로그]</strong> 데이터 로딩 중...</p><br><p><strong>공명체 (Resonator):</strong><br> - 틈(Teum)과 동기화된 인간 매개체.<br> - 특정 파장을 통해 차원 간 간섭 가능.<br></p><br><p><strong>반입자 에너지 (Antimatter):</strong><br> - 미래(Mirae) 조직의 핵심 동력원.<br> - 불안정하지만 고효율의 출력을 냄.<br></p>`,
    
    'org': `<h2>02. 조직 데이터</h2><br><p><strong>미래BIO (Mirae Biotech):</strong><br> 표면적으로는 제약회사이나, 실제로는 '틈'을 연구하는 비밀 조직.</p><br><ul><li>기획팀: 시나리오 설계</li><li>연구팀: 반입자 및 공명체 실험</li><li>회수팀: 실패한 실험체 처리</li><li>대응팀: 외부 위협(주인공 등) 제거</li></ul>`,
    
    'timeline': `<h2>03. 타임라인</h2><br><p><strong>2019년 겨울:</strong><br> - 피실험체 '이석'의 기억 데이터 추출.<br> - '연화'의 희생으로 첫 번째 타임라인 분기 발생.</p><br><p><strong>2024년 현재:</strong><br> - 잔향기록(Reverberation) 프로젝트 가동.<br> - 불완전한 공명체들의 폭주 징후 포착.</p>`,
    
    'story': `<h2>04. 시나리오</h2><br><p><strong>프로젝트: 잔불 (Ember)</strong></p><p> - 등장인물: 희나, 희석</p><p> - 현재 진행: 2막 2편 집필 중.</p><p> - 목표: 희나의 각성과 희석의 딜레마를 통해 '틈'의 존재 증명.</p>`,
    
    'mirae': `<h2 style="color:#ff3366">05. 미래자료실 (기밀)</h2><br><p style="color:#ff3366; font-weight:bold;">[WARNING: RESTRICTED AREA]</p><br><p>접근 권한: <span style="color:#00ffcc">LEVEL 5</span> 이상</p><p>로그 데이터: 4K 관측 영상 원본 보관소.</p><p>상태: 암호화됨 (Decryption Required)</p>`
};

/* --- [시스템 기능] --- */

let typingTimer = null; // 타자기 효과를 제어하는 변수

// 삑 소리 내기 (효과음)
function playBeep(freq = 800, duration = 0.05, vol = 0.05) {
    try { 
        const ctx = new (window.AudioContext || window.webkitAudioContext)(); 
        const osc = ctx.createOscillator(); 
        const gain = ctx.createGain(); 
        osc.connect(gain); gain.connect(ctx.destination); 
        osc.type = 'square'; osc.frequency.value = freq; gain.gain.value = vol; 
        osc.start(); setTimeout(() => osc.stop(), duration * 1000); 
    } catch(e) {}
}

// 로그인 기능
function tryLogin() {
    playBeep(600, 0.1); // 버튼음
    const input = document.getElementById('passInput').value.toUpperCase();
    
    if (input === 'TEUM' || input === '2026') {
        // 음악 재생
        var audio = document.getElementById("bgm");
        audio.volume = 0.5;
        audio.play().then(() => {
            document.getElementById('sound-control').innerHTML = "🔊 BGM ON";
            document.getElementById('sound-control').style.color = "#00ffcc";
        }).catch(e => { console.log(e); });

        // 화면 전환 연출
        if(document.getElementById('login-form')) {
            document.getElementById('login-form').style.display = 'none';
            document.getElementById('success-msg').style.display = 'block';
        }
        playBeep(1200, 0.3); // 성공음

        setTimeout(() => {
            document.getElementById('login-screen').style.opacity = '0';
            setTimeout(() => { 
                document.getElementById('login-screen').style.display = 'none'; 
                document.getElementById('dashboard').style.display = 'block'; 
            }, 800);
        }, 2000);
    } else {
        playBeep(150, 0.3); 
        document.getElementById('msg').style.display = 'block';
    }
}

// ⭐ [핵심] 타자기 효과 함수 (Typewriter Effect)
function typeText(htmlContent, elementId, speed = 15) {
    const target = document.getElementById(elementId);
    target.innerHTML = ""; // 기존 내용 지우기
    let i = 0;
    
    // 혹시 이전에 돌고 있던 타이핑이 있다면 멈춤
    if (typingTimer) clearInterval(typingTimer);

    typingTimer = setInterval(() => {
        // 글자가 다 나오면 멈춤
        if (i >= htmlContent.length) {
            clearInterval(typingTimer);
            return;
        }

        let char = htmlContent[i];

        // 만약 '<' 가 나오면 (HTML 태그 시작), '>' 가 나올 때까지 한 번에 출력
        // (안 그러면 태그가 깨져서 화면이 이상해짐)
        if (char === '<') {
            let tag = "";
            while (htmlContent[i] !== '>' && i < htmlContent.length) {
                tag += htmlContent[i];
                i++;
            }
            tag += '>';
            i++;
            target.innerHTML += tag; // 태그는 한방에 추가
        } else {
            // 일반 글자는 한 글자씩 추가
            target.innerHTML += char;
            i++;
            // 타자기 소리 (너무 시끄러우면 아래 줄 삭제하세요)
            if (i % 3 === 0) playBeep(800, 0.01, 0.02); 
        }

        // 스크롤을 항상 맨 아래로 유지
        target.scrollTop = target.scrollHeight;

    }, speed); // 속도 조절 (숫자가 작을수록 빠름)
}

// 파일 열기 (타자기 효과 적용)
function openFile(id) { 
    playBeep(1000, 0.05); 
    document.getElementById('file-viewer').style.display = 'block'; 
    
    // 그냥 보여주는 게 아니라, 타자기 함수를 실행!
    typeText(database[id], 'viewer-content');
}

// 파일 닫기
function closeFile() { 
    playBeep(600, 0.05); 
    
    // 창 닫으면 타이핑도 멈춰야 함 (안 그러면 뒤에서 계속 소리남)
    if (typingTimer) clearInterval(typingTimer);
    
    document.getElementById('file-viewer').style.display = 'none'; 
    document.getElementById('viewer-content').innerHTML = ""; // 내용 비우기
}

// 소리 끄기/켜기
function toggleSound() {
    var audio = document.getElementById("bgm"); 
    var btn = document.getElementById("sound-control");
    if (audio.paused) { 
        audio.play(); btn.innerHTML = "🔊 BGM ON"; btn.style.color = "#00ffcc"; 
    } else { 
        audio.pause(); btn.innerHTML = "🔈 BGM OFF"; btn.style.color = "#555"; 
    }
}
