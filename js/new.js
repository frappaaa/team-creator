let members = [];

function renderMembers(member) {
  localStorage.setItem('members', JSON.stringify(members));

  const list = document.querySelector('.js-member-list');
  const item = document.querySelector(`[data-key='${member.id}']`);
  
  if (member.deleted) {
    item.remove();
    if (members.length === 0) list.innerHTML = '';
    return
  }

  const isChecked = member.checked ? 'done': '';
  const node = document.createElement("li");
  node.setAttribute('class', `member-item ${isChecked}`);
  node.setAttribute('data-key', member.id);
  node.innerHTML = `
    <input id="${member.id}" type="checkbox"/>
    <label for="${member.id}" class="tick js-tick"></label>
    <span>${member.text}</span>
    <button class="delete-member js-delete-member">
    <svg><use href="#delete-icon"></use></svg>
    </button>
  `;

  if (item) {
    list.replaceChild(node, item);
  } else {
    list.append(node);
  }
}

function addmember(text) {
  const member = {
    text,
    checked: false,
    id: Date.now(),
  };

  members.push(member);
  renderMembers(member);
}

function toggleDone(key) {
  const index = members.findIndex(item => item.id === Number(key));
  members[index].checked = !members[index].checked;
  renderMembers(members[index]);
}

function deletemember(key) {
  const index = members.findIndex(item => item.id === Number(key));
  const member = {
    deleted: true,
    ...members[index]
  };
  members = members.filter(item => item.id !== Number(key));
  renderMembers(member);
}

const form = document.querySelector('.js-form');
form.addEventListener('submit', event => {
  event.preventDefault();
  const input = document.querySelector('.js-member-input');

  const text = input.value.trim();
  if (text !== '') {
    addmember(text);
    input.value = '';
    input.focus();
  }
});

const list = document.querySelector('.js-member-list');
list.addEventListener('click', event => {
  if (event.target.classList.contains('js-tick')) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }
  
  if (event.target.classList.contains('js-delete-member')) {
    const itemKey = event.target.parentElement.dataset.key;
    deletemember(itemKey);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const ref = localStorage.getItem('members');
  if (ref) {
    members = JSON.parse(ref);
    members.forEach(t => {
      renderMembers(t);
    });
  }
});