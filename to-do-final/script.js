$(document).ready(function(){
function showToast(message) {
    $(".toast").text(message).fadeIn();
    setTimeout(function () {
        $(".toast").fadeOut();
    }, 2000);
}
let editingCard = null;
let itemsArray=[];
let titleArray=[];//new
    $('.add-item').click(function(e){
        e.preventDefault();
        let newItem=$('.input-item').val().trim();
        if(newItem!==""){
            $('.items').append(`<li>${newItem} <img class="cross" src="images/close.png" alt=""></li>`);
            $('.input-item').val("");
            $('.items').show();
            itemsArray.push(newItem);
        }
    });

     $(document).on('click','.cross',function(e){
      e.preventDefault();
      let li=$(this).closest('li');
        let index = li.index(); 
        itemsArray.splice(index,1);
        li.remove();
     });

   $(document).on('click', '.edit', function (e) {
    e.preventDefault();
    editingCard = $(this).closest('.to-do-card');
    let title = editingCard.find('h2').text();
    $('.input-title').val(title);
    $('.items').empty().show();
    itemsArray = [];
    editingCard.find('ul li').each(function () {
        let text = $(this).text();
        $('.items').append(`<li>${text}<img class="cross" src="images/close.png" alt=""></li>`);
        itemsArray.push(text);
    });
});

    $('.submit').click(function(e){
         e.preventDefault();
         let newTitle=$('.input-title').val().trim();
         if(titleArray.indexOf(newTitle)!=-1){
                 showToast("Item already exist edit the exisiting item");
                 return;
         }
           if(newTitle === ""){
           showToast("Enter A Title");
            return;
        }
        if(itemsArray.length === 0) {
            showToast("Add at least one item");
            return;
        }
        
        if(editingCard){
         editingCard.find("h2").text(newTitle);
         titleArray.push(newTitle);//new
         let ul = editingCard.find('ul');
          ul.empty();
        itemsArray.forEach(function(item){
            ul.append('<li>' + item + '</li>');
        });
        editingCard = null;
        }
        else{
          let card = $('<div class="to-do-card"></div>');
          card.append('<h2>' + newTitle + '</h2>');
          titleArray.push(newTitle);//new
          let list = $('<ul></ul>');
          let editDeleteButton=$('<div class="edit-delete"><button class="edit">Edit</button> <button class="delete">Delete</button></div>')
          itemsArray.forEach(function(item){
            list.append('<li>' + item + '</li>');
        });
        card.append(list);
        card.append(editDeleteButton);
        $('.scroll-to-do').append(card);
    }
        $('.input-title').val("");
         $('.input-item').val("");
        $('.items').empty().hide();
        itemsArray = [];
        });
         $(document).on('click', '.delete', function(e){ 
            e.preventDefault();
            let curr_title=$(this).closest('h2');//new
            let curr_index=titleArray.indexOf(curr_title);//new
            //newstart
            if(curr_index!=-1){
                titleArray.splice(curr_index,1);
            }
            //newend
            $(this).closest('.to-do-card').remove();
        });
        console.log(titleArray);
        $('.search').on('keyup', function () {
    let searchText = $(this).val().toLowerCase();
    $('.to-do-card').each(function () {
        let titleText = $(this).find('h2').text().toLowerCase();
        if (titleText.includes(searchText)) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
});
});
