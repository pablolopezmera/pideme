module.exports = {

    providers: [],

    Provider: class {

        constructor(provider) {
            console.log('se construye');
            for(var k in provider) this[k]=provider[k];
        }
        addProduct(product){
            product = this.getProduct(product);
            product.quantity = product.quantity + 1;
            console.log('producto agregado, hay: ' + product.quantity);
        }
        descProduct(product){
            product = this.getProduct(product);
            if (product.quantity > 0)
                product.quantity = product.quantity - 1;
            console.log('producto quitado, hay: ' + product.quantity);
        }
        getProduct(product){
            foundProduct = this.products.find(function(p){
                return p.productId == product.productId;
            });

            if (foundProduct) return foundProduct;

            console.log('no hayproducto, se crea: ' + product.productId);
            product.quantity = 0;
            this.products.push(product);
            return product;
        }
        getTotalProducts() {
            let total = 0;
            this.products.forEach((product)=> total += product.quantity);
            return total;
        }

    },

    selectProvider: function (provider) {
        this.selectedProvider = provider;
        this.selectedProvider.products = [];
    },

    addProduct: function(product){
        provider = this.getProviderFromList();
        console.log('proveedor encontrado, agregar producto');
        provider.addProduct(product);
    },

    descProduct: function(product){
        provider = this.getProviderFromList();
        provider.descProduct(product);
    },

    getTotalProviders: function () {
        console.log(this.providers);
        console.log(this.providers.length);
        return this.providers.length.toString();
    },

    getTotalProducts: function () {
        let total = 0;
        this.providers.forEach((provider)=> total += provider.getTotalProducts());
        return total.toString();
    },

    getProviderFromList: function(){
        console.log('buscar provider:');
        console.log(this.selectedProvider);
        provider = this.selectedProvider;
        foundProvider = this.providers.find(function(p){
            console.log('busca..');
            return p.providerId == provider.providerId;
        });

        if (foundProvider) return foundProvider;

        console.log('no hay proveedor, se crea: ' + provider.providerId);
        console.log('proveedor completo: ' + provider);

        var p = new this.Provider(this.selectedProvider);
        this.providers.push(p);
        return p;
    },
    
    buildRequest(provider) {
        var msg = '?phone=' + provider.phone + '&text=';
        msg = msg + 'Hola por favor hazme llegar lo siguiente: \n';
        provider.products.forEach((product, index) => {
            msg = msg + product.name + ':' + product.quantity;
        })
        return msg;
    }

};
