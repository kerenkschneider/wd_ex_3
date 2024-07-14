
// ************************** //
/* function for dropdown menu */
// ************************** //

function toggleExtraContent(sectionId, linkElement) {
    var section = document.getElementById(sectionId);
    if (section.style.display === 'block') {
        section.style.display = 'none';
        localStorage.setItem(sectionId, 'closed');
        linkElement.textContent = '>>'; // Change text to >>
    } else {
        section.style.display = 'block';
        localStorage.setItem(sectionId, 'open');
        linkElement.textContent = '<<'; // Change text to <<
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
                localStorage.setItem(nestedSectionId, 'closed');
            } else {
                section.style.display = 'block';
                localStorage.setItem(nestedSectionId, 'open');
            }
        } else {
            section.style.display = 'none';
            localStorage.setItem(section.id, 'closed');
            localStorage.setItem(section.id + '_bold', 'false');
        }
    });
}


function applyStoredSidebarState() {
    var nestedSections = document.querySelectorAll('.nested_content');
    var extraSections = document.querySelectorAll('.extra_content'); // Assuming you have a class for these sections

    nestedSections.forEach(function(section) {
        var state = localStorage.getItem(section.id);
        var boldState = localStorage.getItem(section.id + '_bold');
        if (state === 'open') {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
        if (boldState === 'true') {
            var link = document.querySelector(`[data-section-id="${section.id}"]`);
            if (link) {
                link.classList.add('bold');
            }
        }
    });

    extraSections.forEach(function(section) {
        var state = localStorage.getItem(section.id);
        var boldState = localStorage.getItem(section.id + '_bold');
        if (state === 'open') {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
        if (boldState === 'true') {
            var link = document.querySelector(`[data-section-id="${section.id}"]`);
            if (link) {
                link.classList.add('bold');
            }
        }
    });
}



// *************************** //
/* function headline location */
// ************************** //



function adjustSectionPosition() {
    var headline = document.querySelector('.article_headline');
    var auther = document.querySelector('.main_auther');
    var section = document.querySelector('.main');
    if (section == null){
        var section = document.querySelector('.main_list_1');
    }

    var headlineHeight = headline.offsetHeight;

    if (auther != null){
        var autherHeight = auther.offsetHeight;
    }
    else{
        var autherHeight = 0;
    }
    
    if (window.innerWidth > 1150) {
        section.style.top = `${headlineHeight}px`;
    } else {
        section.style.top = `${headlineHeight + autherHeight}px`;
    }
}

// Adjust position on load and resize
window.addEventListener('load', adjustSectionPosition);
window.addEventListener('resize', adjustSectionPosition);


// ************************************ //
/* function sidenotes on small screens */
// ************************************ //


document.addEventListener('DOMContentLoaded', function() {
    const viewportWidth = window.innerWidth;
    
    // Check if viewport width is under 850px
    if (viewportWidth < 850) {
        const sidenoteLinks = document.querySelectorAll('.side_note_mark');
      
        sidenoteLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const noteId = this.getAttribute('data-note-id');
                const sidenote = document.getElementById(`sidenote-${noteId}`);
                var headline = document.querySelector('.article_headline');
                var auther = document.querySelector('.main_auther');
                var headlineHeight = headline.offsetHeight;
                var autherHeight = auther.offsetHeight;
        

                if (sidenote.style.display === 'block') {
                    sidenote.style.display = 'none';
                } else {
                    // Hide all sidenotes first (optional)
                    document.querySelectorAll('.sidenote-container').forEach(function(note) {
                        note.style.display = 'none';
                    });

                    let clickY = e.pageY - (headlineHeight + autherHeight)
                    let clickX = e.pageX;

                    const margin = 100;
                    const sidenoteWidth = 200;

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
    }
});


// ***************** //
/* function sidebar */
// **************** //

/* JavaScript function to toggle menu visibility */
function toggleMenu() {
    event.preventDefault(); // Prevent the default action of the link
    var menu = document.querySelector('.links_container');
    menu.classList.toggle('menu_visible');

    var menu = document.querySelector('.click_logo_container');
    menu.classList.toggle('menu_visible');

    var menuLink = document.querySelector('.open_main_sidebar');
    if (menu.classList.contains('menu_visible')) {
        menuLink.textContent = '<<'; // Change text to <<
    } else {
        menuLink.textContent = '>>'; // Change text back to >>
    }
}


// Call this function after the sidebar has been loaded
fetch('sidebar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('sidebar').innerHTML = data;
        applyStoredSidebarState(); // Apply stored state
    });
