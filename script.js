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
  `;
  
  modListDiv.appendChild(modDiv);
}

// 종속성 입력 필드 추가
function addDependencyField() {
  const depDiv = document.createElement('div');
  depDiv.classList.add('dependency');

  depDiv.innerHTML = `
    <label>종속성 이름:</label>
    <input type="text" class="depName" placeholder="종속성 이름">
    <label>종속성 URL:</label>
    <input type="url" class="depUrl" placeholder="종속성 다운로드 URL">
  `;
  
  dependenciesDiv.appendChild(depDiv);
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
      modList[modName] = modUrl;
    }
  });

  // 종속성 리스트
  const dependencies = {};
  document.querySelectorAll('.dependency').forEach(dep => {
    const depName = dep.querySelector('.depName').value;
    const depUrl = dep.querySelector('.depUrl').value;
    if (depName && depUrl) {
      dependencies[depName] = depUrl;
    }
  });

  // JSON 객체
  const json = {
    type: "modpack",
    name: name,
    author: author,
    description: description,
    ModList: modList,
    Dependencies: dependencies
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
