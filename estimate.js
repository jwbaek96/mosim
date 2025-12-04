// ===========================
// 장례 견적 페이지 로직
// ===========================

let currentStep = 1;
let userIntent = '';
let formData = {};

// 지역별 구/군 데이터
const districtData = {
    '서울': ['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'],
    '경기': ['수원시', '성남시', '고양시', '용인시', '부천시', '안산시', '안양시', '남양주시', '화성시', '평택시', '의정부시', '시흥시', '파주시', '김포시', '광명시', '광주시', '군포시', '하남시', '오산시', '양주시', '이천시', '구리시', '안성시', '포천시', '의왕시', '양평군', '여주시', '동두천시', '과천시', '가평군', '연천군'],
    '부산': ['중구', '서구', '동구', '영도구', '부산진구', '동래구', '남구', '북구', '해운대구', '사하구', '금정구', '강서구', '연제구', '수영구', '사상구', '기장군'],
    '대구': ['중구', '동구', '서구', '남구', '북구', '수성구', '달서구', '달성군'],
    '인천': ['중구', '동구', '미추홀구', '연수구', '남동구', '부평구', '계양구', '서구', '강화군', '옹진군'],
    '광주': ['동구', '서구', '남구', '북구', '광산구'],
    '대전': ['동구', '중구', '서구', '유성구', '대덕구'],
    '울산': ['중구', '남구', '동구', '북구', '울주군'],
    '세종': ['세종시'],
    '강원': ['춘천시', '원주시', '강릉시', '동해시', '태백시', '속초시', '삼척시', '홍천군', '횡성군', '영월군', '평창군', '정선군', '철원군', '화천군', '양구군', '인제군', '고성군', '양양군'],
    '충북': ['청주시', '충주시', '제천시', '보은군', '옥천군', '영동군', '증평군', '진천군', '괴산군', '음성군', '단양군'],
    '충남': ['천안시', '공주시', '보령시', '아산시', '서산시', '논산시', '계룡시', '당진시', '금산군', '부여군', '서천군', '청양군', '홍성군', '예산군', '태안군'],
    '전북': ['전주시', '군산시', '익산시', '정읍시', '남원시', '김제시', '완주군', '진안군', '무주군', '장수군', '임실군', '순창군', '고창군', '부안군'],
    '전남': ['목포시', '여수시', '순천시', '나주시', '광양시', '담양군', '곡성군', '구례군', '고흥군', '보성군', '화순군', '장흥군', '강진군', '해남군', '영암군', '무안군', '함평군', '영광군', '장성군', '완도군', '진도군', '신안군'],
    '경북': ['포항시', '경주시', '김천시', '안동시', '구미시', '영주시', '영천시', '상주시', '문경시', '경산시', '군위군', '의성군', '청송군', '영양군', '영덕군', '청도군', '고령군', '성주군', '칠곡군', '예천군', '봉화군', '울진군', '울릉군'],
    '경남': ['창원시', '진주시', '통영시', '사천시', '김해시', '밀양시', '거제시', '양산시', '의령군', '함안군', '창녕군', '고성군', '남해군', '하동군', '산청군', '함양군', '거창군', '합천군'],
    '제주': ['제주시', '서귀포시']
};

// DOM이 로드된 후 이벤트 리스너 등록
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== estimate.js DOMContentLoaded 실행 ===');
    
    // Step 1: 의도 선택
    const intentButtons = document.querySelectorAll('.option-card, .option-card-full');
    console.log('의도 선택 버튼 개수:', intentButtons.length);
    
    intentButtons.forEach((card, index) => {
        console.log(`버튼 ${index + 1}:`, card.getAttribute('data-intent'));
        card.addEventListener('click', function() {
            console.log('버튼 클릭됨:', this.getAttribute('data-intent'));
            // 선택 표시
            document.querySelectorAll('.option-card, .option-card-full').forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            
            // 의도 저장
            userIntent = this.getAttribute('data-intent');
            formData.intent = userIntent;
            console.log('userIntent 저장됨:', userIntent);
            console.log('formData:', formData);
        });
    });

    // 지역 선택 버튼
    const locationButtons = document.querySelectorAll('.location-btn');
    console.log('지역 선택 버튼 개수:', locationButtons.length);
    
    locationButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            console.log('지역 버튼 클릭됨:', this.getAttribute('data-location'));
            // 선택 표시
            document.querySelectorAll('.location-btn').forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            
            // 지역 저장
            formData.location = this.getAttribute('data-location');
            console.log('지역 저장됨:', formData.location);
        });
    });

    // 조문객 수 선택
    const attendeesButtons = document.querySelectorAll('[data-attendees]');
    console.log('조문객 수 버튼 개수:', attendeesButtons.length);
    
    attendeesButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            console.log('조문객 수 버튼 클릭됨:', this.getAttribute('data-attendees'));
            // 선택 표시
            document.querySelectorAll('[data-attendees]').forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            
            // 조문객 수 저장
            formData.attendees = this.getAttribute('data-attendees');
            console.log('조문객 수 저장됨:', formData.attendees);
        });
    });

    // 장례 준비 상황 선택
    const preparationButtons = document.querySelectorAll('[data-preparation]');
    console.log('준비 상황 버튼 개수:', preparationButtons.length);
    
    preparationButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            console.log('준비 상황 버튼 클릭됨:', this.getAttribute('data-preparation'));
            // 선택 표시
            document.querySelectorAll('[data-preparation]').forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            
            // 준비 상황 저장
            formData.preparation = this.getAttribute('data-preparation');
            console.log('준비 상황 저장됨:', formData.preparation);
        });
    });

    // 라디오 카드 시각적 피드백
    const radioCards = document.querySelectorAll('.radio-card');
    console.log('라디오 카드 개수:', radioCards.length);
    
    radioCards.forEach(card => {
        const radio = card.querySelector('input[type="radio"]');
        
        if (radio) {
            card.addEventListener('click', function() {
                console.log('라디오 카드 클릭됨:', radio.name, '=', radio.value);
                // 같은 그룹의 다른 카드 선택 해제
                const name = radio.getAttribute('name');
                document.querySelectorAll(`input[name="${name}"]`).forEach(r => {
                    r.closest('.radio-card').classList.remove('selected');
                });
                
                // 현재 카드 선택
                radio.checked = true;
                card.classList.add('selected');
                console.log('라디오 선택됨:', radio.checked);
            });
        }
    });
    
    // 전체 동의 체크박스
    const agreeAllCheckbox = document.getElementById('agreeAll');
    const termCheckboxes = document.querySelectorAll('.term-checkbox');
    
    if (agreeAllCheckbox) {
        agreeAllCheckbox.addEventListener('change', function() {
            termCheckboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
        });
        
        termCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const allChecked = Array.from(termCheckboxes).every(cb => cb.checked);
                agreeAllCheckbox.checked = allChecked;
            });
        });
    }

    // 전화번호 자동 포맷팅
    const phoneInput = document.querySelector('input[name="phone"]');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            const cursorPosition = e.target.selectionStart;
            let value = e.target.value.replace(/[^0-9]/g, '');
            
            if (value.length > 11) {
                value = value.slice(0, 11);
            }
            
            let formattedValue = '';
            if (value.length >= 7) {
                formattedValue = value.replace(/(\d{3})(\d{4})(\d{0,4})/, '$1-$2-$3');
            } else if (value.length >= 4) {
                formattedValue = value.replace(/(\d{3})(\d{0,4})/, '$1-$2');
            } else {
                formattedValue = value;
            }
            
            e.target.value = formattedValue;
            
            // 백스페이스로 인한 입력인 경우 커서 위치 조정
            if (e.inputType === 'deleteContentBackward') {
                // 하이픈이 삭제된 경우 커서를 하나 더 뒤로
                const oldHyphens = (e.target.value.match(/-/g) || []).length;
                const newHyphens = (formattedValue.match(/-/g) || []).length;
                
                if (newHyphens < oldHyphens) {
                    e.target.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
                }
            }
        });
        
        phoneInput.addEventListener('keydown', function(e) {
            // 백스페이스 키를 눌렀을 때
            if (e.key === 'Backspace') {
                const cursorPosition = e.target.selectionStart;
                const value = e.target.value;
                
                // 커서가 하이픈 바로 뒤에 있을 때
                if (cursorPosition > 0 && value[cursorPosition - 1] === '-') {
                    e.preventDefault();
                    // 하이픈과 그 앞의 숫자를 함께 삭제
                    const newValue = value.slice(0, cursorPosition - 2) + value.slice(cursorPosition);
                    // 숫자만 추출해서 다시 포맷팅
                    let numbersOnly = newValue.replace(/[^0-9]/g, '');
                    
                    if (numbersOnly.length >= 7) {
                        numbersOnly = numbersOnly.replace(/(\d{3})(\d{4})(\d{0,4})/, '$1-$2-$3');
                    } else if (numbersOnly.length >= 4) {
                        numbersOnly = numbersOnly.replace(/(\d{3})(\d{0,4})/, '$1-$2');
                    }
                    
                    e.target.value = numbersOnly;
                    // 커서 위치 조정
                    const newCursorPos = cursorPosition - 2;
                    e.target.setSelectionRange(newCursorPos, newCursorPos);
                }
            }
        });
    }
    
    console.log('=== 모든 이벤트 리스너 등록 완료 ===');
});

// 연락처 입력으로 이동
function goToContact() {
    const currentStepEl = document.querySelector('.form-step.active');
    
    // 준비 상황 선택 확인
    if (!formData.preparation) {
        alert('장례 준비 상황을 선택해주세요.');
        return;
    }
    
    currentStepEl.classList.remove('active');
    document.getElementById('step3').classList.add('active');
    currentStep = 3;
    updateProgressBar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 다음 버튼으로 수동 이동
function nextStepManual() {
    const currentStepEl = document.querySelector('.form-step.active');
    
    // Step 1: 의도 선택 확인
    if (currentStepEl.id === 'step1') {
        if (!userIntent) {
            alert('옵션을 선택해주세요.');
            return;
        }
        currentStepEl.classList.remove('active');
        
        if (userIntent === 'cost' || userIntent === 'both') {
            document.getElementById('step2-cost').classList.add('active');
        } else if (userIntent === 'process') {
            document.getElementById('step2-process').classList.add('active');
        }
        currentStep = 2;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    
    // Step 2-district: 구 선택 확인
    if (currentStepEl.id === 'step2-district') {
        if (!formData.district) {
            alert('구를 선택해주세요.');
            return;
        }
        currentStepEl.classList.remove('active');
        document.getElementById('step2-attendees').classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    
    // Step 2-attendees: 조문객 수 확인
    if (currentStepEl.id === 'step2-attendees') {
        if (!formData.attendees) {
            alert('예상 조문객 수를 선택해주세요.');
            return;
        }
        currentStepEl.classList.remove('active');
        document.getElementById('step2-preparation').classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    
    // 기본 nextStep 동작
    nextStep();
}

// 회원가입 제출
function submitSignup() {
    const phoneInput = document.querySelector('#step3 input[name="phone"]');
    const terms = document.querySelectorAll('#step3 .term-checkbox');
    
    // 전화번호 확인
    if (!phoneInput.value.trim()) {
        alert('핸드폰 번호를 입력해주세요.');
        phoneInput.focus();
        return;
    }
    
    // 필수 약관 동의 확인
    let allChecked = true;
    terms.forEach(term => {
        if (!term.checked) {
            allChecked = false;
        }
    });
    
    if (!allChecked) {
        alert('필수 약관에 모두 동의해주세요.');
        return;
    }
    
    formData.phone = phoneInput.value.trim();
    
    // 완료 화면으로 이동
    document.getElementById('step3').classList.remove('active');
    document.getElementById('step4').classList.add('active');
    currentStep = 4;
    updateProgressBar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 모달 닫기
function closeModal() {
    if (confirm('작성 중인 내용이 사라집니다. 정말 닫으시겠습니까?')) {
        window.location.href = 'index.html';
    }
}

// 지역 선택 후 구 선택으로 이동
function nextStepToDistrict() {
    const currentStepEl = document.querySelector('.form-step.active');
    
    // 지역이 선택되었는지 확인
    if (!formData.location) {
        alert('지역을 선택해주세요.');
        return;
    }
    
    currentStepEl.classList.remove('active');
    
    // 세부 지역 선택 화면 표시
    const districtStep = document.getElementById('step2-district');
    updateDistrictOptions(formData.location);
    districtStep.classList.add('active');
    
    updateProgressBar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 선택된 지역에 맞게 구/군 옵션 업데이트
function updateDistrictOptions(location) {
    const locationGrid = document.querySelector('#step2-district .location-grid');
    const districts = districtData[location] || [];
    
    // 기존 버튼 제거
    locationGrid.innerHTML = '';
    
    // 새 버튼 생성
    districts.forEach(district => {
        const button = document.createElement('button');
        button.className = 'district-btn';
        button.setAttribute('data-district', district);
        button.textContent = district;
        
        // 클릭 이벤트 추가
        button.addEventListener('click', function() {
            console.log('동적 생성된 구 버튼 클릭됨:', district);
            document.querySelectorAll('.district-btn').forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            formData.district = this.getAttribute('data-district');
            console.log('구 저장됨:', formData.district);
        });
        
        locationGrid.appendChild(button);
    });
}

// 구 선택에서 뒤로가기
function prevStepFromDistrict() {
    document.getElementById('step2-district').classList.remove('active');
    document.getElementById('step2-cost').classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 다음 단계로 이동
function nextStep() {
    const currentStepEl = document.querySelector('.form-step.active');
    
    // 유효성 검사
    if (!validateCurrentStep()) {
        return;
    }
    
    // 현재 단계 숨기기
    currentStepEl.classList.remove('active');
    
    // 다음 단계 결정
    let nextStepId = '';
    
    if (currentStep === 1) {
        // Step 1에서 의도에 따라 분기
        if (userIntent === 'cost') {
            nextStepId = 'step2-cost';
        } else if (userIntent === 'process') {
            nextStepId = 'step2-process';
        } else if (userIntent === 'both') {
            nextStepId = 'step2-cost';
        }
        currentStep = 2;
    } else if (currentStepEl.id === 'step2-cost') {
        // 지역 선택에서는 nextStepToDistrict 함수 사용
        return;
    } else if (currentStepEl.id === 'step2-district') {
        // 구 선택 후 조문객 수로
        nextStepId = 'step2-attendees';
        currentStep = 2;
    } else if (currentStepEl.id === 'step2-attendees') {
        // 조문객 수 선택 후 준비 상황으로
        nextStepId = 'step2-preparation';
        currentStep = 2;
    } else if (currentStepEl.id === 'step2-preparation') {
        // 준비 상황 선택 후 연락처로 (goToContact 함수 사용)
        return;
    } else if (currentStep === 2) {
        nextStepId = 'step3';
        currentStep = 3;
    } else if (currentStep === 3) {
        nextStepId = 'step4';
        currentStep = 4;
    }
    
    // 다음 단계 표시
    if (nextStepId) {
        document.getElementById(nextStepId).classList.add('active');
    }
    
    // 진행 상태 업데이트
    updateProgressBar();
    
    // 상단으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 이전 단계로 이동
function prevStep() {
    const currentStepEl = document.querySelector('.form-step.active');
    currentStepEl.classList.remove('active');
    
    let prevStepId = '';
    
    if (currentStep === 2) {
        prevStepId = 'step1';
        currentStep = 1;
    } else if (currentStep === 3) {
        // Step 3에서 의도에 따라 분기
        if (userIntent === 'cost') {
            prevStepId = 'step2-cost';
        } else if (userIntent === 'process') {
            prevStepId = 'step2-process';
        } else if (userIntent === 'both') {
            prevStepId = 'step2-both';
        }
        currentStep = 2;
    }
    
    if (prevStepId) {
        document.getElementById(prevStepId).classList.add('active');
    }
    
    updateProgressBar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 진행 상태 바 업데이트
function updateProgressBar() {
    document.querySelectorAll('.progress-step').forEach((step, index) => {
        const stepNumber = index + 1;
        
        if (stepNumber < currentStep) {
            step.classList.add('completed');
            step.classList.remove('active');
        } else if (stepNumber === currentStep) {
            step.classList.add('active');
            step.classList.remove('completed');
        } else {
            step.classList.remove('active', 'completed');
        }
    });
}

// 현재 단계 유효성 검사
function validateCurrentStep() {
    const currentStepEl = document.querySelector('.form-step.active');
    
    if (currentStep === 1) {
        if (!userIntent) {
            alert('옵션을 선택해주세요.');
            return false;
        }
    } else if (currentStep === 2) {
        // Step 2 라디오 버튼 검사
        const radioInputs = currentStepEl.querySelectorAll('input[type="radio"]');
        const selectInputs = currentStepEl.querySelectorAll('select');
        
        let hasSelection = false;
        
        radioInputs.forEach(radio => {
            if (radio.checked) {
                hasSelection = true;
                formData[radio.name] = radio.value;
            }
        });
        
        selectInputs.forEach(select => {
            if (select.value) {
                formData[select.name] = select.value;
            }
        });
        
        if (radioInputs.length > 0 && !hasSelection) {
            alert('항목을 선택해주세요.');
            return false;
        }
    } else if (currentStep === 3) {
        // Step 3 필수 입력 검사
        const nameInput = currentStepEl.querySelector('input[name="name"]');
        const phoneInput = currentStepEl.querySelector('input[name="phone"]');
        const privacyCheckbox = currentStepEl.querySelector('input[name="privacy"]');
        
        if (nameInput && !nameInput.value.trim()) {
            alert('이름을 입력해주세요.');
            nameInput.focus();
            return false;
        }
        
        if (phoneInput && !phoneInput.value.trim()) {
            alert('연락처를 입력해주세요.');
            phoneInput.focus();
            return false;
        }
        
        // 전화번호 형식 검증 (간단한 버전)
        if (phoneInput) {
            const phonePattern = /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/;
            if (!phonePattern.test(phoneInput.value.replace(/-/g, ''))) {
                alert('올바른 연락처 형식을 입력해주세요.\n예: 010-1234-5678');
                phoneInput.focus();
                return false;
            }
        }
        
        if (privacyCheckbox && !privacyCheckbox.checked) {
            alert('개인정보 수집 및 이용에 동의해주세요.');
            return false;
        }
        
        // 폼 데이터 저장
        if (nameInput) formData.name = nameInput.value.trim();
        if (phoneInput) formData.phone = phoneInput.value.trim();
        
        const emailInput = currentStepEl.querySelector('input[name="email"]');
        const contactTimeSelect = currentStepEl.querySelector('select[name="contact-time"]');
        const messageTextarea = currentStepEl.querySelector('textarea[name="message"]');
        
        if (emailInput) formData.email = emailInput.value.trim();
        if (contactTimeSelect) formData.contactTime = contactTimeSelect.value;
        if (messageTextarea) formData.message = messageTextarea.value.trim();
    }
    
    return true;
}

// 폼 제출
function submitForm() {
    if (!validateCurrentStep()) {
        return;
    }
    
    // 실제 환경에서는 서버로 데이터 전송
    console.log('폼 데이터:', formData);
    
    // 로컬 스토리지에 저장 (데모용)
    try {
        localStorage.setItem('estimateRequest', JSON.stringify({
            ...formData,
            timestamp: new Date().toISOString()
        }));
    } catch (e) {
        console.error('저장 실패:', e);
    }
    
    // 데모: 즉시 다음 단계로
    nextStep();
}

// 페이지 이탈 경고 (데이터 입력 중일 때)
window.addEventListener('beforeunload', function(e) {
    if (currentStep > 1 && currentStep < 4) {
        e.preventDefault();
        e.returnValue = '';
        return '';
    }
});
