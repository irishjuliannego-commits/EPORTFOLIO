/**
 * DOCUMENT-ONLY STANDALONE RENDERER (NO PDF VIEWER UI)
 * Renders PDF pages directly onto clean white A4 paper canvas elements
 * Zero toolbar, zero thumbnails, zero dark background, zero iframe/object tags
 */

(function () {
  'use strict';

  // Base64 helper
  function base64ToUint8Array(base64) {
    const raw = window.atob(base64);
    const rawLength = raw.length;
    const array = new Uint8Array(new ArrayBuffer(rawLength));
    for (let i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
  }

  // Setup worker
  if (window.pdfjsLib) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'js/vendor/pdf.worker.min.js';
  }

  /**
   * Renders all pages of a PDF document into a container as white paper canvas sheets
   * @param {string} base64Data - Base64 encoded PDF string
   * @param {string} containerId - Element ID to render pages into
   * @param {object} options - Optional configuration
   */
  window.renderCleanDocument = function (base64Data, containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (!window.pdfjsLib) {
      container.innerHTML = '<div class="doc-error-notice">PDF engine loading error. Please refresh or use Download button.</div>';
      return;
    }

    container.innerHTML = `
      <div class="doc-loading-indicator">
        <div class="doc-spinner"></div>
        <span>Rendering document page...</span>
      </div>
    `;

    try {
      const pdfData = base64ToUint8Array(base64Data);
      const loadingTask = window.pdfjsLib.getDocument({ data: pdfData });

      loadingTask.promise.then(function (pdf) {
        container.innerHTML = ''; // Clear loading indicator

        const totalPages = pdf.numPages;

        for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
          (function (num) {
            pdf.getPage(num).then(function (page) {
              // Create paper sheet wrapper
              const pageWrapper = document.createElement('div');
              pageWrapper.className = 'a4-paper-sheet';
              pageWrapper.setAttribute('data-page-number', num);

              // Calculate scale for sharp rendering (2.0x for retina/high-DPI display)
              const pixelRatio = Math.max(window.devicePixelRatio || 1, 2);
              const unscaledViewport = page.getViewport({ scale: 1 });
              
              // Target desktop rendering width around 900px
              const baseWidth = Math.min(window.innerWidth > 960 ? 900 : (window.innerWidth - 48), 900);
              const scale = (baseWidth / unscaledViewport.width) * pixelRatio;
              const viewport = page.getViewport({ scale: scale });

              const canvas = document.createElement('canvas');
              canvas.className = 'a4-canvas-page';
              const ctx = canvas.getContext('2d', { alpha: false });

              canvas.width = Math.floor(viewport.width);
              canvas.height = Math.floor(viewport.height);

              // Style dimensions for responsive fluid fit
              canvas.style.width = '100%';
              canvas.style.height = 'auto';

              const renderContext = {
                canvasContext: ctx,
                viewport: viewport
              };

              page.render(renderContext).promise.then(function () {
                // Page successfully rendered
              });

              pageWrapper.appendChild(canvas);

              // If multi-page, add subtle page indicator tag
              if (totalPages > 1) {
                const badge = document.createElement('div');
                badge.className = 'a4-page-badge';
                badge.textContent = `Page ${num} of ${totalPages}`;
                pageWrapper.appendChild(badge);
              }

              container.appendChild(pageWrapper);
            });
          })(pageNum);
        }
      }).catch(function (error) {
        console.error('PDF render error:', error);
        container.innerHTML = `
          <div class="doc-error-notice">
            <p>Unable to render document directly. Please use the Download button above.</p>
          </div>
        `;
      });
    } catch (e) {
      console.error('Data decode error:', e);
    }
  };

  // Lightbox Fullscreen viewer
  window.openDocumentFullscreen = function (containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let fsModal = document.getElementById('documentFsModal');
    if (!fsModal) {
      fsModal = document.createElement('div');
      fsModal.id = 'documentFsModal';
      fsModal.className = 'doc-fs-modal';
      fsModal.innerHTML = `
        <div class="doc-fs-backdrop"></div>
        <div class="doc-fs-content">
          <div class="doc-fs-bar">
            <span id="docFsTitle" style="font-weight: 600; color: #fff; font-size: 0.95rem;">Document Fullscreen View</span>
            <button class="doc-fs-close" aria-label="Close Fullscreen">&times;</button>
          </div>
          <div class="doc-fs-body" id="docFsBody"></div>
        </div>
      `;
      document.body.appendChild(fsModal);

      fsModal.querySelector('.doc-fs-close').addEventListener('click', closeFs);
      fsModal.querySelector('.doc-fs-backdrop').addEventListener('click', closeFs);
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && fsModal.classList.contains('active')) {
          closeFs();
        }
      });
    }

    function closeFs() {
      fsModal.classList.remove('active');
      document.body.style.overflow = '';
    }

    const fsBody = document.getElementById('docFsBody');
    fsBody.innerHTML = '';

    // Clone all paper sheets into the fullscreen view
    const sheets = container.querySelectorAll('.a4-paper-sheet');
    sheets.forEach(function (sheet) {
      const clone = sheet.cloneNode(true);
      // Re-draw canvas content onto clone canvas
      const originalCanvas = sheet.querySelector('canvas');
      const cloneCanvas = clone.querySelector('canvas');
      if (originalCanvas && cloneCanvas) {
        const cloneCtx = cloneCanvas.getContext('2d');
        cloneCanvas.width = originalCanvas.width;
        cloneCanvas.height = originalCanvas.height;
        cloneCtx.drawImage(originalCanvas, 0, 0);
      }
      fsBody.appendChild(clone);
    });

    fsModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

})();
