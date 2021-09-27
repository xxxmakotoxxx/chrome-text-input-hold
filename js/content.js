$(document).bind('input', function(e){
  const $target_element = $(e.target);
  if (!$target_element.is('textarea') && !$target_element.is('input[type="text"]')) return;

  var input = window.getSelection().toString();
  const id = e.target.id || $(e.target).closest("[id]").attr('id');
  const input_text_info = {
    url: e.currentTarget.URL,
    id: id,
    text: e.target.value,
  };
  chrome.storage.local.get('hold_text_list', function(items) {
    let new_history = items.hold_text_list.filter(hold_text => {
      if (hold_text.url != input_text_info.url || hold_text.id != input_text_info.id) return true;
    });
    if (new_history.length >= 100) {
      new_history = new_history.slice(0, 99);
    }
    new_history.unshift(input_text_info);
    chrome.storage.local.set({'hold_text_list': new_history}, function(items) {});
  });
});
