function panier()
{
    this.liste = [];
    this.ajouterArticle = function(code, qte, prix)
    { 
        var index = this.getArticle(code);
        if (index == -1) this.liste.push(new LignePanier(code, qte, prix));
        else this.liste[index].ajouterQte(qte);
    }
    this.getPrixPanier = function()
    {
        var total = 0;
        for(var i = 0 ; i < this.liste.length ; i++)
            total += this.liste[i].getPrixLigne();
        return total;
    }
    this.getArticle = function(code)
    {
        for(var i = 0 ; i <this.liste.length ; i++)
            if (code == this.liste[i].getCode()) return i;
        return -1;
    }
    this.supprimerArticle = function(code)
    {
        var index = this.getArticle(code);
        if (index > -1) this.liste.splice(index, 1);
    }
}






$('#cart').on({
    mouseenter: function() {
        $('#cart-dropdown').show();
    },
    mouseleave: function() {
        timeout = setTimeout(function() {
            $('#cart-dropdown').hide();
        }, 200);
    }
});

// laisse le contenu ouvert à son survol
// le cache quand la souris sort
$('#cart-dropdown').on({
    mouseenter: function() {
        clearTimeout(timeout);
    },
    mouseleave: function() {
        $('#cart-dropdown').hide();
    }
});



function saveCart(inCartItemsNum, cartArticles) {
  setCookie('inCartItemsNum', inCartItemsNum, 5);
  setCookie('cartArticles', JSON.stringify(cartArticles), 5);
}



// variables pour stocker le nombre d'articles et leurs noms
let inCartItemsNum;
let cartArticles;

// affiche/cache les éléments du panier selon s'il contient des produits
function cartEmptyToggle() {
    if (inCartItemsNum > 0) {
        $('#cart-dropdown .hidden').removeClass('hidden');
        $('#empty-cart-msg').hide();
    }

    else {
        $('#cart-dropdown .go-to-cart').addClass('hidden');
        $('#empty-cart-msg').show();
    }
}

// récupère les informations stockées dans les cookies
inCartItemsNum = parseInt(getCookie('inCartItemsNum') ? getCookie('inCartItemsNum') : 0);
cartArticles = getCookie('cartArticles') ? JSON.parse(getCookie('cartArticles')) : [];

cartEmptyToggle();

// affiche le nombre d'article du panier dans le widget
$('#in-cart-items-num').html(inCartItemsNum);

// hydrate le panier
let items = '';
cartArticles.forEach(function(v) {
   items += '<li id="'+ v.id +'"><a href="'+ v.url +'">'+ v.name +'<br><small>Quantité : <span class="qt">'+ v.qt +'</span></small></a></li>';
});

$('#cart-dropdown').prepend(items);








// si on est sur la page ayant pour url monsite.fr/panier/
if (window.location.pathname == '/panier/') {
  var items = '';
  var subTotal = 0;
  var total;
  var weight = 0;

  /* on parcourt notre array et on créé les lignes du tableau pour nos articles :
  * - Le nom de l'article (lien cliquable qui mène à la fiche produit)
  * - son prix
  * - la dernière colonne permet de modifier la quantité et de supprimer l'article
  *
  * On met aussi à jour le sous total et le poids total de la commande
  */
  cartArticles.forEach(function(v) {
      // opération sur un entier pour éviter les problèmes d'arrondis
      var itemPrice = v.price.replace(',', '.') * 1000;
      items += '<tr data-id="'+ v.id +'">\
           <td><a href="'+ v.url +'">'+ v.name +'</a></td>\
           <td>'+ v.price +'€</td>\
           <td><span class="qt">'+ v.qt +'</span> <span class="qt-minus">–</span> <span class="qt-plus">+</span> \
           <a class="delete-item">Supprimer</a></td></tr>';
      subTotal += v.price.replace(',', '.') * v.qt;
      weight += v.weight * v.qt;
  });

  // on reconverti notre résultat en décimal
  subTotal = subTotal / 1000;

  // On insère le contenu du tableau et le sous total
  $('#cart-tablebody').empty().html(items);
  $('.subtotal').html(subTotal.toFixed(2).replace('.', ','));

  // lorsqu'on clique sur le "+" du panier
  $('.qt-plus').on('click', function() {
      var $this = $(this);

      // récupère la quantité actuelle et l'id de l'article
      var qt = parseInt($this.prevAll('.qt').html());
      var id = $this.parent().parent().attr('data-id');
      var artWeight = parseInt($this.parent().parent().attr('data-weight'));

      // met à jour la quantité et le poids
      inCartItemsNum += 1;
      weight += artWeight;
      $this.prevAll('.qt').html(qt + 1);
      $('#in-cart-items-num').html(inCartItemsNum);
      $('#'+ id + ' .qt').html(qt + 1);

      // met à jour cartArticles
      cartArticles.forEach(function(v) {
          // on incrémente la qt
          if (v.id == id) {
              v.qt += 1;

              // récupération du prix
              // on effectue tous les calculs sur des entiers
              subTotal = ((subTotal * 1000) + (parseFloat(v.price.replace(',', '.')) * 1000)) / 1000;
          }
      });

      // met à jour la quantité du widget et sauvegarde le panier
      $('.subtotal').html(subTotal.toFixed(2).replace('.', ','));
      saveCart(inCartItemsNum, cartArticles);
  });

  // quantité -
  $('.qt-minus').click(function() {
      var $this = $(this);
      var qt = parseInt($this.prevAll('.qt').html());
      var id = $this.parent().parent().attr('data-id');
      var artWeight = parseInt($this.parent().parent().attr('data-weight'));

      if (qt > 1) {
          // maj qt
          inCartItemsNum -= 1;
          weight -= artWeight;
          $this.prevAll('.qt').html(qt - 1);
          $('#in-cart-items-num').html(inCartItemsNum);
          $('#'+ id + ' .qt').html(qt - 1);

          cartArticles.forEach(function(v) {
              // on décrémente la qt
              if (v.id == id) {
                  v.qt -= 1;

                  // récupération du prix
                  // on effectue tous les calculs sur des entiers
                  subTotal = ((subTotal * 1000) - (parseFloat(v.price.replace(',', '.')) * 1000)) / 1000;
              }
          });

          $('.subtotal').html(subTotal.toFixed(2).replace('.', ','));
          saveCart(inCartItemsNum, cartArticles);
      }
  });

  // suppression d'un article
  $('.delete-item').click(function() {
      var $this = $(this);
      var qt = parseInt($this.prevAll('.qt').html());
      var id = $this.parent().parent().attr('data-id');
      var artWeight = parseInt($this.parent().parent().attr('data-weight'));
      var arrayId = 0;
      var price;

      // maj qt
      inCartItemsNum -= qt;
      $('#in-cart-items-num').html(inCartItemsNum);

      // supprime l'item du DOM
      $this.parent().parent().hide(600);
      $('#'+ id).remove();

      cartArticles.forEach(function(v) {
          // on récupère l'id de l'article dans l'array
          if (v.id == id) {
              // on met à jour le sous total et retire l'article de l'array
              // as usual, calcul sur des entiers
              var itemPrice = v.price.replace(',', '.') * 1000;
              subTotal -= (itemPrice * qt) / 1000;
              weight -= artWeight * qt;
              cartArticles.splice(arrayId, 1);

              return false;
          }

          arrayId++;
      });

      $('.subtotal').html(subTotal.toFixed(2).replace('.', ','));
      saveCart(inCartItemsNum, cartArticles);
      cartEmptyToggle();
  });
}