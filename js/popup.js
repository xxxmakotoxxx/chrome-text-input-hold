$(function() {
  // strageの入力テキスト一覧を取得
  chrome.storage.local.get('hold_text_list', function(items) {
    if (Object.keys(items).length == 0) {
      chrome.storage.local.set({'hold_text_list': []}, function() {
        chrome.storage.local.get('hold_text_list', function(init_items) {
          createElemtnts(init_items);
        });
      });
    } else {
      createElemtnts(items);
    }
  });
  // イベント登録(クリックされたらコピー)
  $(document).on("click", "#text_input_history ul li textarea", function (e) {
    const temp_textarea_for_copy = $('#temp_textarea_for_copy');
    temp_textarea_for_copy.show();
    temp_textarea_for_copy.val(e.target.value);
    temp_textarea_for_copy.select();
    document.execCommand('copy');
    temp_textarea_for_copy.hide();
  });

  function createElemtnts(items) {
    if (items.hold_text_list.length == 0) {
      const html = '<p>テキスト履歴がありません</p>'
      $("#text_input_history ul").append(html);
    } else {
      for(item of items.hold_text_list) {
        // popup.html内に埋め込む
        const html = '<li class="list-group-item"><textarea readonly class="text-input-item">' + item.text + '</textarea></li>'
        $("#text_input_history ul").append(html);
      }
    }
  }
});
