$(function(){
  var buildHTML = function(message) {
    if (message.content && message.image ) {
      var html = `<div class="main_chat__message-list__message" data-message-id=${message.id}>
        <div class="main_chat__message-list__message__info">
          <div class="main_chat__message-list__message__info__name">
            ${message.user_name}
          </div>
          <div class="main_chat__message-list__message__info__date">
            ${message.created_at}
          </div>
        </div>
        <div class="main_chat__message-list__message__content">
          <P class="main_chat__message-list__message__content__message-text">
            ${message.content}
          </p>
          <img src=${message.image} class="main_chat__message-list__message__content__image" >
        </div>
      </div>`
    return html;
    } else if (message.content) {
      var html = `<div class="main_chat__message-list__message" data-message-id =${message.id}>
        <div class="main_chat__message-list__message__info">
          <div class="main_chat__message-list__message__info__name">
            ${message.user_name}
          </div>
          <div class="main_chat__message-list__message__info__date">
            ${message.created_at}
          </div>
        </div>
        <div class="main_chat__message-list__message__content">
          <P class="main_chat__message-list__message__content__message-text">
            ${message.content}
          </p>
        </div>
      </div>`
    return html;     
    } else if (message.image) {
      var html = `<div class="main_chat__message-list__message" data-message-id=${message.id}>
        <div class="main_chat__message-list__message__info">
          <div class="main_chat__message-list__message__info__name">
            ${message.user_name}
          </div>
          <div class="main_chat__message-list__message__info__date">
            ${message.created_at}
          </div>
        </div>
      <div class="main_chat__message-list__message__content">
          <img src=${message.image} class="main_chat__message-list__message__content__image" >
        </div>
      </div>`
    };
    return html;
  };
  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')  
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.main_chat__message-list').append(html);
      $('form')[0].reset();
      $('.main_chat__message-list').animate({ scrollTop: $('.main_chat__message-list')[0].scrollHeight});
      $('.main_chat__form__submit').prop('disabled', false); 
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
  })
  var reloadMessages = function() {
    last_message_id = $('.main_chat__message-list__message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main_chat__message-list').append(insertHTML);
        $('.main_chat__message-list').animate({ scrollTop: $('.main_chat__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert("error");
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});