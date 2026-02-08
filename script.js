const database = {
    'concept': `<h2>01. 핵심개념</h2><p><strong>공명체:</strong> 틈과 동기화된 매개체</p><p><strong>반입자 에너지:</strong> 미래의 핵심 동력원</p>`,
    'org': `<h2>02. 조직 데이터</h2><p><strong>미래BIO:</strong> 기획, 연구, 회수, 대응팀으로 구성</p>`,
    'timeline': `<h2>03. 타임라인</h2><p>2019년 겨울, 이석의 기억과 연화의 희생</p>`,
    'story': `<h2>04. 시나리오</h2><p>잔불: 희나와 희석의 서사 (2막 2편)</p>`,
    'mirae': `<h2 style="color:#ff3366">05. 미래자료실 (기밀)</h2><p style="color:#ff3366">[기밀] 4K 관측 로그 데이터 보관소</p>`
};

function playBeep(freq = 800, duration = 0.05) {
    try { const ctx = new (window.AudioContext || window.webkitAudioContext)(); const osc = ctx.createOscillator(); const gain = ctx.createGain(); osc.connect(gain); gain.connect(ctx.destination); osc.type = 'square'; osc.frequency.value = freq; gain.gain.value = 0.05; osc.start(); setTimeout(() => osc.stop(), duration * 1000); } catch(e) {}
}

function tryLogin() {
    playBeep(600, 0.1);
    const input = document.getElementById('passInput').value.toUpperCase();
    
    // 비밀번호 확인
    if (input === 'TEUM' || input === '2026') {
        
        // 1. 음악 재생
        var audio = document.getElementById("bgm");
        audio.volume = 0.5;
        audio.play().then(() => {
            document.getElementById('sound-control').innerHTML = "🔊 BGM ON";
            document.getElementById('sound-control').style.color = "#00ffcc";
        }).catch(e => { console.log(e); });

        // 2. [연출] 입력창 숨기고 -> 환영 메시지 보여주기
        document.getElementById('login-form').style.display = 'none'; // 입력창 끄기
        document.getElementById('success-msg').style.display = 'block'; // 환영 메시지 켜기
        playBeep(1200, 0.3); // 성공 효과음 삑!

        // 3. 2초 뒤에 대시보드로 이동
        setTimeout(() => {
            document.getElementById('login-screen').style.opacity = '0'; // 서서히 사라짐
            setTimeout(() => { 
                document.getElementById('login-screen').style.display = 'none'; 
                document.getElementById('dashboard').style.display = 'block'; 
            }, 800);
        }, 2000); // 여기서 2000이 2초 대기 시간입니다.

    } else {
        playBeep(150, 0.3); document.getElementById('msg').style.display = 'block';
    }
}

function openFile(id) { playBeep(1000, 0.05); document.getElementById('viewer-content').innerHTML = database[id]; document.getElementById('file-viewer').style.display = 'block'; }
function closeFile() { playBeep(600, 0.05); document.getElementById('file-viewer').style.display = 'none'; }
function toggleSound() {
    var audio = document.getElementById("bgm"); var btn = document.getElementById("sound-control");
    if (audio.paused) { audio.play(); btn.innerHTML = "🔊 BGM ON"; btn.style.color = "#00ffcc"; } else { audio.pause(); btn.innerHTML = "🔈 BGM OFF"; btn.style.color = "#555"; }
}
