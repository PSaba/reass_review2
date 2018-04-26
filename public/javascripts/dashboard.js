let groupSelector;
let groupTagsContainer;
  let groups = [
  'School',
  'Crap',
  'Life',
  'Death'
]

function updateGroupSelector() {
    groupSelector.text('');
    groupSelector.append('<option disabled selected>-- Select a group --</option>');
        groups.forEach(function(group) { groupSelector.append(`
            <option value="${group}">${group}</option>`); 
        });
}

function addGroupTag(group) {
  groupTagsContainer.append(`<div class="group-tag btn btn-info">
     <span class="remove-group-tag">X</span> ${group}
 </div>`);
}

function removeGroupTap(group){
    groupTagsContainer.remove(`<div class="group-tag btn btn-info">
     <span class="remove-group-tag">X</span> ${group}
 </div>`);
}

$(function() {
    groupSelector = $('#group-selector');
    groupTagsContainer = $('#group-tags-container');
    updateGroupSelector();

    groupSelector.on('change', function(e) {
    let group = e.target.value;
    addGroupTag(group);
    let index = groups.indexOf(group);
    groups.splice(index, 1);
        updateGroupSelector();
    });

    groupTagsContainer.on('click', '.remove-group-tag', function(e){
        const target = $(e.target);
        const groupName = target.text();
        groupSelector.append(`<option value="${groupName}">${groupName}</option>`);
        target.parent().remove();
    });
})