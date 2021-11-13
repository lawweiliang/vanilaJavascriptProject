const draggable_list = document.getElementById('draggable-list');
const checkBtn = document.getElementById('checkBtn');

const listItems = [];
let startIndex;

const companyList = [
  'Microsoft',
  'Apple',
  'Saudi Aramco',
  'Alphabet',
  'Amazon',
  'Tesla',
  'Meta(Facebook)',
  'NVIDIA',
  'Berkshire Hathaway',
  'TSMC',
];

createList();

function createList() {
  [...companyList]
    .map((company) => ({ value: company, sort: Math.random() }))
    .sort(
      (companyObjectA, companyObjectB) =>
        companyObjectA.sort - companyObjectB.sort
    )
    .map((companyObject) => companyObject.value)
    .forEach((company, index) => {
      const listItem = document.createElement('li');

      listItem.setAttribute('data-index', index);

      listItem.innerHTML = `
      <span class="number">${index + 1}</span>
      <div class="draggable" draggable="true">
        <span class="company-name">${company}</span>
        <i class="fab fa-angellist"></i>
      </div>
      `;

      listItems.push(listItem);
      draggable_list.appendChild(listItem);
    });

  addEventListener();
}

function dragStart() {
  console.log('dragStart function');

  startIndex = this.getAttribute('data-index');
  console.log('startIndex', startIndex);
}

function dragOver(e) {
  console.log('dragOver function');
  e.preventDefault();
}
function dragDrop() {
  console.log('dragDrop function');

  endIndex = this.getAttribute('data-index');
  swapItem(startIndex, endIndex);

  this.classList.remove('over');
}
function dragEnter() {
  console.log('dragEnter function');

  this.classList.add('over');
}
function dragLeave() {
  console.log('dragLeave function');

  this.classList.remove('over');
}

function swapItem(fromIndex, toIndex) {
  const fromItem = listItems[fromIndex].querySelector('.draggable');
  const toItem = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].appendChild(toItem);
  listItems[toIndex].appendChild(fromItem);
}

function addEventListener() {
  const draggables = document.querySelectorAll('.draggable');
  const draggablesItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach((draggable) => {
    // draggable.addEventListener('dragstart', dragStart);
  });

  draggablesItems.forEach((draggableItem) => {
    draggableItem.addEventListener('dragstart', dragStart);
    draggableItem.addEventListener('dragover', dragOver);
    draggableItem.addEventListener('drop', dragDrop);
    draggableItem.addEventListener('dragenter', dragEnter);
    draggableItem.addEventListener('dragleave', dragLeave);
  });
}

function checkOrder() {
  listItems.forEach((listItem, index) => {
    const companyName = listItem
      .querySelector('.company-name')
      .innerText.trim();

    if (companyName != companyList[index]) {
      listItem.classList.add('wrong');
    } else {
      listItem.classList.remove('wrong');
      listItem.classList.add('correct');
    }
  });
}

checkBtn.addEventListener('click', checkOrder);
