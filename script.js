// HTML 요소
const jsonForm = document.getElementById('jsonForm');
const modListDiv = document.getElementById('modList');
const dependenciesDiv = document.getElementById('dependencies');
const jsonOutput = document.getElementById('jsonOutput');
const downloadBtn = document.getElementById('downloadBtn');

// 모드와 종속성 추가 버튼
document.getElementById('addModBtn').addEventListener('click', addModField);
document.getElementById('addDependencyBtn').addEventListener('click', addDependencyField);

// 모드 입력 필드 추가
function addModField() {
  const modDiv = document.createElement('div');
  modDiv.classList.add('mod');

  modDiv.innerHTML = `
    <label>모드 이름:</label>
    <input type="text" class="modName" placeholder="모드 이름">
    <label>모드 URL:</label>
    <input type="url" class="modUrl" placeholder="모드 다운로드 URL">
    <button type="button" class="addDependencyBtn">종속성 추가</button>
    <div class="modDependencies"></div>
  `;
  
  modListDiv.appendChild(modDiv);

  // 종속성 추가 버튼 이벤트 리스너 추가
  modDiv.querySelector('.addDependencyBtn').addEventListener('click', () => addDependencyField(modDiv));
}

// 종속성 입력 필드 추가
function addDependencyField(modDiv = null) {
  const depDiv = document.createElement('div');
  depDiv.classList.add('dependency');

  depDiv.innerHTML = `
    <label>종속성 이름:</label>
    <input type="text" class="depName" placeholder="종속성 이름">
    <label>종속성 URL:</label>
    <input type="url" class="depUrl" placeholder="종속성 다운로드 URL">
  `;

  if (modDiv) {
    // 모드에 종속성 추가
    modDiv.querySelector('.modDependencies').appendChild(depDiv);
  } else {
    // 종속성이 모드에 속하지 않고 독립적으로 추가될 때
    dependenciesDiv.appendChild(depDiv);
  }
}

// JSON 생성 및 출력
jsonForm.addEventListener('input', generateJSON);

function generateJSON() {
  const name = document.getElementById('name').value;
  const author = document.getElementById('author').value;
  const description = document.getElementById('description').value;

  // 모드 리스트
  const modList = {};
  document.querySelectorAll('.mod').forEach(mod => {
    const modName = mod.querySelector('.modName').value;
    const modUrl = mod.querySelector('.modUrl').value;
    if (modName && modUrl) {
      // 종속성 처리
      const dependencies = {};
      mod.querySelectorAll('.dependency').forEach(dep => {
        const depName = dep.querySelector('.depName').value;
        const depUrl = dep.querySelector('.depUrl').value;
        if (depName && depUrl) {
          dependencies[depName] = depUrl;
        }
      });

      // 모드와 종속성을 그룹화
      modList[modName] = modUrl;
      if (Object.keys(dependencies).length > 0) {
        modList[modName] = { url: modUrl, dependencies: dependencies };
      }
    }
  });

  // JSON 객체
  const json = {
    type: "modpack",
    name: name,
    author: author,
    description: description,
    ModList: modList
  };

  jsonOutput.textContent = JSON.stringify(json, null, 2);
}

// JSON 파일 다운로드
downloadBtn.addEventListener('click', function() {
  const blob = new Blob([jsonOutput.textContent], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${document.getElementById('name').value || 'modpack'}.json`;
  link.click();
});
