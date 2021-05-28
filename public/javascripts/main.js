function readURL(input) {
  if (input.files && input.files[0]) {
    const inputFileData = input.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
      const filesize = inputFileData.size;

      $('.file-upload-placeholder').hide();
      $('.file-upload-image').attr('src', e.target.result);

      $('.file-upload-btn').hide();
      $('.file-upload-preview').show();

      if (filesize > 5242880) {
        $('.file-upload-filename').html("Maximum file size is 5MB !");
        $('.try').show();

        $('.file-upload-image').remove();
        $('.file-upload-process').remove();
        $('.file-upload-remove').remove();

        return;
      }

      $('.file-upload-filename').html(inputFileData.name);
    };

    reader.readAsDataURL(inputFileData);
  } else { removeUpload(); }
}

function removeUpload() {
  const $clone = $('.file-upload-input').val('').clone(true);
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