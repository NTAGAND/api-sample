$(document).ready(function(){
 
    // show list of product on first load
    showProductsFirstPage();
 
    // when a 'read products' button was clicked
    $(document).on('click', '.read-products-button', function(){
        showProductsFirstPage();
    });
 
    // when a 'page' button was clicked
    $(document).on('click', '.pagination li', function(){
        // get json url
        var json_url=$(this).find('a').attr('data-page');
 
        // show list of products
        showProducts(json_url);
    });
 
});
 
function showProductsFirstPage(){
    var json_url="http://localhost/api/product/read_paging.php";
    showProducts(json_url);
}
 
// function to show list of products
function showProducts(json_url){
 
    // get list of products from the API
    $.getJSON(json_url, function(data){
 
        // html for listing products
        readProductsTemplate(data, "");
 
        // chage page title
        changePageTitle("Read Products");
 
    });
}

// pagination
if(data.paging){
    read_products_html+="<ul class='pagination pull-left margin-zero padding-bottom-2em'>";
 
        // first page
        if(data.paging.first!=""){
            read_products_html+="<li><a data-page='" + data.paging.first + "'>First Page</a></li>";
        }
 
        // loop through pages
        $.each(data.paging.pages, function(key, val){
            var active_page=val.current_page=="yes" ? "class='active'" : "";
            read_products_html+="<li " + active_page + "><a data-page='" + val.url + "'>" + val.page + "</a></li>";
        });
 
        // last page
        if(data.paging.last!=""){
            read_products_html+="<li><a data-page='" + data.paging.last + "'>Last Page</a></li>";
        }
    read_products_html+="</ul>";
}