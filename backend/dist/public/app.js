(function () {
  const isFileUploaderEmpty = () => uploadFile.files.length === 0;
  let uploadFile;
  let jsonViewer;

  function onFileChange(event) {
    if (!isFileUploaderEmpty()) {
      document.body.classList.remove('error');
    }
  }

  function onReady() {
    const btnSubmitId = '#btnSubmit';
    const fileId = '#uploadFile';
    const resultsWrapperId = '#results';

    const resultsWrapper = document.querySelector( resultsWrapperId );
    const btnSubmit = document.querySelector( btnSubmitId );

    uploadFile = document.querySelector( fileId );
    jsonViewer = jsonTree.create( [], resultsWrapper );

    btnSubmit.addEventListener( 'click', onValidateForm );
    uploadFile.addEventListener( 'change', onFileChange );
  }

  function onValidateForm( event ) {
    event.preventDefault();
    event.stopPropagation();

    if ( isFileUploaderEmpty() ) {
      document.body.classList.add( 'error' );
    }
    else {
      submitForm();
    }
    return false;
  }

  async function submitForm() {
    const url = '/upload';
    const formData = new FormData();
    
    formData.append( 'file', uploadFile.files[0] );
    
    const response = await fetch( url, {
        method: 'POST',
        body: formData
    });

    const json = response.ok ? await response.json() : [];
    
    jsonViewer.loadData( json );
    jsonViewer.expand();
  }

  document.addEventListener('readystatechange', () => {
    const complete = 'complete';
    if (document.readyState === complete) {
      onReady();
    }
  });
})();
