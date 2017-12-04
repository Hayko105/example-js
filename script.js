function insertAfter(elem, refElem) {
    return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
}

if (body.querySelector('.venyoo-mobile-widget-viewport') != null) {
    body.querySelector('.venyoo-mobile-widget-viewport').setAttribute('style', '');
}

if (body.querySelector('body #header') != null) {
    // Site structure
    var page = document.createElement('div'),
        contentWrap = document.createElement('div'),
        navigation = document.createElement('div'),
        pageInsert = body.querySelector('body #container'),
        footer = body.querySelector('body .wrap_footer'),
        header = body.querySelector('body #header');

    page.setAttribute("id", "page");
    navigation.setAttribute("id", "navigation");
    contentWrap.setAttribute("id", "content-wrapper");

    insertAfter(page, pageInsert);
    body.querySelector('body #page').insertBefore(contentWrap, body.querySelector('body #page').firstChild);
    body.querySelector('body #page #content-wrapper').insertBefore(pageInsert, body.querySelector('body #page #content-wrapper').firstChild);
    body.querySelector('body #page').insertBefore(navigation, body.querySelector('body #page').firstChild);
    contentWrap.insertBefore(header, contentWrap.firstChild);
    insertAfter(footer, body.querySelector('body #page #content-wrapper #container'));

    // Get main page
    var currentLocation = window.location.pathname;
    if (currentLocation == '/') {
        body.querySelector('#page').classList.add('x-main-page');
    }

    // Creat mobile header
    var headerMob = document.createElement('div');
    headerMob.setAttribute("id", "header_mobile");
    body.querySelector('#page #header').insertBefore(headerMob, body.querySelector('#page #header').firstChild);

    var sideMenu = document.createElement('div');
    sideMenu.setAttribute("id", "side-menu");
    sideMenu.innerHTML = '<a href="javascript:void(0)"></a>';
    body.querySelector('#page #header #header_mobile').insertBefore(sideMenu, body.querySelector('#page #header #header_mobile').firstChild);

    var sidePhone = document.createElement('div');
    sidePhone.setAttribute("id", "side-phone");
    sidePhone.innerHTML = '<a href="tel:+74952553495"></a>';
    insertAfter(sidePhone, body.querySelector('#page #header_mobile #side-menu'));

    var logo = body.querySelector('#page #header #logo');
    insertAfter(logo, body.querySelector('#page #header_mobile #side-menu'));

    body.querySelector('#side-menu').onclick = function () {
        page.classList.toggle('opened');
    }
    body.querySelector('#content-wrapper #container').onclick = function () {
        if (body.querySelector('#page.opened') != null) {
            page.classList.remove('opened');
        }
    }

    // Creat navigation block
    var navSide = body.querySelector('#header .links'),
        navBlock = body.querySelector('#page #navigation'),
        nav = body.querySelector('#container #menu'),
        cart = body.querySelector('#header #new_cart');

    navBlock.insertBefore(cart, navBlock.firstChild);
    insertAfter(navSide, body.querySelector('#navigation #new_cart'));
    insertAfter(nav, body.querySelector('#navigation .links'));

    if (body.querySelector('#new_cart .heading') != null) {
        body.querySelector('#new_cart .heading a').setAttribute('href', '/simplecheckout/');
    }

    // Nav main menu dropdown
    if (body.querySelector('#navigation #menu > ul > li > div') != null) {

        var menuItem = body.querySelectorAll('#navigation #menu > ul > li div');
        for (var i = 0; i < menuItem.length; i++) {
            var toggleDrop = document.createElement('div');
            toggleDrop.classList.add("toggle_drop");
            menuItem[i].parentNode.insertBefore(toggleDrop, menuItem[i].parentNode.firstChild);
        }

        var menuItemDrop = body.querySelectorAll('#navigation #menu .toggle_drop');
        for (var j = 0; j < menuItemDrop.length; j++) {
            menuItemDrop[j].addEventListener('click', function () {
                this.classList.toggle('active');
            });
        }
    }
}

// Catalog
if (body.querySelector('.filter_wrap') != null) {
    // catalog menu
    var catalogMenu = document.createElement('div');
    catalogMenu.setAttribute("id", "catalog_menu");
    catalogMenu.innerHTML = '<a href="javascript:void(0)" id="link_1" class="_link">Категории</a><a href="javascript:void(0)" id="link_2" class="_link">Фильтр</a><a href="javascript:void(0)" id="link_3" class="_link">На странице</a>';

    insertAfter(catalogMenu, body.querySelector('#content .breadcrumb+h1'));

    // catalog menu drop blocks
    var catalogMenuDrop = document.createElement('div'),
        catalogList = body.querySelector('#column-left .kdo-box'),
        catalogFilter = body.querySelector('.filter_wrap'),
        catalogPager = body.querySelector('.product-filter + .wrap_pagination');

    catalogMenuDrop.setAttribute('id', 'catalog_menu_content');
    insertAfter(catalogMenuDrop, catalogMenu);

    catalogList.setAttribute('id', 'catalog_drop_block');
    catalogList.classList.add('link_1');
    catalogFilter.setAttribute('id', 'catalog_drop_block');
    catalogFilter.classList.add('link_2');
    catalogPager.setAttribute('id', 'catalog_drop_block');
    catalogPager.classList.add('link_3');

    catalogMenuDrop.insertBefore(catalogList, catalogMenuDrop.firstChild);
    insertAfter(catalogFilter, body.querySelector('#catalog_menu_content .kdo-box'));
    insertAfter(catalogPager, body.querySelector('#catalog_menu_content .filter_wrap'));

    var cLinks = body.querySelectorAll('#catalog_menu ._link');
    for (var i = 0; i < cLinks.length; i++) {
        cLinks[i].onclick = function (e) {

            if (body.querySelector('#catalog_menu ._link.active') != null) {
                if (this.classList.contains('active')) {
                    this.classList.remove('active');
                } else {
                    body.querySelector('#catalog_menu ._link.active').classList.remove('active');
                    this.classList.toggle('active');
                }
            } else {
                this.classList.toggle('active');
            }

            if (body.querySelector('#catalog_menu_content #catalog_drop_block.active') != null) {
                if (body.querySelector('#catalog_menu_content .' + this.id).classList.contains('active')) {
                    body.querySelector('#catalog_menu_content .' + this.id).classList.remove('active');
                } else {
                    body.querySelector('#catalog_menu_content #catalog_drop_block.active').classList.remove('active');
                    body.querySelector('#catalog_menu_content .' + this.id).classList.toggle('active');
                }
            } else {
                body.querySelector('#catalog_menu_content .' + this.id).classList.toggle('active');
            }

        }
    }

    var filterItem = body.querySelectorAll('#catalog_menu_content .filter_btns .btn_opt_click');
    for (var i = 0; i < filterItem.length; i++) {
        //filterItem[i].onclick = function(e){
        //this.classList.toggle('active');
        //}
    }

}

// Tabs
if (body.querySelector('.product_page #tabs') != null) {
    var tabCont = body.querySelectorAll('.tab-content');

    for (var i = 0; i < tabCont.length; i++) {
        var id = tabCont[i].id;
        insertAfter(tabCont[i], body.querySelector('#tabs >a[href*="' + id + '"]'));
    }
}
if (body.querySelector('.product_page .header_tabs') != null) {
    var tabCont = body.querySelectorAll('.my_tabs .box-content');

    for (var i = 0; i < tabCont.length; i++) {
        var id = tabCont[i].id;
        insertAfter(tabCont[i], body.querySelector('.header_tabs > a[onclick*="' + id + '"]'));
    }
}

// Cart 
setInterval(function () {
    if (body.querySelector('.simplecheckout-cart') != null) {
        var quanty = body.querySelectorAll('.simplecheckout-cart tbody tr .quantity img');

        for (var i = 0; i < quanty.length; i++) {
            quanty[i].setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=');
        }
    }
}, 50);

// Footer
var copyR = body.querySelector('#footer .powered');
insertAfter(copyR, body.querySelector('#returntomobile'));

var menuFooter = body.querySelectorAll('#footer #footwrap-2 .widget-title');
for (var j = 0; j < menuFooter.length; j++) {
    menuFooter[j].addEventListener('click', function () {
        this.classList.toggle('active');
    });
}

// Table scroll
if (body.querySelector('.wishlist-info table') != null) {
    var innerTable = body.querySelectorAll('.wishlist-info table');
    for (var i = 0; i < innerTable.length; i++) {
        if (innerTable[i].clientWidth > body.querySelector('.wishlist-info').clientWidth) {
            insert(
                innerTable[i],
                'after',
                '<div class="table-wrapper"><div class="table-scroll table-scroll_' + i + '"></div></div>'
            );
            body.querySelector('.table-scroll.table-scroll_' + i).appendChild(innerTable[i]);
        }
    }
}