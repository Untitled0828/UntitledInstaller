document.getElementById('addMod').addEventListener('click', function() {
  const modList = document.getElementById('modList');
  const newMod = document.createElement('div');
  newMod.classList.add('mod-entry');

  newMod.innerHTML = `
    <label for="mod-name">모드 이름:</label>
    <input type="text" name="mod-name" placeholder="모드 이름을 입력하세요" required>
    <label for="mod-url">모드 URL:</label>
    <input type="text" name="mod-url" placeholder="모드 URL을 입력하세요" required>
    <button type="button" class="remove-mod">모드 제거</button>
  `;

  modList.appendChild(newMod);

  newMod.querySelector('.remove-mod').addEventListener('click', function() {
    modList.removeChild(newMod);
  });
});

document.getElementById('addDependency').addEventListener('click', function() {
  const dependencyList = document.getElementById('dependencyList');
  const newDependency = document.createElement('div');
  newDependency.classList.add('mod-entry');

  newDependency.innerHTML = `
    <label for="dependency-name">종속성 이름:</label>
    <input type="text" name="dependency-name" placeholder="종속성 이름을 입력하세요" required>
    <label for="dependency-url">종속성 URL:</label>
    <input type="text" name="dependency-url" placeholder="종속성 URL을 입력하세요" required>
    <button type="button" class="remove-dependency">종속성 제거</button>
  `;

  dependencyList.appendChild(newDependency);

  newDependency.querySelector('.remove-dependency').addEventListener('click', function() {
    dependencyList.removeChild(newDependency);
  });
});

document.getElementById('modpack-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const modList = {};
  const mods = document.querySelectorAll('.mod-entry');
  
  mods.forEach(mod => {
    const modName = mod.querySelector('input[name="mod-name"]').value;
    const modUrl = mod.querySelector('input[name="mod-url"]').value;
    modList[modName] = modUrl;
  });

  const dependencies = {};
  const dependencyEntries = document.querySelectorAll('#dependencyList .mod-entry');
  
  dependencyEntries.forEach(dep => {
    const depName = dep.querySelector('input[name="dependency-name"]').value;
    const depUrl = dep.querySelector('input[name="dependency-url"]').value;
    dependencies[depName] = depUrl;
  });

  const modpack = {
    type: "modpack",
    name: document.getElementById('name').value,
    author: document.getElementById('author').value,
    description: document.getElementById('description').value,
    ModList: modList,
    Dependencies: dependencies
  };

  document.getElementById('jsonOutput').textContent = JSON.stringify(modpack, null, 2);
});
