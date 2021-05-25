function readURL(input) {
  if (input.files && input.files[0]) {
    var inputFileData = input.files[0];
    var reader = new FileReader();

    reader.onload = function(e) {
      $('.file-upload-placeholder').hide();
      $('.file-upload-image').attr('src', e.target.result);

      $('.file-upload-preview').show();
      $('.file-upload-btn').hide();

      $('.file-upload-filename').html(inputFileData.name);
    };

    reader.readAsDataURL(inputFileData);
  } else { removeUpload(); }
}

function removeUpload() {
  var $clone = $('.file-upload-input').val('').clone(true);
  $('.file-upload-input').replaceWith($clone);
  $('.file-upload-placeholder').show();
  $('.file-upload-preview').hide();
  $('.file-upload-btn').show();
}

$('.file-upload-placeholder').bind('dragover', function () {
  $('.file-upload-placeholder').addClass('image-dropping');
});

$('.file-upload-placeholder').bind('dragleave', function () {
  $('.file-upload-placeholder').removeClass('image-dropping');
});