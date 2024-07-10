// ************************** //
/* function for dropdown menu */
// ************************** //

function toggleExtraContent(sectionId) {
    var section = document.getElementById(sectionId);
    if (section.style.display === 'block') {
        section.style.display = 'none';
    } else {
        section.style.display = 'block';
    }
}

function toggleNestedContent(nestedSectionId, link) {
    var nestedSections = document.querySelectorAll('.nested_content');
    var links = document.querySelectorAll('.menu_link');
    var isCurrentlyOpen = false;

    nestedSections.forEach(function(section) {
        if (section.id === nestedSectionId) {
            if (section.style.display === 'block') {
                section.style.display = 'none';
                isCurrentlyOpen = true;
            } else {
                section.style.display = 'block';
            }
        } else {
            section.style.display = 'none';
        }
    });

    if (!isCurrentlyOpen) {
        links.forEach(function(linkItem) {
            linkItem.classList.remove('bold');
        });
        link.classList.add('bold');
    } else {
        link.classList.remove('bold');
    }

}

// ************************************ //
/* function sidenotes on small screens */
// ************************************ //


document.addEventListener('DOMContentLoaded', function() {
    const sidenoteLinks = document.querySelectorAll('.side_note_mark');

    sidenoteLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const noteId = this.getAttribute('data-note-id');
            const sidenote = document.getElementById(`sidenote-${noteId}`);

            if (sidenote.style.display === 'block') {
                sidenote.style.display = 'none';
            } else {
                // Hide all sidenotes first (optional)
                document.querySelectorAll('.sidenote-container').forEach(function(note) {
                    note.style.display = 'none';
                });

                let clickX = e.pageX;
                let clickY = e.pageY;

                const margin = 100;
                const sidenoteWidth = 200;
                const viewportWidth = window.innerWidth;

                // Check if the sidenote will overflow on the right
                if (clickX + sidenoteWidth + margin > viewportWidth) {
                    clickX = viewportWidth - sidenoteWidth - margin;
                }

                // Check if the sidenote will overflow on the left
                if (clickX - margin < 0) {
                    clickX = margin;
                }

                // Check if the sidenote will overflow on the top
                if (clickY - margin < 0) {
                    clickY = margin;
                }

                sidenote.style.top = `${clickY}px`;
                sidenote.style.left = `${clickX}px`;

                sidenote.style.display = 'block';
            }
        });
    });

    const sidenoteContainers = document.querySelectorAll('.sidenote-container');

    sidenoteContainers.forEach(function(container) {
        container.addEventListener('click', function() {
            this.style.display = 'none';
        });
    });
});